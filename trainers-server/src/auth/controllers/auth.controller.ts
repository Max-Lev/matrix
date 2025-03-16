import { Controller, Request, UseGuards, Post, Get, Delete, Put, Body, SetMetadata, Logger } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from '../../users/models/create-user.dto';

@Controller('auth')
export class authController {
  constructor(private readonly authService: AuthService) {

  }

  @Post('manualLogin')
  async manualLogin(@Body() userLogin:{email:string, password:string}) {
    const isExists = await this.authService.IsUserExists({email:userLogin.email,password:userLogin.password});
    if(isExists){
      return await this.authService.login({email:userLogin.email,password:userLogin.password});
    }else{
      return isExists;
    }
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



}
