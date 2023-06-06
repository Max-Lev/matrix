import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../providers/login.service';
import { map, mergeMap } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { GoogleLoginProvider, GoogleSigninButtonDirective, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { User } from '../../models/user.model';
// import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

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

  }

  ngAfterViewInit(): void {
    this.socialAuthService.authState.pipe(
      map((socialUser: SocialUser) => {
        if (socialUser !== null) {
          console.log(socialUser);
          this.loginService.setUser({ access_token: socialUser.idToken, _id: socialUser.id });
          this.loggedIn = true;
          return socialUser;
        }
        return socialUser;
      }),
      mergeMap((socialUser: SocialUser) => {
        return this.loginService.login({ username: socialUser.name, email: socialUser.email })
      })
    ).subscribe((registeresUser: { _id: string, access_token: string }) => {
      this.loginService.setUser(registeresUser);
      console.log('response ', registeresUser);
      const u = new User(registeresUser);
      this.router.navigate(['/heroes']);
    });
  }

  // signOut(): void {
  //   this.socialAuthService.signOut(true).then(d => {
  //     console.log(d);
  //   })
  // }

  getAccessToken(): void {
    this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => {
      console.log('getAccessToken ', accessToken);
      this.accessToken = accessToken;
    });
  }

  refreshToken(): void {
    this.socialAuthService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
  }

  // getGoogleCalendarData(): void {
  //   if (!this.accessToken) return;

  //   this.httpClient
  //     .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
  //       headers: { Authorization: `Bearer ${this.accessToken}` },
  //     })
  //     .subscribe((events:any) => {
  //       alert('Look at your console');
  //       console.log('events', events);
  //     });
  // }

}
