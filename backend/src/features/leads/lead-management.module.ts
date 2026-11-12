import { Module } from '@nestjs/common';
import { LeadManagementService } from './lead-management.service';
import { LeadManagementController } from './lead-management.controller';

@Module({
  controllers: [LeadManagementController],
  providers: [LeadManagementService],
  exports: [LeadManagementService],
})
export class LeadManagementModule {}

