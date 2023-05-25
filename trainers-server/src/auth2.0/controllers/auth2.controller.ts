import { Controller, Get, UseGuards, Req, ConsoleLogger, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth2Service } from '../auth2.service';
import { Response, Request } from 'express';
import { User } from 'src/users/models/user.interface';


@Controller('oauth2')
export class Auth2Controller {

  private readonly logger = new ConsoleLogger(Auth2Controller.name);

  user = {};

  constructor(private readonly auth2Service: Auth2Service) {
    console.log('cnstr')
    // this.user = {};
  }


  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    this.user = {};
    this.logger.log('login with google', req);
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // res.redirect(`${process.env['FRONTEND_URL']}`);
    const user = await this.auth2Service.googleLogin(req);
    this.user = user;
    // return user;
    // this.getUser();
    res.redirect('http://localhost:4200/auth');
    // res.redirect('back');
    // location.href = 'http://localhost:4200/auth';
    // res.send(200)
    // return user;
  }

  // @Get('getUser')
  // async getUser() {
  //   const temp =  await this.auth2Service.getTempToken(this.user);
  //   console.log(temp);
  //   return temp;

  //   // res.redirect(301, 'http://localhost:4200/auth');
  //   // return await this.user;
  // }

  // @Controller('oauth2')
  // export class AuthController {
  //   private readonly logger = new ConsoleLogger(AuthController.name);

  //   @UseGuards(GoogleOAuth2Guard)
  //   @Get('login/google')
  //   async login(@Request() _req) {
  //     this.logger.log('login with google');
  //   }

  //   /**
  //    * Methode appeler par google apres l'authetification.
  //    * Vous pouver l'utiliser pour faire la redirection vers votre site
  //    */
  //   @UseGuards(GoogleOAuth2Guard)
  //   @Get('callback')
  // async callbackGoogle(@Req() req, @Res() res: Response) {
  //   res.redirect(`${process.env['FRONTEND_URL']}`);
  // }
}
