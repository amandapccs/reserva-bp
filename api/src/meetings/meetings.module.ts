import { Module } from '@nestjs/common';
import { MeetingService } from './meetings.service';
import { MeetingController } from './meetings.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Meeting } from './entities/meeting.entity';
import { AuthService } from '../shared/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, Meeting])],
  controllers: [MeetingController],
  providers: [MeetingService, AuthService, JwtService],
})
export class MeetingModule {}
