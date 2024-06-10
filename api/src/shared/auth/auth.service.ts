import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(user: User) {
    const token = this.jwtService.sign({ id: user.id, role: user.role });

    return token;
  }

  async decodeToken(
    token: string,
  ): Promise<{ id: string; role: string } | false> {
    try {
      return this.jwtService.decode(token.replace('Bearer ', ''));
    } catch (err) {
      return false;
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token.replace('Bearer ', ''));
      return true;
    } catch (err) {
      return false;
    }
  }
}
