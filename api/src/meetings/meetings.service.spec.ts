/* eslint-disable @typescript-eslint/ban-types */
import { Test, TestingModule } from '@nestjs/testing';
import { MeetingService } from './meetings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';
import { Repository } from 'typeorm';
import {
  brokerMeetingsMock,
  clientIdMock,
  clientMeetingsMock,
  createMeetingDtoMock,
  overlappingMeetingDtoMock,
  getAllMeetingParticipantsMock,
  overlappingBrokerSchedule,
  over120MinutesMeetingDto,
  under30MinutesMeetingDto,
} from '../../test/utils/meeting-mocks';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<Meeting>> =
  jest.fn(() => ({
    find: jest.fn(() => []),
    findOne: jest.fn(() => ({})),
    save: jest.fn(() => ({})),
    // ...
  }));

describe('MeetingService', () => {
  let service: MeetingService;
  let repositoryMock: MockType<Repository<Meeting>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeetingService,
        {
          provide: getRepositoryToken(Meeting),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<MeetingService>(MeetingService);
    repositoryMock = module.get(getRepositoryToken(Meeting));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a meeting', async () => {
      const newMeeting = new Meeting(createMeetingDtoMock);
      repositoryMock.save.mockReturnValue(newMeeting);

      const createMeeting = await service.create(createMeetingDtoMock);

      expect(createMeeting).toEqual(newMeeting);
      expect(repositoryMock.save).toHaveBeenCalledWith(createMeetingDtoMock);
    });
  });

  describe('findAllMeetingByClientId', () => {
    it('should return the client meetings with formatted date', async () => {
      repositoryMock.find.mockReturnValue(clientMeetingsMock);
      repositoryMock.findOne.mockReturnValue(getAllMeetingParticipantsMock);

      const expected = [
        {
          id: 'dacaf34b-4bb0-425a-97b7-32675b20ba38',
          startTime: '07/06/2024, 04:00:00',
          endTime: '07/06/2024, 05:00:00',
          participants: [
            {
              id: 'a885cd6d-8d3b-4eb1-8639-1df92e9e98a0',
              familyName: 'BP',
              givenName: 'Client',
              role: 'client',
            },
            {
              id: '0a30d067-d9bc-4b3f-846b-c3a8791992cf',
              familyName: 'BP',
              givenName: 'Broker',
              role: 'broker',
            },
          ],
        },
      ];

      expect(await service.findAllMeetingByClientId(clientIdMock)).toEqual(
        expected,
      );
    });
  });

  describe('checkNewMeetingValidity', () => {
    it('should return an error if meetins overlap', async () => {
      service.getBrokerDaySchedule = jest
        .fn()
        .mockReturnValueOnce(overlappingBrokerSchedule);

      expect(
        await service.checkNewMeetingValidity(overlappingMeetingDtoMock),
      ).toBe('O Corretor já possui uma reunião agendada neste horário');
    });

    it('should return null if the meeting is valid', async () => {
      service.getBrokerDaySchedule = jest
        .fn()
        .mockReturnValueOnce(brokerMeetingsMock);

      expect(
        await service.checkNewMeetingValidity(createMeetingDtoMock),
      ).toBeNull();
    });

    it('should return an error message if the meeting duration is over 120 minutes', async () => {
      expect(
        await service.checkNewMeetingValidity(over120MinutesMeetingDto),
      ).toBe('Reuniões devem ter duração entre 30 e 120 minutos');
    });

    it('should return an error message if the meeting duration is under 30 minutes', async () => {
      expect(
        await service.checkNewMeetingValidity(under30MinutesMeetingDto),
      ).toBe('Reuniões devem ter duração entre 30 e 120 minutos');
    });
  });
});
