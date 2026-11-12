import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional, IsNumber } from 'class-validator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { PrismaService } from '../../core/database/prisma.service';
import { UserRole, VerificationStatus, TransactionType } from '@prisma/client';

export class UpdateVerificationDto {
  @ApiProperty({ enum: VerificationStatus })
  @IsEnum(VerificationStatus)
  status: VerificationStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export class AddCreditsDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  credits: number;

  @ApiPropertyOptional({ example: 'Promotion bonus' })
  @IsOptional()
  @IsString()
  reason?: string;
}

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@ApiBearerAuth('JWT-auth')
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Platform summary metrics for administrative dashboard' })
  async getMetrics() {
    const [
      totalVendors,
      verifiedVendors,
      totalEnquiries,
      totalCustomers,
      recentEnquiries,
    ] = await Promise.all([
      this.prisma.vendorProfile.count(),
      this.prisma.vendorProfile.count({ where: { verificationStatus: VerificationStatus.VERIFIED } }),
      this.prisma.enquiry.count(),
      this.prisma.customerProfile.count(),
      this.prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      totalVendors,
      verifiedVendors,
      totalEnquiries,
      totalCustomers,
      recentEnquiries,
    };
  }

  @Get('enquiries')
  @ApiOperation({ summary: 'List all customer enquiries and callbacks for admin dispatch desk' })
  async getEnquiries() {
    return this.prisma.enquiry.findMany({
      include: {
        customer: true,
        assignments: {
          include: {
            vendor: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get('vendors')
  @ApiOperation({ summary: 'List all vendors with verification status' })
  async getVendors() {
    return this.prisma.vendorProfile.findMany({
      include: {
        leadWallet: true,
        primaryCategory: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Patch('vendors/:id/verification')
  @ApiOperation({ summary: 'Approve or reject vendor profile verification' })
  async updateVerification(
    @Param('id') vendorId: string,
    @Body() dto: UpdateVerificationDto,
  ) {
    return this.prisma.vendorProfile.update({
      where: { id: vendorId },
      data: {
        verificationStatus: dto.status,
      },
    });
  }

  @Patch('vendors/:id/credits')
  @ApiOperation({ summary: 'Grant promotional or manual lead credits to vendor wallet' })
  async grantCredits(
    @Param('id') vendorId: string,
    @Body() dto: AddCreditsDto,
  ) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { id: vendorId },
      include: { leadWallet: true },
    });

    if (!vendor || !vendor.leadWallet) {
      throw new Error('Vendor or wallet not found');
    }

    const updatedWallet = await this.prisma.vendorLeadWallet.update({
      where: { id: vendor.leadWallet.id },
      data: {
        balanceCredits: { increment: dto.credits },
        version: { increment: 1 },
      },
    });

    await this.prisma.leadCreditTransaction.create({
      data: {
        walletId: vendor.leadWallet.id,
        amount: dto.credits,
        balanceAfter: updatedWallet.balanceCredits,
        type: TransactionType.ADMIN_ADJUSTMENT,
        description: dto.reason || 'Admin manual credit grant',
      },
    });

    return {
      success: true,
      newBalance: updatedWallet.balanceCredits,
    };
  }
}
