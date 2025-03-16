import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './jwt/local.strategy';
import { jwtConstants } from './jwt/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { authController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/models/user.schema';
import { HeroesSchema } from 'src/heroes/entities/hero.schema';
import { JWTAuthGuard } from './guard/auth.guard';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Heroes', schema: HeroesSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret
    }),
  ],
  controllers: [authController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JWTAuthGuard],
  exports: [AuthService],

})
export class AuthModule { }
