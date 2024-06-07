import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Roles } from '../shared/constants/roles';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.save({
      ...createUserDto,
      role: createUserDto.role === 'client' ? Roles.CLIENT : Roles.BROKER,
    });
  }

  async findAllBrokers() {
    return this.usersRepository.find({
      where: { role: Roles.BROKER },
      select: ['id', 'familyName', 'givenName', 'role'],
    });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
