import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Roles } from 'src/shared/constants/roles';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save({
      ...createUserDto,
      role: createUserDto.role === 'client' ? Roles.CLIENT : Roles.BROKER,
    });
  }

  async findAllBrokers() {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: Roles.BROKER })
      .select(['user.id', 'user.familyName', 'user.givenName', 'user.role'])
      .getMany();
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
