import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './core/database/database.module';
import { HealthController } from './core/health/health.controller';
import { AuthModule } from './features/auth/auth.module';
import { CustomersModule } from './features/customers/customers.module';
import { CategoriesModule } from './features/categories/categories.module';
import { LocationsModule } from './features/locations/locations.module';
import { VendorsModule } from './features/vendors/vendors.module';
import { EnquiriesModule } from './features/enquiries/enquiries.module';
import { LeadManagementModule } from './features/leads/lead-management.module';
import { AdminModule } from './features/admin/admin.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Structured Logging
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                },
              }
            : undefined,
      },
    }),

    // Core Database & Redis
    DatabaseModule,

    // Feature Modules
    AuthModule,
    CustomersModule,
    CategoriesModule,
    LocationsModule,
    VendorsModule,
    EnquiriesModule,
    LeadManagementModule,
    AdminModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
