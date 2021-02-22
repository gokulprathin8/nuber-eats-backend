import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dto/create-account.dto';
import { LoginInput } from './dto/login.dto';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.user.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      await this.user.save(this.user.create({ email, password, role }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }
  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token: string }> {
    try {
      const user = await this.user.findOne({ email });
      if (!user) {
        return {
          token: null,
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong passowrd',
          token: null,
        };
      }
      const token = this.jwtService.sign({ id: user.id });
      return {
        ok: true,
        token: token,
        error: null,
      };
    } catch (error) {
      return {
        token: null,
        ok: false,
        error: error,
      };
    }
  }
}
