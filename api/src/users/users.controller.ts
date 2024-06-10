import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../shared/auth/auth.service';
import { AuthGuard } from 'src/shared/auth/auth.guard';

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
  @UseGuards(AuthGuard)
  @Get('brokers')
  async findAllBrokers() {
    return this.usersService.findAllBrokers();
  }
}
