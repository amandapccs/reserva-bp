// auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { Roles } from '../constants/roles';

const mockJwtService = () => ({
  sign: jest.fn(),
  decode: jest.fn(),
});

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('createToken', () => {
    it('should create a token', async () => {
      const user = new User({
        role: Roles.CLIENT,
        password: '123456',
        givenName: 'John',
        familyName: 'Doe',
      });
      jwtService.sign.mockReturnValue('mockToken');

      const result = await authService.createToken(user);

      expect(jwtService.sign).toHaveBeenCalledWith({
        id: user.id,
        role: user.role,
      });
      expect(result).toBe('mockToken');
    });
  });

  describe('decodeToken', () => {
    it('should decode a token', async () => {
      const token = 'Bearer mockToken';
      const decodedToken = { id: '1', role: 'admin' };
      jwtService.decode.mockReturnValue(decodedToken);

      const result = await authService.decodeToken(token);

      expect(jwtService.decode).toHaveBeenCalledWith('mockToken');
      expect(result).toEqual(decodedToken);
    });

    it('should return false if token is invalid', async () => {
      const token = 'Bearer invalidToken';
      jwtService.decode.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = await authService.decodeToken(token);

      expect(jwtService.decode).toHaveBeenCalledWith('invalidToken');
      expect(result).toBe(false);
    });
  });
});
