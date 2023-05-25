import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserContainerComponent } from './user-container.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TemplateComponent } from './components/template/template.component';
// import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
// import {  GoogleSigninButtonModule } from 'angularx-social-login';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
@NgModule({
  declarations: [
    UserContainerComponent,
    RegisterComponent,
    LoginComponent,
    TemplateComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    // GoogleSigninButtonModule
    SocialLoginModule
  ],
  providers: [
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider('314561033767-4o6e5n7i8ckcchbag66r736bm1697mk0.apps.googleusercontent.com'),
    //       },
    //     ],
    //   } as SocialAuthServiceConfig
    // }
    // {
    //   id:GoogleLoginProvider.PROVIDER_ID,
    //   provider: new GoogleLoginProvider(
    //     '314561033767-4o6e5n7i8ckcchbag66r736bm1697mk0.apps.googleusercontent.com'
    //   )
    // }
  ]
})
export class UserModule {
  constructor() {
    console.log('UserModule')
  }
}
