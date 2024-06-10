import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { MeetingService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { AuthService } from '../shared/auth/auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { apiResponseMessages } from '../shared/constants/messages';
import { AuthGuard } from 'src/shared/auth/auth.guard';

@ApiBearerAuth()
@ApiTags('meetings')
@Controller('meetings')
export class MeetingController {
  constructor(
    private readonly meetingService: MeetingService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Create a new meeting' })
  @ApiResponse({ status: 201, description: 'Meeting created' })
  @ApiResponse({ status: 401, description: 'Forbidden' })
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Headers('Authorization') auth: string,
    @Body() createMeetingDto: CreateMeetingDto,
  ) {
    const userToken = await this.authService.decodeToken(auth);

    if (userToken && userToken.role !== 'client') {
      throw new HttpException(apiResponseMessages.UNAUTHORIZED_USER, 401);
    }

    const validations =
      await this.meetingService.checkNewMeetingValidity(createMeetingDto);

    if (validations) throw new HttpException(validations, 400);

    const created = await this.meetingService.create(createMeetingDto);

    return created;
  }

  @ApiOperation({ summary: 'Get all meetings booked by the client' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of the booked meetings',
  })
  @ApiResponse({ status: 401, description: 'Forbidden' })
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Headers('Authorization') auth: string) {
    const userToken = await this.authService.decodeToken(auth);

    if (!userToken) {
      throw new HttpException(apiResponseMessages.INVALID_TOKEN, 401);
    }

    const meetings = await this.meetingService.findAllMeetingByClientId(
      userToken.id,
    );
    return meetings;
  }

  @ApiOperation({ summary: 'Soft deletes a meeting by its ID' })
  @ApiResponse({ status: 200, description: 'Meeting deleted' })
  @ApiResponse({ status: 401, description: 'Forbidden' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.meetingService.remove(id);
  }
}
