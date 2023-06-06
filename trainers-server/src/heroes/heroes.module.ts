import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/auth/jwt/constants';
// import { GoogleStrategy } from 'src/auth2.0/google/google.strategy';
import { HeroesSchema } from './entities/hero.schema';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { OptionsSchema } from './entities/options.schema';
import moment from 'moment-timezone';

// import {Strategy} from "@nest/passport-local";
@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '1d' },
    // }),
    MongooseModule.forFeature([{ name: 'Heroes', schema: HeroesSchema }]),
    MongooseModule.forFeature([{ name: 'Options', schema: OptionsSchema }]),

  ],
  controllers: [HeroesController],
  providers: [
    {
      provide: 'MomentWrapper',
      useValue: moment
    },
    HeroesService,
    // GoogleStrategy,
    // GoogleOAuth2Guard
    // Strategy
  ]
})
export class HeroesModule { 
  constructor(){
    
  }
}
