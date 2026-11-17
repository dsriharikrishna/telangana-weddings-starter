import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { VendorsService } from './vendors.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser, AuthenticatedUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

export class CreateServicePackageDto {
  subcategoryId?: string;
  title: string;
  description?: string;
  pricePaise: number;
  inclusions?: string;
  experienceYrs?: number;
  completedDeals?: number;
  sampleImages?: string[];
}

export class UpdateServicePackageDto {
  title?: string;
  description?: string;
  pricePaise?: number;
  inclusions?: string;
  experienceYrs?: number;
  completedDeals?: number;
  sampleImages?: string[];
  isActive?: boolean;
}

export class WalletRechargeDto {
  amountPaise: number; // e.g. 5100 for ₹51
  gatewayPaymentId?: string;
}

export class CreateReviewDto {
  authorName: string;
  rating: number; // 1 to 5
  comment: string;
  village?: string;
}

@ApiTags('Vendor Operations')
@Controller('vendor/portal')
export class VendorPortalController {
  constructor(private readonly vendorsService: VendorsService) {}

  // Helper to extract effective target vendor or authenticated user id
  private resolveVendorTarget(user?: AuthenticatedUser, queryParam?: string): string {
    if (user?.vendorId) return user.vendorId;
    if (user?.id) return user.id;
    if (queryParam) return queryParam;
    return '';
  }

  // -------------------------------------------------------------
  // 1. BUSINESS PROFILE & ONBOARDING
  // -------------------------------------------------------------
  @Get('profile')
  @ApiOperation({ summary: 'Get current vendor business profile' })
  @ApiResponse({ status: 200, description: 'Vendor business profile with category and stats' })
  async getMyProfile(
    @Request() req: any,
    @Query('userId') userIdParam?: string,
  ) {
    const user: AuthenticatedUser | undefined = req.user;
    const target = this.resolveVendorTarget(user, userIdParam);
    return this.vendorsService.getMyVendorProfile(target);
  }

  // -------------------------------------------------------------
  // 2. SERVICES CRUD (WITH ₹21 LISTING FEE)
  // -------------------------------------------------------------
  @Get('services')
  @ApiOperation({ summary: 'List all vendor services with active status' })
  async getMyServices(
    @Request() req: any,
    @Query('vendorId') vendorId?: string,
  ) {
    const user: AuthenticatedUser | undefined = req.user;
    const target = this.resolveVendorTarget(user, vendorId);
    return this.vendorsService.getVendorServices(target);
  }

  @Post('services')
  @ApiOperation({ summary: 'Create a new service package (charges ₹21 listing fee)' })
  async createService(
    @Request() req: any,
    @Body() dto: CreateServicePackageDto,
    @Query('vendorId') vendorId?: string,
  ) {
    const user: AuthenticatedUser | undefined = req.user;
    const target = this.resolveVendorTarget(user, vendorId);
    return this.vendorsService.createServiceWithFee(target, dto);
  }

  @Put('services/:id')
  @ApiOperation({ summary: 'Update existing service package (free)' })
  async updateService(
    @Request() req: any,
    @Param('id') serviceId: string,
    @Body() dto: UpdateServicePackageDto,
    @Query('vendorId') vendorId?: string,
  ) {
    const user: AuthenticatedUser | undefined = req.user;
    const target = this.resolveVendorTarget(user, vendorId);
    return this.vendorsService.updateService(serviceId, target, dto);
  }

  @Delete('services/:id')
  @ApiOperation({ summary: 'Delete or deactivate a service package' })
  async deleteService(
    @Request() req: any,
    @Param('id') serviceId: string,
    @Query('vendorId') vendorId?: string,
  ) {
    const user: AuthenticatedUser | undefined = req.user;
    const target = this.resolveVendorTarget(user, vendorId);
    return this.vendorsService.deleteService(serviceId, target);
  }

  // -------------------------------------------------------------
  // 3. WALLET & TRANSACTIONS
  // -------------------------------------------------------------
  @Get('wallet')
  @ApiOperation({ summary: 'Get vendor wallet balance and itemized transactions' })
  async getMyWallet(
    @Request() req: any,
    @Query('vendorId') vendorId?: string,
  ) {
    const user: AuthenticatedUser | undefined = req.user;
    const target = this.resolveVendorTarget(user, vendorId);
    return this.vendorsService.getWalletDetails(target);
  }

  @Post('wallet/recharge')
  @ApiOperation({ summary: 'Recharge wallet balance (Mock / UPI)' })
  async rechargeWallet(
    @Request() req: any,
    @Body() dto: WalletRechargeDto,
    @Query('vendorId') vendorId?: string,
  ) {
    const user: AuthenticatedUser | undefined = req.user;
    const target = this.resolveVendorTarget(user, vendorId);
    return this.vendorsService.rechargeWallet(target, dto);
  }

  // -------------------------------------------------------------
  // 4. REVIEWS & RATINGS
  // -------------------------------------------------------------
  @Get('reviews')
  @ApiOperation({ summary: 'Get customer reviews & village feedback' })
  async getMyReviews(
    @Request() req: any,
    @Query('vendorId') vendorId?: string,
  ) {
    const user: AuthenticatedUser | undefined = req.user;
    const target = this.resolveVendorTarget(user, vendorId);
    return this.vendorsService.getVendorReviews(target);
  }

  @Post('reviews')
  @ApiOperation({ summary: 'Submit a new customer review for a vendor' })
  async createReview(
    @Request() req: any,
    @Body() dto: CreateReviewDto,
    @Query('vendorId') vendorId?: string,
  ) {
    const user: AuthenticatedUser | undefined = req.user;
    const target = this.resolveVendorTarget(user, vendorId);
    return this.vendorsService.addReview(target, dto);
  }
}
