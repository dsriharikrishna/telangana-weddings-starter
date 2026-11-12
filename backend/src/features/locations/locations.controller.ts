import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PrismaService } from '../../core/database/prisma.service';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('districts')
  @ApiOperation({ summary: 'List all active districts in Telangana' })
  @ApiResponse({ status: 200, description: 'List of districts' })
  async getDistricts() {
    return this.prisma.district.findMany({
      where: { isActive: true },
      orderBy: { nameEn: 'asc' },
    });
  }

  @Get('districts/:districtId/mandals')
  @ApiOperation({ summary: 'List all mandals in a given district' })
  @ApiResponse({ status: 200, description: 'List of mandals in district' })
  async getMandalsByDistrict(@Param('districtId') districtId: string) {
    return this.prisma.mandal.findMany({
      where: {
        districtId,
        isActive: true,
      },
      orderBy: { nameEn: 'asc' },
    });
  }

  @Get('mandals/:mandalId/villages')
  @ApiOperation({ summary: 'List all villages/towns in a given mandal' })
  @ApiResponse({ status: 200, description: 'List of villages' })
  async getVillagesByMandal(@Param('mandalId') mandalId: string) {
    return this.prisma.village.findMany({
      where: {
        mandalId,
        isActive: true,
      },
      orderBy: { nameEn: 'asc' },
    });
  }

  @Get('search')
  @ApiOperation({ summary: 'Search locations across districts, mandals, and villages' })
  @ApiQuery({ name: 'q', description: 'Search query' })
  async searchLocations(@Query('q') query: string) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const q = query.trim();

    const [districts, mandals, villages] = await Promise.all([
      this.prisma.district.findMany({
        where: {
          OR: [
            { nameEn: { contains: q, mode: 'insensitive' } },
            { nameTe: { contains: q, mode: 'insensitive' } },
          ],
        },
        take: 5,
      }),
      this.prisma.mandal.findMany({
        where: {
          OR: [
            { nameEn: { contains: q, mode: 'insensitive' } },
            { nameTe: { contains: q, mode: 'insensitive' } },
          ],
        },
        include: { district: true },
        take: 10,
      }),
      this.prisma.village.findMany({
        where: {
          OR: [
            { nameEn: { contains: q, mode: 'insensitive' } },
            { nameTe: { contains: q, mode: 'insensitive' } },
          ],
        },
        include: {
          mandal: {
            include: { district: true },
          },
        },
        take: 15,
      }),
    ]);

    return {
      districts,
      mandals,
      villages,
    };
  }
}
