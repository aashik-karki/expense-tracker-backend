import { LoginDto } from './dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IAuthResponse } from './response/auth.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDto) {
    const user = await this.userservice.findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      const { role, id, name } = user;
      const payload = { id };
      const accessToken = await this.jwtService.signAsync(payload);
      return { name, role, accessToken };
    }

    return { message: 'Unauthorized', status: 401 };
  }

  // async login(user: User) {
  //   const { name, role } = user;
  //   console.log('this is a role of the person that logedin', role);

  // }
}
