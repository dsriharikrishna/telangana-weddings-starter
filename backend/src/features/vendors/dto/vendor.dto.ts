import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class VendorFilterDto {
  @ApiPropertyOptional({ example: 'traditional-photography', description: 'Category slug' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'Narayanpet', description: 'District name' })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({ example: 'Makthal', description: 'Mandal name' })
  @IsOptional()
  @IsString()
  mandal?: string;

  @ApiPropertyOptional({ example: 'Maganoor', description: 'Village or town name' })
  @IsOptional()
  @IsString()
  village?: string;

  @ApiPropertyOptional({ example: 10000, description: 'Minimum starting price in INR' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ example: 50000, description: 'Maximum starting price in INR' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ example: 4.0, description: 'Minimum rating' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minRating?: number;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 20, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 20;

  @ApiPropertyOptional({ example: 'rating', enum: ['rating', 'price_asc', 'price_desc', 'newest'] })
  @IsOptional()
  @IsString()
  sortBy?: 'rating' | 'price_asc' | 'price_desc' | 'newest' = 'rating';
}

export class CreateVendorProfileDto {
  @ApiProperty({ example: 'Sri Venkateshwara Digital Studio' })
  @IsString()
  businessName: string;

  @ApiPropertyOptional({ example: 'Professional wedding photography and 4K cinematography' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '+919876543210' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  whatsappNumber?: string;

  @ApiProperty({ example: 'cat_photo' })
  @IsString()
  primaryCategoryId: string;

  @ApiProperty({ example: 'Narayanpet' })
  @IsString()
  baseDistrict: string;

  @ApiProperty({ example: 'Makthal' })
  @IsString()
  baseMandal: string;

  @ApiProperty({ example: 'Maganoor' })
  @IsString()
  baseVillageOrTown: string;

  @ApiPropertyOptional({ example: 25000 })
  @IsOptional()
  @IsNumber()
  startingPrice?: number;
}
