// import { Injectable } from '@nestjs/common';
// import { GooglePayload } from './google/google-profile-payload.type';
// // import { UserService } from '../user/user.service';
// // import { User } from '../user/entities/user.entity';

// @Injectable()
// export class AuthService {
//   constructor(private readonly userService: UserService) {}

//   async manageGoogleUser(profile: GooglePayload): Promise<any> {
//     return this.userService.createOrUpdateUser({
//       displayName: profile.displayName,
//       email: profile.emails[0].value,
//       avatar: profile.photos[0].value,
//     });
//   }
// }

import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { rejects } from 'assert';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/models/create-user.dto';
import { User } from 'src/users/models/user.interface';
import { Auth } from './models/auth.schema';

@Injectable()
export class Auth2Service {

  constructor(private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Auth') private readonly authModel: Model<Auth>) {

  }

  // post a single user
  async create(createUserDTO: CreateUserDto): Promise<User | any> {

    const isUserExists = await this.IsUserExists(createUserDTO);

    if (!isUserExists) {
      const newUser = await new this.userModel(createUserDTO);
      return newUser.save();
    } else {
      // throw new HttpException({ statusCode: 409, message: 'User already exists' }, HttpStatus.CONFLICT);
      return {
        statusCode: 409,
        message: 'User already exists'
      }
    }
  }

  // @Get('check/:userID')
  async IsUserExists(createUserDto: CreateUserDto): Promise<boolean> {

    const list = await this.userModel.find({
      password: createUserDto.password,
      email: createUserDto.email
    }).exec();

    const isUserExists = (list.length) ? true : false;
    return isUserExists;

  }

  googleLogin(req) {
    if (!req.user) {
      console.log('No user from google');
      return 'No user from google'
    } else {
      console.log('User Info from Google');
      // this.setTempToken(req.user)
      return {
        message: 'User Info from Google',
        user: req.user
      }
    }
  }

  // async setTempToken(user: User | any) {
  //   const setUser = await new this.authModel({email:user.email,accessToken:user.accessToken}).save();
  //   console.log('setUser ',setUser)
  //   return setUser;
  // }

  // async getTempToken(user: User | any):Promise<Auth> {
  //    const getUser = await this.authModel.findOne({email:user.email}).exec();
  //    console.log('getUser ',getUser)
  //    return user;
  // }

}