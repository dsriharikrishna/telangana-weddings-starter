import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { VendorsService } from './vendors.service';
import { VendorFilterDto, CreateVendorProfileDto } from './dto/vendor.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser, AuthenticatedUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Vendors')
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  @ApiOperation({ summary: 'Discover and filter local wedding vendors' })
  @ApiResponse({ status: 200, description: 'Paginated list of vendors' })
  async getVendors(@Query() filter: VendorFilterDto) {
    return this.vendorsService.findAll(filter);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get complete vendor profile, packages, portfolio, and reviews' })
  @ApiResponse({ status: 200, description: 'Detailed vendor profile' })
  async getVendorBySlug(@Param('slug') slug: string) {
    return this.vendorsService.findBySlug(slug);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Register logged-in user as a wedding vendor' })
  @ApiResponse({ status: 201, description: 'Vendor profile created with 5 free lead credits' })
  async registerVendor(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateVendorProfileDto,
  ) {
    return this.vendorsService.createProfile(user.id, dto);
  }
}

