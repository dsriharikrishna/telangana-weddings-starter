import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';

@Module({
  controllers: [CustomersController],
  exports: [],
})
export class CustomersModule {}

