import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { LeadAssignmentStatus, TransactionType } from '@prisma/client';

@Injectable()
export class LeadManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async getVendorLeads(userId: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { userId },
      include: { leadWallet: true },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found for this account');
    }

    const assignments = await this.prisma.leadAssignment.findMany({
      where: { vendorId: vendor.id },
      include: {
        enquiry: true,
      },
      orderBy: { assignedAt: 'desc' },
    });

    const formattedLeads = assignments.map((lead) => {
      const isUnlocked = lead.status === LeadAssignmentStatus.UNLOCKED;
      return {
        assignmentId: lead.id,
        status: lead.status,
        assignedAt: lead.assignedAt,
        unlockedAt: lead.unlockedAt,
        categorySlug: lead.enquiry.categorySlug,
        district: lead.enquiry.district,
        mandal: lead.enquiry.mandal,
        villageOrTown: lead.enquiry.villageOrTown,
        eventDate: lead.enquiry.eventDate,
        budgetPaise: lead.enquiry.budgetPaise,
        notes: lead.enquiry.notes,
        isUnlocked,
        customerName: isUnlocked ? lead.enquiry.customerName : `${lead.enquiry.customerName.slice(0, 2)}***`,
        customerPhone: isUnlocked ? lead.enquiry.customerPhone : `${lead.enquiry.customerPhone.slice(0, 5)}*****`,
      };
    });

    return {
      walletBalance: vendor.leadWallet?.balanceCredits || 0,
      leads: formattedLeads,
    };
  }

  async unlockLead(userId: string, assignmentId: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { userId },
      include: { leadWallet: true },
    });

    if (!vendor || !vendor.leadWallet) {
      throw new NotFoundException('Vendor wallet not found');
    }

    const assignment = await this.prisma.leadAssignment.findUnique({
      where: { id: assignmentId },
      include: { enquiry: true },
    });

    if (!assignment || assignment.vendorId !== vendor.id) {
      throw new NotFoundException('Lead assignment not found for this vendor');
    }

    if (assignment.status === LeadAssignmentStatus.UNLOCKED) {
      return {
        message: 'Lead is already unlocked',
        customerName: assignment.enquiry.customerName,
        customerPhone: assignment.enquiry.customerPhone,
      };
    }

    const leadCostCredits = 1;

    if (vendor.leadWallet.balanceCredits < leadCostCredits) {
      throw new BadRequestException(
        'Insufficient lead credits. Please purchase a credit pack to unlock this lead.',
      );
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const updatedWallet = await tx.vendorLeadWallet.update({
        where: { id: vendor.leadWallet!.id },
        data: {
          balanceCredits: { decrement: leadCostCredits },
          version: { increment: 1 },
        },
      });

      const updatedAssignment = await tx.leadAssignment.update({
        where: { id: assignment.id },
        data: {
          status: LeadAssignmentStatus.UNLOCKED,
          unlockedAt: new Date(),
        },
      });

      await tx.leadUnlock.create({
        data: {
          assignmentId: assignment.id,
          creditsSpent: leadCostCredits,
        },
      });

      await tx.leadCreditTransaction.create({
        data: {
          walletId: vendor.leadWallet!.id,
          amount: -leadCostCredits,
          balanceAfter: updatedWallet.balanceCredits,
          type: TransactionType.UNLOCK_DEBIT,
          description: `Unlocked lead #${assignment.enquiry.referenceNumber}`,
          referenceId: assignment.id,
        },
      });

      return {
        updatedAssignment,
        remainingCredits: updatedWallet.balanceCredits,
      };
    });

    return {
      success: true,
      message: 'Lead unlocked successfully!',
      remainingCredits: result.remainingCredits,
      customerName: assignment.enquiry.customerName,
      customerPhone: assignment.enquiry.customerPhone,
      eventDate: assignment.enquiry.eventDate,
      notes: assignment.enquiry.notes,
    };
  }
}
