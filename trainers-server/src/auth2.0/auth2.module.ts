import { Module } from '@nestjs/common';
// import { AuthService } from './auth2.service';
// import { UserModule } from '../user/user.module';
import { GoogleStrategy } from './google/google.strategy';
import { Auth2Service } from './auth2.service';
// import { ConfigModule } from '@nestjs/config';
import { RegisterController } from './controllers/register.controller';
import { Auth2Controller } from './controllers/auth2.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/auth/jwt/constants';
import { UserSchema } from 'src/users/models/user.schema';
import { AuthSchema } from './models/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
    // PassportModule.register({ defaultStrategy: 'google' }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    // UserModule,
    // ConfigModule.forRoot({
    //   envFilePath: '.example.env',
    // }),
  ],
  controllers: [Auth2Controller, RegisterController],
  providers: [
    // AuthService, 
    Auth2Service,
    // GoogleStrategy
  ],
  exports:[
    Auth2Service,
    // GoogleStrategy
  ]
})
export class AuthModule2 { }
