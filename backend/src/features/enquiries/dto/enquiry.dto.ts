import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDateString, IsNumber, Min } from 'class-validator';

export class CreateEnquiryDto {
  @ApiProperty({ example: 'traditional-photography', description: 'Category slug' })
  @IsNotEmpty()
  @IsString()
  categorySlug: string;

  @ApiPropertyOptional({ example: 'v-123', description: 'Target vendor profile ID if direct enquiry' })
  @IsOptional()
  @IsString()
  vendorId?: string;

  @ApiProperty({ example: 'Narayanpet' })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({ example: 'Makthal' })
  @IsNotEmpty()
  @IsString()
  mandal: string;

  @ApiPropertyOptional({ example: 'Maganoor' })
  @IsOptional()
  @IsString()
  villageOrTown?: string;

  @ApiProperty({ example: '2025-11-20T00:00:00.000Z', description: 'Wedding/event date' })
  @IsNotEmpty()
  @IsDateString()
  eventDate: string;

  @ApiPropertyOptional({ example: 50000, description: 'Budget in INR' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  budget?: number;

  @ApiPropertyOptional({ example: 'Looking for traditional photography and drone coverage for reception' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: '+919876543210' })
  @IsNotEmpty()
  @IsString()
  customerPhone: string;

  @ApiProperty({ example: 'Anand Reddy' })
  @IsNotEmpty()
  @IsString()
  customerName: string;
}

export class RequestCallbackDto {
  @ApiProperty({ example: 'Anand Reddy' })
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @ApiProperty({ example: '+919876543210' })
  @IsNotEmpty()
  @IsString()
  customerPhone: string;

  @ApiProperty({ example: 'Narayanpet' })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiPropertyOptional({ example: 'Makthal' })
  @IsOptional()
  @IsString()
  mandal?: string;

  @ApiPropertyOptional({ example: 'traditional-photography' })
  @IsOptional()
  @IsString()
  categorySlug?: string;

  @ApiPropertyOptional({ example: 'Need help finding reliable local band and photography' })
  @IsOptional()
  @IsString()
  notes?: string;
}
