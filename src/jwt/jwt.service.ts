import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  sign(payload: object): string {
    return jwt.sign(payload, this.configService.get('PRIVATE_KEY'));
  }
}
