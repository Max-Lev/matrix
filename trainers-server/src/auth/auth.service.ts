
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/models/create-user.dto';
import { threadId } from 'worker_threads';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>
  ) { }

  async validateUserMongo(usern: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email: usern });
    if (user && user.password === pass) {
      // const { password, ...result } = user;
      // return result;
      return user;
    }
    return null;
  }

  // post a single user
  async create(createUserDTO: CreateUserDto): Promise<User> {

    const isUserExists = await this.IsUserExists(createUserDTO);

    if (!isUserExists) {
      const newUser = await new this.userModel(createUserDTO);
      console.log(newUser)
      return newUser.save();

    } else {
      throw new HttpException('CONFLICT', HttpStatus.CONFLICT);
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

  async login(user: CreateUserDto): Promise<any> {
    console.log(user);
    const payload = { username: user.email, sub: user._id, roles: user.roles };
    console.log(payload, this.jwtService.sign(payload),)
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  // async getHelloAdmin() {
  //   return "You are in the admin panel"
  // }
}


