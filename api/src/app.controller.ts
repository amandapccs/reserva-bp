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

@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: any): Promise<any> {
    const user = await this.userService.findByEmail(body.email);
    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.authService.createToken(user.id);
    return { token };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    if (!user) {
      throw new HttpException(
        { message: 'Internal Server Error, try again later' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const token = await this.authService.createToken(user.id);
    return { message: 'User created', token };
  }
}
