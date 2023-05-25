import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
// import { AuthService } from '../auth2.service';
import { GooglePayload } from './google-profile-payload.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // For more details see:  https://developers.google.com/identity/protocols/oauth2/web-server#httprest_1
  constructor(
    // private readonly authService: AuthService
  ) {
    super({
      // clientID: '314561033767-4o6e5n7i8ckcchbag66r736bm1697mk0.apps.googleusercontent.com',
      // clientSecret: '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',
      // callbackURL: 'http://localhost:3000/oauth2/auth/google/callback',
      clientID: '429041238969-slhmsmnhj4imi93g2vka73tpof0p5iup.apps.googleusercontent.com',
      clientSecret: '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',
      // callbackURL: 'http://localhost:4200/user/login',
      // callbackURL: 'http://localhost:3000/oauth2/auth/google/callback',

      passReqToCallback: false,
      scope: ['profile', 'email'],

    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {

    const { name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }

    console.log('GoogleStrategy user: ', user);
    done(null, user);
    // return this.authService.manageGoogleUser(user);
  }

  // async validate(
  //   req: any,
  //   accessToken: string,
  //   refreshToken: string,
  //   profile: GooglePayload,
  // ): Promise<any> {
  //   return this.authService.manageGoogleUser(profile);
  // }
}
