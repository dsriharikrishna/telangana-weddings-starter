import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LeadManagementService } from './lead-management.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser, AuthenticatedUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Vendor Leads')
@Controller('vendor/leads')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.VENDOR_OWNER, UserRole.ADMIN, UserRole.SUPER_ADMIN)
@ApiBearerAuth('JWT-auth')
export class LeadManagementController {
  constructor(private readonly leadService: LeadManagementService) {}

  @Get()
  @ApiOperation({ summary: 'Get assigned leads for logged-in vendor' })
  @ApiResponse({ status: 200, description: 'Vendor leads with unlock status' })
  async getMyLeads(@CurrentUser() user: AuthenticatedUser) {
    return this.leadService.getVendorLeads(user.id);
  }

  @Post(':assignmentId/unlock')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Unlock customer contact details using 1 lead credit' })
  @ApiResponse({ status: 200, description: 'Lead unlocked, customer contact revealed' })
  async unlockLead(
    @CurrentUser() user: AuthenticatedUser,
    @Param('assignmentId') assignmentId: string,
  ) {
    return this.leadService.unlockLead(user.id, assignmentId);
  }
}

