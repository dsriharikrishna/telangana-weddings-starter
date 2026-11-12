import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Length, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class SendOtpDto {
  @ApiProperty({ example: '+919876543210', description: 'Indian 10-digit mobile number with or without +91' })
  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '+919876543210', description: 'Indian 10-digit mobile number' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: '123456', description: '6-digit OTP code' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  otp: string;

  @ApiPropertyOptional({ enum: UserRole, default: UserRole.CUSTOMER, description: 'Role intended to login/register with' })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ example: 'Ravi Kumar', description: 'Full name for new customer registration' })
  @IsOptional()
  @IsString()
  fullName?: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: 'Valid refresh token' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class SwitchRoleDto {
  @ApiProperty({ enum: UserRole, description: 'Role to switch active context to' })
  @IsNotEmpty()
  @IsEnum(UserRole)
  targetRole: UserRole;
}

