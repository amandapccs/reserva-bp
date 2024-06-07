import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './shared/auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginUserDto } from './users/dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { apiResponseMessages } from './shared/constants/messages';

@ApiTags('login/register')
@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login')
  async login(
    @Body() body: LoginUserDto,
  ): Promise<HttpException | { token: string }> {
    const user = await this.userService.findByEmail(body.email);
    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      throw new HttpException(
        apiResponseMessages.INVALID_LOGIN,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.authService.createToken(user.id);
    return { token };
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<HttpException | { message: string; token: string }> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    if (!user) {
      throw new HttpException(
        apiResponseMessages.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const token = await this.authService.createToken(user.id);
    return { message: 'User created', token };
  }
}
