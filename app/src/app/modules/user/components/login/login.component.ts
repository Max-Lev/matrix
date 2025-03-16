import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../providers/login.service';
import { catchError, finalize, mergeMap, of, takeWhile, tap } from 'rxjs';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('appRegister') appRegister: RegisterComponent;

  user: any;

  loggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private router: Router,private cdr:ChangeDetectorRef,
    private socialAuthService: SocialAuthService) {

  }
  
  ngOnInit(): void {
    
    this.cdr.detectChanges();
    setTimeout(() => {
      this.loginService.loggedIn = true;
    }, 3000);

  }



  ngAfterViewInit(): void {
    
    this.socialAuthService.authState.pipe(
      
      takeWhile(() => this.loginService.loggedIn === true),
      finalize(() => {
        if (this.loginService.loggedIn) {
          this.appRegister?.registerForm.setErrors({ 'invalid': true });
        }
        console.log('Stopped listening to authState');
        return;
      }),
      tap((socialUser: SocialUser) => {
        if (socialUser) {
          this.loginService.setUser({ access_token: socialUser.idToken, _id: socialUser.id });
        }
      }),
      mergeMap((socialUser: SocialUser) => {
        return this.loginService.login({ username: socialUser.name, email: socialUser.email })
      })
    ).subscribe((registeresUser: { _id: string, access_token: string } | any) => {

      this.loginService.setUser(registeresUser);
      this.router.navigate(['/heroes']);
    });
  }

  ngOnDestroy(): void {

  }


}
