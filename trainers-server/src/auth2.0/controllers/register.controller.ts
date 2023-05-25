import { Body, Controller, Header, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/users/models/create-user.dto';
import { Auth2Service } from '../auth2.service';
import { User } from 'src/users/models/user.interface';
import { Response } from 'express';

@Controller('register')
export class RegisterController {

    constructor(private readonly auth2Service: Auth2Service) { }

    @Post('user')
    async create(@Body() user: CreateUserDto, @Res() res: Response): Promise<User> {
        return await this.auth2Service.create(user);
    }


}
