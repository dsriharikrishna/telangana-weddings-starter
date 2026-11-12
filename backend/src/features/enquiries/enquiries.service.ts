import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreateEnquiryDto, RequestCallbackDto } from './dto/enquiry.dto';
import { EnquirySource, EnquiryStatus, LeadAssignmentStatus } from '@prisma/client';

@Injectable()
export class EnquiriesService {
  private readonly logger = new Logger(EnquiriesService.name);

  constructor(private readonly prisma: PrismaService) {}

  private generateRefNumber(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `ENQ-${timestamp}-${random}`;
  }

  async createEnquiry(userId: string | null, dto: CreateEnquiryDto) {
    let customerProfileId: string | null = null;
    if (userId) {
      const profile = await this.prisma.customerProfile.findUnique({
        where: { userId },
      });
      if (profile) {
        customerProfileId = profile.id;
      }
    }

    const refNumber = this.generateRefNumber();

    const enquiry = await this.prisma.enquiry.create({
      data: {
        referenceNumber: refNumber,
        customerId: customerProfileId,
        categorySlug: dto.categorySlug,
        customerName: dto.customerName,
        customerPhone: dto.customerPhone,
        district: dto.district,
        mandal: dto.mandal,
        villageOrTown: dto.villageOrTown || 'Town',
        eventDate: new Date(dto.eventDate),
        budgetPaise: dto.budget ? dto.budget * 100 : null,
        notes: dto.notes,
        source: EnquirySource.WEBSITE,
        status: EnquiryStatus.NEW,
      },
    });

    await this.matchAndAssignLeads(enquiry.id, dto.categorySlug, dto.district, dto.mandal, dto.vendorId);

    return enquiry;
  }

  async requestCallback(dto: RequestCallbackDto) {
    const refNumber = this.generateRefNumber();

    const assistedEnquiry = await this.prisma.enquiry.create({
      data: {
        referenceNumber: refNumber,
        categorySlug: dto.categorySlug || 'general-wedding-planning',
        customerName: dto.customerName,
        customerPhone: dto.customerPhone,
        district: dto.district,
        mandal: dto.mandal || 'Concierge Request',
        villageOrTown: 'Town',
        eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        notes: dto.notes ? `[Assisted Callback] ${dto.notes}` : '[Assisted Callback via Concierge]',
        source: EnquirySource.PHONE_ASSISTED,
        status: EnquiryStatus.NEW,
      },
    });

    this.logger.log(`Created assisted callback request #${assistedEnquiry.referenceNumber} for ${dto.customerPhone}`);

    return {
      success: true,
      message: 'Callback request registered. A local wedding coordinator will reach out shortly.',
      referenceNumber: assistedEnquiry.referenceNumber,
    };
  }

  private async matchAndAssignLeads(
    enquiryId: string,
    categorySlug: string,
    district: string,
    mandal: string,
    directVendorId?: string,
  ) {
    if (directVendorId) {
      await this.prisma.leadAssignment.create({
        data: {
          enquiryId,
          vendorId: directVendorId,
          status: LeadAssignmentStatus.AVAILABLE,
        },
      });
      return;
    }

    // Broadcast matching: find top 5 approved vendors in the category and district
    const vendors = await this.prisma.vendorProfile.findMany({
      where: {
        status: 'APPROVED',
        primaryCategory: {
          slug: categorySlug,
        },
        baseDistrict: { contains: district, mode: 'insensitive' },
      },
      take: 5,
    });

    const assignments = vendors.map((vendor) => ({
      enquiryId,
      vendorId: vendor.id,
      status: LeadAssignmentStatus.AVAILABLE,
    }));

    if (assignments.length > 0) {
      await this.prisma.leadAssignment.createMany({
        data: assignments,
        skipDuplicates: true,
      });
    }

    this.logger.log(`Matched enquiry ${enquiryId} to ${assignments.length} vendors`);
  }

  async getCustomerEnquiries(userId: string) {
    const profile = await this.prisma.customerProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return [];
    }

    return this.prisma.enquiry.findMany({
      where: { customerId: profile.id },
      orderBy: { createdAt: 'desc' },
    });
  }
}
