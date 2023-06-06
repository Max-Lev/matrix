import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Observable } from 'rxjs';
// import { Strategy, ExtractJwt } from 'passport-local';

// @Injectable()
// export class JwtStrategy extends AuthGuard('jwt') {} {

// }
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // !!!
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
      
    });
    // console.÷÷log(ExtractJwt.fromAuthHeaderAsBearerToken());
    // console.log('JwtStrategy', this)
  }

  async validate(payload: any) {
    return payload;
    // return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}