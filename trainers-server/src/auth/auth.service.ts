
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/models/create-user.dto';
import { HeroModel } from 'src/heroes/entities/hero.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
    @InjectModel('Heroes') private readonly heroesModel: Model<HeroModel>,
    @InjectModel('User') private readonly userModel: Model<User>) { }

  async validateUserMongo(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  // post a single user
  async registerCreate(createUserDTO: CreateUserDto): Promise<User> {

    const isUserExists = await this.IsUserExists(createUserDTO);

    if (!isUserExists) {
      const newUser = await new this.userModel(createUserDTO);
      console.log('registerCreate ', newUser)
      return newUser.save();

    } else {
      throw new HttpException('CONFLICT', HttpStatus.CONFLICT);
    }
  }

  async IsUserExists(createUserDto: CreateUserDto): Promise<boolean> {
    const list = await this.userModel.find({
      password: createUserDto.password,
      email: createUserDto.email
    }).exec();

    const isUserExists = (list.length) ? true : false;
    return isUserExists;

  }

  async getGoogleToken(decodedToken: string): Promise<{ _id: string, access_token: string }> {

    const details: { [email: string]: string } | string = this.jwtService.decode(decodedToken);
    console.log('user details', details);

    const user = await this.userModel.findOne({ email: details['email'] }).exec();

    console.log('Logged User: ', user);
    if (user) {

      const localUserToken: string = this.jwtService.sign({ ...user['_doc'] });
      
      return {
        _id: user._id,
        access_token: localUserToken
      }

    } else {
      throw new UnauthorizedException();
    }

  }

  async login(user: CreateUserDto): Promise<any> {
    console.log(user);
    const payload = { username: user.email, sub: user._id, roles: user?.roles };
    console.log(payload, this.jwtService.sign(payload))
    this.jwtService.signAsync(payload);
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAll(): Promise<HeroModel[]> {
    const heroes = await this.heroesModel.find().exec();
    return heroes;
  }
}


