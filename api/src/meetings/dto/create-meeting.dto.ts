import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsString } from 'class-validator';

class ParticipantsDto {
  @ApiProperty()
  @IsString()
  id: string;
}

export class CreateMeetingDto {
  @ApiProperty()
  @IsArray()
  participants: ParticipantsDto[];

  @ApiProperty()
  @IsDate()
  startTime: Date;

  @ApiProperty()
  @IsDate()
  endTime: Date;
}
