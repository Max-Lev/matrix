import { Controller, Request, UseGuards, Post, Get, Delete, Put, Body, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from '../../users/models/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTAuthGuard } from '../guard/auth.guard';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Controller('auth')
export class authController {
  constructor(private readonly authService: AuthService) {

  }

  @Post('login')
  async login(@Request() req) {
    const data = await this.authService.getGoogleToken(req.headers.authorization);
    return data;
  }


  @Post('register')
  async create(@Body() user: CreateUserDto) {
    return this.authService.registerCreate(user);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  // @Get('/gethello')
  // @UseGuards(MyAuthGuard, RolesGuard)
  // @Roles('admin')
  // async getHelloAdmin(@Request() req) : Promise<string>  {
  //    return this.authService.getHelloAdmin();
  // }


}
