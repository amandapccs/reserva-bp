/* eslint-disable @typescript-eslint/ban-types */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { brokerMock, createUserDtoMock } from '../../test/utils/user-mocks';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<User>> = jest.fn(
  () => ({
    find: jest.fn(() => []),
    findOne: jest.fn(() => ({})),
    save: jest.fn(() => ({})),
    // ...
  }),
);

describe('UserService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user', async () => {
      repositoryMock.save.mockReturnValue(createUserDtoMock);

      const createMeeting = await service.create(createUserDtoMock);

      expect(createMeeting).toBeDefined();
      expect(repositoryMock.save).toHaveBeenCalledWith(createUserDtoMock);
    });
  });

  describe('findAllBrokers', () => {
    it('should return all brokers', async () => {
      repositoryMock.find.mockReturnValue(brokerMock);

      const getBrokers = await service.findAllBrokers();

      expect(getBrokers).toEqual(brokerMock);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      repositoryMock.findOne.mockReturnValue(brokerMock[0]);

      const getUser = await service.findByEmail(brokerMock[0].email);

      expect(getUser).toEqual(brokerMock[0]);
    });
  });
});
