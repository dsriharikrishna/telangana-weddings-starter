import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { VendorFilterDto, CreateVendorProfileDto } from './dto/vendor.dto';
import { Prisma, VerificationStatus, VendorStatus, UserRole } from '@prisma/client';

@Injectable()
export class VendorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter: VendorFilterDto) {
    const {
      category,
      district,
      mandal,
      village,
      minPrice,
      maxPrice,
      minRating,
      page = 1,
      limit = 20,
      sortBy = 'rating',
    } = filter;

    const skip = (page - 1) * limit;

    const where: Prisma.VendorProfileWhereInput = {
      status: VendorStatus.APPROVED,
      ...(category
        ? {
            primaryCategory: {
              slug: category,
            },
          }
        : {}),
      ...(district
        ? {
            baseDistrict: { contains: district, mode: 'insensitive' },
          }
        : {}),
      ...(mandal
        ? {
            baseMandal: { contains: mandal, mode: 'insensitive' },
          }
        : {}),
      ...(village
        ? {
            baseVillageOrTown: { contains: village, mode: 'insensitive' },
          }
        : {}),
      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            startingPricePaise: {
              ...(minPrice !== undefined ? { gte: minPrice * 100 } : {}),
              ...(maxPrice !== undefined ? { lte: maxPrice * 100 } : {}),
            },
          }
        : {}),
      ...(minRating !== undefined
        ? {
            ratingAverage: { gte: minRating },
          }
        : {}),
    };

    let orderBy: Prisma.VendorProfileOrderByWithRelationInput = { ratingAverage: 'desc' };
    if (sortBy === 'price_asc') {
      orderBy = { startingPricePaise: 'asc' };
    } else if (sortBy === 'price_desc') {
      orderBy = { startingPricePaise: 'desc' };
    } else if (sortBy === 'newest') {
      orderBy = { createdAt: 'desc' };
    }

    const [items, total] = await Promise.all([
      this.prisma.vendorProfile.findMany({
        where,
        include: {
          primaryCategory: true,
          serviceAreas: {
            include: { district: true, mandal: true, village: true },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.vendorProfile.count({ where }),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { slug },
      include: {
        primaryCategory: true,
        serviceAreas: {
          include: { district: true, mandal: true, village: true },
        },
        services: true,
        portfolioMedia: {
          orderBy: { sortOrder: 'asc' },
        },
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!vendor) {
      throw new NotFoundException(`Vendor with slug '${slug}' not found`);
    }

    return vendor;
  }

  async createProfile(userId: string, dto: CreateVendorProfileDto) {
    const existing = await this.prisma.vendorProfile.findUnique({
      where: { userId },
    });

    if (existing) {
      throw new ConflictException('Vendor profile already exists for this user');
    }

    const category = await this.prisma.category.findUnique({
      where: { id: dto.primaryCategoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category ID '${dto.primaryCategoryId}' not found`);
    }

    const baseSlug = dto.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const slug = `${baseSlug}-${randomSuffix}`;

    const profile = await this.prisma.$transaction(async (tx) => {
      const vendor = await tx.vendorProfile.create({
        data: {
          userId,
          businessName: dto.businessName,
          slug,
          description: dto.description,
          phone: dto.phone,
          whatsappNumber: dto.whatsappNumber,
          primaryCategoryId: category.id,
          baseDistrict: dto.baseDistrict,
          baseMandal: dto.baseMandal,
          baseVillageOrTown: dto.baseVillageOrTown,
          startingPricePaise: (dto.startingPrice || 0) * 100,
          status: VendorStatus.PENDING_APPROVAL,
          verificationStatus: VerificationStatus.PENDING,
          leadWallet: {
            create: {
              balanceCredits: 3, // 3 free starter credits
            },
          },
        },
        include: {
          primaryCategory: true,
          leadWallet: true,
        },
      });

      const user = await tx.user.findUnique({ where: { id: userId } });
      if (user && !user.roles.includes(UserRole.VENDOR_OWNER)) {
        await tx.user.update({
          where: { id: userId },
          data: {
            roles: [...user.roles, UserRole.VENDOR_OWNER],
          },
        });
      }

      return vendor;
    });

    return profile;
  }
}
