import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../providers/login.service';
import { map, mergeMap, of } from 'rxjs';

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

  g() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log(user);
    })
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: "429041238969-slhmsmnhj4imi93g2vka73tpof0p5iup.apps.googleusercontent.com",
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,

      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("google-button"),
        { theme: "outline", size: "large", width: "100%" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {
        console.log('notification ', notification);
      });
    }, 2000);

    this.socialAuthService.authState.pipe(
      map((socialUser: SocialUser) => {
        if (socialUser !== null) {
          console.log('socialUser: ', socialUser);

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

  async handleCredentialResponse(response: {
    clientId: string, client_id: string,
    credential: string, select_by: string
  }) {
    // Here will be your response from Google.
    console.log(response);
    of(response).pipe(
      map((response) => {
        if (response !== null) {
          console.log('socialUser: ', response);

          this.loginService.setUser({
            access_token: response.credential,
            _id: response.client_id
          });

          this.loggedIn = true;
          return response;
        }
        return response as any;
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

  getAccessToken(): void {
    this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => {
      console.log('getAccessToken ', accessToken);
      this.accessToken = accessToken;
    });
  }

  refreshToken(): void {
    this.socialAuthService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);

  }


}

// function handleCredentialResponse(response:any) {
//   console.log("Encoded JWT ID token: " + response.credential);
// }
// window.onload = function () {
//   google.accounts.id.initialize({
//     client_id: "429041238969-slhmsmnhj4imi93g2vka73tpof0p5iup.apps.googleusercontent.com",
//     callback: handleCredentialResponse
//   });
//   google.accounts.id.renderButton(
//     document.getElementById("buttonDiv"),
//     { theme: "outline", size: "large" }  // customization attributes
//   );
//   google.accounts.id.prompt(); // also display the One Tap dialog
// }