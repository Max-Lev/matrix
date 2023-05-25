import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './jwt.interceptor';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // GoogleSigninButtonModule
    // OAuthModule.forRoot({
    //   resourceServer: {
    //     allowedUrls: ['http://localhost:3000'],
    //     sendAccessToken: true
    //   }
    // })

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            // id: '429041238969-slhmsmnhj4imi93g2vka73tpof0p5iup.apps.googleusercontent.com',
            provider: new GoogleLoginProvider('429041238969-slhmsmnhj4imi93g2vka73tpof0p5iup.apps.googleusercontent.com',
              {
                oneTapEnabled: false
              })
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
