import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../core/database/prisma.service';
import { UserRole, UserStatus } from '@prisma/client';
import { AuthenticatedUser } from '../../../common/decorators/current-user.decorator';

export interface JwtPayload {
  sub: string;
  phone: string;
  roles: UserRole[];
  currentRole?: UserRole;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'telangana-weddings-jwt-secret-2025-prod-ready',
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        customerProfile: { select: { id: true, fullName: true } },
        vendorProfile: { select: { id: true, businessName: true } },
      },
    });

    if (!user || user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('User account is inactive or not found');
    }

    const currentRole = payload.currentRole && user.roles.includes(payload.currentRole)
      ? payload.currentRole
      : user.roles[0] || UserRole.CUSTOMER;

    return {
      id: user.id,
      phone: user.phone,
      roles: user.roles,
      currentRole,
      fullName: user.customerProfile?.fullName || user.vendorProfile?.businessName || null,
      customerId: user.customerProfile?.id || null,
      vendorId: user.vendorProfile?.id || null,
    };
  }
}
