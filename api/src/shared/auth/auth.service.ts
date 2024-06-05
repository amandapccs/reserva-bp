import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(id: string) {
    const token = this.jwtService.sign({ id });

    return token;
  }

  async checkToken(token: string) {
    try {
      return this.jwtService.verify(token.replace('Bearer ', ''));
    } catch (err) {
      return false;
    }
  }

  async decodeToken(token: string): Promise<{ id: string } | false> {
    try {
      return this.jwtService.decode(token.replace('Bearer ', ''));
    } catch (err) {
      return false;
    }
  }
}
