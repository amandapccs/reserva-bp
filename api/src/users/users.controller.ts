import { Controller, Get, Headers, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../shared/auth/auth.service';
import { apiResponseMessages } from 'src/shared/constants/messages';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Get all brokers' })
  @ApiResponse({ status: 200, description: 'Returns an array of all brokers' })
  @ApiResponse({ status: 401, description: 'Forbidden' })
  @Get('brokers')
  async findAllBrokers(@Headers('Authorization') auth: string) {
    const userToken = await this.authService.decodeToken(auth);

    if (!userToken) {
      throw new HttpException(apiResponseMessages.INVALID_TOKEN, 401);
    }

    return this.usersService.findAllBrokers();
  }
}
