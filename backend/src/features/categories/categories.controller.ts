import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../../core/database/prisma.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'List all active wedding service categories with subcategories' })
  @ApiResponse({ status: 200, description: 'List of active categories' })
  async getCategories() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      include: {
        subcategories: {
          where: { isActive: true },
          select: {
            id: true,
            slug: true,
            nameEn: true,
            nameTe: true,
          },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get category details and metadata by slug' })
  @ApiResponse({ status: 200, description: 'Category details' })
  async getCategoryBySlug(@Param('slug') slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { vendorProfiles: true, subcategories: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category '${slug}' not found`);
    }

    return category;
  }
}
