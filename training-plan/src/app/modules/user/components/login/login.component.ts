import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../providers/login.service';
import { finalize, map, mergeMap, of, takeWhile, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleLoginProvider, GoogleSigninButtonDirective, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  loginForm: FormGroup;

  private accessToken = '';

  user: any;

  loggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private router: Router,
    private socialAuthService: SocialAuthService) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ])
    });

    setTimeout(() => {
      this.loginService.loggedIn = true;
    }, 3000);

  }

  ngOnDestroy(): void {

  }


  ngAfterViewInit(): void {
    
    debugger;
    this.socialAuthService.authState.pipe(
      takeWhile(() => this.loginService.loggedIn === true),
      finalize(() => {
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
      // this.loginService.loggedIn = true;
      this.loginService.setUser(registeresUser);
      // console.log('socialAuthService response registeresUser', registeresUser);
      this.router.navigate(['/heroes']);
    });
  }

  getAccessToken(): void {
    this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => {
      this.accessToken = accessToken;
    });
  }

  refreshToken(): void {
    this.socialAuthService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);

  }


}
