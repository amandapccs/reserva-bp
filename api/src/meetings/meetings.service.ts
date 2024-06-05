import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MeetingService {
  @InjectRepository(Meeting)
  private meetingRepository: Repository<Meeting>;

  async create(createMeetingDto: CreateMeetingDto) {
    return this.meetingRepository.save({
      ...createMeetingDto,
      startTime: createMeetingDto.startTime,
      endTime: createMeetingDto.endTime,
    });
  }

  async findAllMeetingByClientId(id: string) {
    const clientMeetings = await this.meetingRepository.find({
      where: { participants: { id } },
      relations: ['participants'],
    });

    const getAllMeetingParticipants = await Promise.all(
      clientMeetings.map((meeting) => {
        return this.meetingRepository.findOne({
          where: { id: meeting.id },
          relations: ['participants'],
          select: ['id', 'startTime', 'endTime', 'participants'],
          order: { startTime: 'ASC' },
        });
      }),
    );

    const formattedBrTimezone = getAllMeetingParticipants.map((meeting) => {
      const formattedMeeting = {
        ...meeting,
        startTime: new Date(meeting.startTime).toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        }),
        endTime: new Date(meeting.endTime).toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        }),
      };

      return formattedMeeting;
    });

    return formattedBrTimezone;
  }

  async findOne(id: string) {
    return this.meetingRepository.findOne({
      where: { id },
      relations: ['participants'],
    });
  }

  async remove(id: string) {
    return this.meetingRepository.softDelete(id);
  }

  async checkNewMeetingValidity(createMeetingDto: CreateMeetingDto) {
    const verifyDuration = this.verifyValidMeetingDuration(
      createMeetingDto.startTime,
      createMeetingDto.endTime,
    );

    const brokerSchedule = await this.getBrokerSchedule(
      createMeetingDto.startTime.toString(),
      createMeetingDto.participants[1].id,
    );

    const isMeetingOverlapping = brokerSchedule.some((meeting) => {
      const intervalOverlap = this.checkIfIntervalsOverlap(
        createMeetingDto.startTime,
        createMeetingDto.endTime,
        meeting.startTime,
        meeting.endTime,
      );
      return intervalOverlap;
    });

    if (isMeetingOverlapping) {
      return 'O Corretor já possui uma reunião agendada neste horário';
    }

    if (!verifyDuration) {
      return 'Reuniões devem ter duração entre 30 e 120 minutos';
    }

    return null;
  }

  private verifyValidMeetingDuration(startTime: Date, endTime: Date) {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    const difference = Math.abs(start - end);
    const differenceInMinutes = difference / (1000 * 60);

    const isDurationValid =
      differenceInMinutes >= 30 && differenceInMinutes <= 120;

    return isDurationValid ? true : false;
  }

  private checkIfIntervalsOverlap(
    intervalStart1: Date,
    intervalEnd1: Date,
    intervalStart2: Date,
    intervalEnd2: Date,
  ) {
    const startDate1 = new Date(intervalStart1);
    const endDate1 = new Date(intervalEnd1);
    const startDate2 = new Date(intervalStart2);
    const endDate2 = new Date(intervalEnd2);

    return startDate1 <= endDate2 && startDate2 <= endDate1;
  }

  private async getBrokerSchedule(startTime: string, brokerId: string) {
    const dateSlice = startTime.slice(0, 10); // YYYY-MM-DD
    const queryBuilder = await this.meetingRepository
      .createQueryBuilder('meeting')
      .innerJoinAndSelect('meeting.participants', 'participants')
      .where('DATE(meeting.startTime) = :startTime', { startTime: dateSlice })
      .andWhere('participants.id = :id', {
        id: brokerId,
      })
      .getMany();

    return queryBuilder;
  }
}
