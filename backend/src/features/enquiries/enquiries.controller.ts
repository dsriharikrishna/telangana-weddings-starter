import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EnquiriesService } from './enquiries.service';
import { CreateEnquiryDto, RequestCallbackDto } from './dto/enquiry.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser, AuthenticatedUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Enquiries')
@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Post()
  @ApiOperation({ summary: 'Submit wedding service enquiry (Public or Authenticated)' })
  @ApiResponse({ status: 201, description: 'Enquiry created and matched to local vendors' })
  async createEnquiry(
    @Body() dto: CreateEnquiryDto,
    @Req() req: { user?: AuthenticatedUser },
  ) {
    const userId = req.user?.id || null;
    return this.enquiriesService.createEnquiry(userId, dto);
  }

  @Post('request-call')
  @ApiOperation({ summary: 'Request assisted callback from a wedding concierge' })
  @ApiResponse({ status: 201, description: 'Callback request registered' })
  async requestCallback(@Body() dto: RequestCallbackDto) {
    return this.enquiriesService.requestCallback(dto);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all enquiries submitted by current customer' })
  @ApiResponse({ status: 200, description: 'List of customer enquiries' })
  async getMyEnquiries(@CurrentUser() user: AuthenticatedUser) {
    return this.enquiriesService.getCustomerEnquiries(user.id);
  }
}

