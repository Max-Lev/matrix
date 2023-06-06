import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
// import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'local') {
  constructor(private readonly authService: AuthService) {

    super();
    

  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUserMongo(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}