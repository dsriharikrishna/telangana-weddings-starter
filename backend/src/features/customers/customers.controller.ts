import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser, AuthenticatedUser } from '../../common/decorators/current-user.decorator';
import { PrismaService } from '../../core/database/prisma.service';

export class UpdateCustomerProfileDto {
  @ApiPropertyOptional({ example: 'Ravi Teja' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: 'Narayanpet' })
  @IsOptional()
  @IsString()
  districtId?: string;

  @ApiPropertyOptional({ example: 'Makthal' })
  @IsOptional()
  @IsString()
  mandalId?: string;

  @ApiPropertyOptional({ example: 'Maganoor' })
  @IsOptional()
  @IsString()
  villageName?: string;

  @ApiPropertyOptional({ example: 'te' })
  @IsOptional()
  @IsString()
  preferredLanguage?: string;
}

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current logged-in customer profile' })
  @ApiResponse({ status: 200, description: 'Customer profile details' })
  async getProfile(@CurrentUser() user: AuthenticatedUser) {
    const profile = await this.prisma.customerProfile.findUnique({
      where: { userId: user.id },
      include: {
        enquiries: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Customer profile not found');
    }

    return profile;
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update customer personal profile' })
  @ApiResponse({ status: 200, description: 'Updated customer profile' })
  async updateProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateCustomerProfileDto,
  ) {
    const updated = await this.prisma.customerProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        fullName: dto.fullName || 'Valued Customer',
        districtId: dto.districtId,
        mandalId: dto.mandalId,
        villageName: dto.villageName,
        preferredLanguage: dto.preferredLanguage || 'te',
      },
      update: {
        ...(dto.fullName ? { fullName: dto.fullName } : {}),
        ...(dto.districtId !== undefined ? { districtId: dto.districtId } : {}),
        ...(dto.mandalId !== undefined ? { mandalId: dto.mandalId } : {}),
        ...(dto.villageName !== undefined ? { villageName: dto.villageName } : {}),
        ...(dto.preferredLanguage ? { preferredLanguage: dto.preferredLanguage } : {}),
      },
    });

    return updated;
  }
}
