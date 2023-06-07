import { Injectable } from '@angular/core';
import { LoginService } from './modules/user/providers/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): boolean {
    if (this.loginService.getUser()?.access_token) {
      return true;
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }

}
