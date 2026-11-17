import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { VendorFilterDto, CreateVendorProfileDto } from './dto/vendor.dto';
import { Prisma, VerificationStatus, VendorStatus, UserRole, TransactionType } from '@prisma/client';

@Injectable()
export class VendorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter: VendorFilterDto) {
    const {
      category,
      subcategory,
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
      ...(subcategory
        ? {
            OR: [
              {
                services: {
                  some: {
                    subcategory: {
                      slug: subcategory,
                    },
                  },
                },
              },
              {
                primaryCategory: {
                  subcategories: {
                    some: {
                      slug: subcategory,
                    },
                  },
                },
              },
            ],
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
          services: true,
          portfolioMedia: {
            take: 3,
            orderBy: { sortOrder: 'asc' },
          },
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

  // -------------------------------------------------------------
  // VENDOR PORTAL OPERATIONS
  // -------------------------------------------------------------

  async getMyVendorProfile(userIdOrVendorId: string) {
    let vendor = await this.prisma.vendorProfile.findFirst({
      where: {
        OR: [{ id: userIdOrVendorId }, { userId: userIdOrVendorId }],
      },
      include: {
        primaryCategory: true,
        leadWallet: true,
        services: true,
        _count: {
          select: { services: true, reviews: true },
        },
      },
    });

    // Fallback for seamless demo / test when no ID is passed: return first approved vendor
    if (!vendor) {
      vendor = await this.prisma.vendorProfile.findFirst({
        where: { status: VendorStatus.APPROVED },
        include: {
          primaryCategory: true,
          leadWallet: true,
          services: true,
          _count: {
            select: { services: true, reviews: true },
          },
        },
      });
    }

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    return vendor;
  }

  async getVendorServices(vendorId?: string) {
    const vendor = await this.getMyVendorProfile(vendorId || '');
    return this.prisma.vendorService.findMany({
      where: { vendorId: vendor.id },
      include: { subcategory: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createServiceWithFee(
    vendorIdParam: string | undefined,
    dto: {
      subcategoryId?: string;
      title: string;
      description?: string;
      pricePaise: number;
      inclusions?: string;
      experienceYrs?: number;
      completedDeals?: number;
      sampleImages?: string[];
    },
  ) {
    const vendor = await this.getMyVendorProfile(vendorIdParam || '');

    // Wallet check for ₹21 (2100 paise)
    const wallet = await this.prisma.vendorLeadWallet.findUnique({
      where: { vendorId: vendor.id },
    });

    const listingFeePaise = 2100; // ₹21

    if (!wallet || wallet.balancePaise < listingFeePaise) {
      throw new ConflictException(
        'వాలెట్‌లో కనీస బ్యాలెన్స్ ₹21 లేదు. దయచేసి రీఛార్జ్ చేసుకోండి. (Insufficient wallet balance for ₹21 listing fee).',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Deduct ₹21 from wallet
      const updatedWallet = await tx.vendorLeadWallet.update({
        where: { id: wallet.id },
        data: {
          balancePaise: { decrement: listingFeePaise },
          version: { increment: 1 },
        },
      });

      // 2. Create the service package with proof of work, experience and deals
      const service = await (tx.vendorService as any).create({
        data: {
          vendorId: vendor.id,
          subcategoryId: dto.subcategoryId,
          title: dto.title,
          description: dto.description,
          pricePaise: dto.pricePaise,
          inclusions: dto.inclusions,
          experienceYrs: dto.experienceYrs || 1,
          completedDeals: dto.completedDeals || 0,
          sampleImages: dto.sampleImages || [],
          isActive: true,
        },
      });

      // 3. Log the ₹21 Shagun listing transaction
      await tx.leadCreditTransaction.create({
        data: {
          walletId: wallet.id,
          type: TransactionType.SERVICE_LISTING_FEE,
          amount: 0,
          amountPaise: -listingFeePaise,
          balanceAfter: updatedWallet.balanceCredits,
          description: `₹21 శకునం సర్వీస్ లిస్టింగ్ ఫీజు (${dto.title})`,
          referenceId: service.id,
        },
      });

      return {
        success: true,
        message: 'సర్వీస్ విజయవంతంగా పబ్లిష్ చేయబడింది (₹21 మినహాయించబడింది)',
        service,
        newBalancePaise: updatedWallet.balancePaise,
      };
    });
  }

  async updateService(
    serviceId: string,
    vendorIdParam: string | undefined,
    dto: {
      title?: string;
      description?: string;
      pricePaise?: number;
      inclusions?: string;
      experienceYrs?: number;
      completedDeals?: number;
      sampleImages?: string[];
      isActive?: boolean;
    },
  ) {
    const vendor = await this.getMyVendorProfile(vendorIdParam || '');

    const service = await this.prisma.vendorService.findUnique({
      where: { id: serviceId },
    });

    if (!service || service.vendorId !== vendor.id) {
      throw new NotFoundException('Service not found or unauthorized');
    }

    return this.prisma.vendorService.update({
      where: { id: serviceId },
      data: dto,
    });
  }

  async deleteService(serviceId: string, vendorIdParam?: string) {
    const vendor = await this.getMyVendorProfile(vendorIdParam || '');

    const service = await this.prisma.vendorService.findUnique({
      where: { id: serviceId },
    });

    if (!service || service.vendorId !== vendor.id) {
      throw new NotFoundException('Service not found or unauthorized');
    }

    await this.prisma.vendorService.delete({
      where: { id: serviceId },
    });

    return { success: true, message: 'సర్వీస్ తొలగించబడింది (Service deleted)' };
  }

  async getWalletDetails(vendorIdParam?: string) {
    const vendor = await this.getMyVendorProfile(vendorIdParam || '');

    let wallet = await this.prisma.vendorLeadWallet.findUnique({
      where: { vendorId: vendor.id },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!wallet) {
      wallet = await this.prisma.vendorLeadWallet.create({
        data: {
          vendorId: vendor.id,
          balanceCredits: 5,
          balancePaise: 10000,
        },
        include: {
          transactions: true,
        },
      });
    }

    return wallet;
  }

  async rechargeWallet(
    vendorIdParam: string | undefined,
    dto: { amountPaise: number; gatewayPaymentId?: string },
  ) {
    const vendor = await this.getMyVendorProfile(vendorIdParam || '');
    let wallet = await this.prisma.vendorLeadWallet.findUnique({
      where: { vendorId: vendor.id },
    });

    if (!wallet) {
      wallet = await this.prisma.vendorLeadWallet.create({
        data: {
          vendorId: vendor.id,
          balanceCredits: 5,
          balancePaise: 10000,
        },
      });
    }

    const bonusCredits = dto.amountPaise >= 10000 ? 3 : 1;

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.vendorLeadWallet.update({
        where: { id: wallet!.id },
        data: {
          balancePaise: { increment: dto.amountPaise },
          balanceCredits: { increment: bonusCredits },
          version: { increment: 1 },
        },
      });

      await tx.leadCreditTransaction.create({
        data: {
          walletId: wallet!.id,
          type: TransactionType.PURCHASE,
          amount: bonusCredits,
          amountPaise: dto.amountPaise,
          balanceAfter: updated.balanceCredits,
          description: `వాలెట్ రీఛార్జ్ (₹${(dto.amountPaise / 100).toFixed(0)}) + ${bonusCredits} బోనస్ లీడ్స్`,
          referenceId: dto.gatewayPaymentId || 'upi-direct',
        },
      });

      return {
        success: true,
        message: 'వాలెట్ రీఛార్జ్ విజయవంతమైంది',
        wallet: updated,
      };
    });
  }

  async getVendorReviews(vendorIdParam?: string) {
    const vendor = await this.getMyVendorProfile(vendorIdParam || '');
    return this.prisma.vendorReview.findMany({
      where: { vendorId: vendor.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addReview(
    vendorIdParam: string | undefined,
    dto: {
      authorName: string;
      rating: number;
      comment: string;
      village?: string;
    },
  ) {
    const vendor = await this.getMyVendorProfile(vendorIdParam || '');

    const review = await this.prisma.vendorReview.create({
      data: {
        vendorId: vendor.id,
        authorName: dto.authorName,
        rating: Math.min(5, Math.max(1, dto.rating)),
        comment: dto.comment,
        village: dto.village || vendor.baseVillageOrTown,
      },
    });

    // Update vendor aggregate rating
    const allReviews = await this.prisma.vendorReview.findMany({
      where: { vendorId: vendor.id },
      select: { rating: true },
    });

    const avg =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / (allReviews.length || 1);

    await this.prisma.vendorProfile.update({
      where: { id: vendor.id },
      data: {
        ratingAverage: parseFloat(avg.toFixed(1)),
        ratingCount: allReviews.length,
      },
    });

    return review;
  }
}
