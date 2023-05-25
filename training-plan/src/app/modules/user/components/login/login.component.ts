import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../providers/login.service';
import { first, firstValueFrom, map, take, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";
// import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  private accessToken = '';

  user: any;
  loggedIn: any;

  signin_with = 'Google'

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private router:Router,
    private socialAuthService: SocialAuthService) {

  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ])
    });
    // const user = this.socialAuthService.authState
    //   .pipe(
    //     //   // take(1)
    //     map((user: User) => ({ ...user }))
    //     //   // firstValueFrom(user=>user)
    //   )
    //   .pipe(tap(u => console.log(u)));
    // this.loginService.setUser(user);
    this.socialAuthService.authState.subscribe((user:User) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
      console.log(this.loggedIn);
      this.loginService.setUser(user)
      this.router.navigate(['/heroes']);
    });


  }

  // login() {
  //   if (this.loginForm.valid) {
  //     this.loginService.login(this.loginForm.value)
  //       .subscribe({
  //         next: (user: User) => {
  //           console.log(user)
  //           // localStorage.setItem('user', JSON.stringify(user.access_token));
  //           this.router.navigate(['/heroes']);
  //         },
  //         error: (err) => console.log(err)
  //       });
  //   }
  //   console.log('login', this.loginForm.valid)
  // }

  // googleLogin() {
  //   document.location.href = 'http://localhost:3000/oauth2';
  //   // this.loginService.auth$.next(true);
  // }

  signOut(): void {
    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.signOut();
  }
  getAccessToken(): void {
    // this.socialAuthService.
    this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => {
      console.log(accessToken);
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
