import { Test, TestingModule } from '@nestjs/testing';
import { MeetingController } from './meetings.controller';
import { MeetingService } from './meetings.service';

describe('ReunionsController', () => {
  let controller: MeetingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetingController],
      providers: [MeetingService],
    }).compile();

    controller = module.get<MeetingController>(MeetingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
