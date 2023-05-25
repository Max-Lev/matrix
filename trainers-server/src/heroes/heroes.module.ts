// import { Module } from '@nestjs/common';
// import { HeroesService } from './heroes.service';
// import { HeroesController } from './heroes.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { HeroesSchema } from './entities/hero.schema';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { jwtConstants } from 'src/auth/jwt/constants';
// import { GoogleStrategy } from 'src/auth2.0/google/google.strategy';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/auth/jwt/constants';
import { GoogleStrategy } from 'src/auth2.0/google/google.strategy';
import { HeroesSchema } from './entities/hero.schema';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { GoogleOAuth2Guard } from 'src/auth2.0/google/google-oauth.guard';

// import {Strategy} from "@nest/passport-local";
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: 'Heroes', schema: HeroesSchema }]),

  ],
  controllers: [HeroesController],
  providers: [HeroesService,
    GoogleStrategy,
    // GoogleOAuth2Guard
    // Strategy
  ]
})
export class HeroesModule { }
