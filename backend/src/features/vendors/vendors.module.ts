import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { VendorPortalController } from './vendor-portal.controller';

@Module({
  controllers: [VendorsController, VendorPortalController],
  providers: [VendorsService],
  exports: [VendorsService],
})
export class VendorsModule {}

