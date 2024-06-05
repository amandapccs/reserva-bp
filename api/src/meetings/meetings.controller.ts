import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Headers,
} from '@nestjs/common';
import { MeetingService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { AuthService } from 'src/shared/auth/auth.service';

@Controller('meetings')
export class MeetingController {
  constructor(
    private readonly meetingService: MeetingService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createMeetingDto: CreateMeetingDto) {
    const meetingValidations =
      await this.meetingService.checkNewMeetingValidity(createMeetingDto);

    if (meetingValidations) throw new HttpException(meetingValidations, 400);

    const created = await this.meetingService.create(createMeetingDto);

    return created;
  }

  @Get()
  async findAll(@Headers('Authorization') auth: string) {
    const userToken = await this.authService.decodeToken(auth);

    if (!userToken) throw new HttpException('Invalid token', 401);

    const meetings = await this.meetingService.findAllMeetingByClientId(
      userToken?.id,
    );
    return meetings;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingService.remove(id);
  }
}
