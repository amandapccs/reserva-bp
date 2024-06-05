import { Test, TestingModule } from '@nestjs/testing';
import { MeetingService } from './meetings.service';

describe('MeetingsService', () => {
  let service: MeetingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingService],
    }).compile();

    service = module.get<MeetingService>(MeetingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
