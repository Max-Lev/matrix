import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from './modules/user/providers/login.service';
import { Router } from '@angular/router';
import { User } from './modules/user/models/user.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    // const user = this.loginService.userValue;
    // const token = this.loginService.userSubject$;
    // debugger;
    // // ÷const isLoggedIn = user?.accessToken;//user?.accessToken;
    // const isLoggedIn = this.loginService.isLoggedIn.getValue();//user?.accessToken;
    // const isApiUrl = request.url.startsWith(environment.server);
    // console.log(token, isLoggedIn)
    const user: User | null = this.loginService.getUser();

    if (user?.idToken && this.loginService.isLoggedIn.getValue()) {
      // if (isApiUrl) {
      request = request.clone({
        setHeaders: {
          // Authorization: `Bearer ${isLoggedIn}`
          Authorization: `Bearer ${user?.idToken}`

          // https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/drive.metadata.readonly&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/oauth2/auth/google/callback&client_id=314561033767-4o6e5n7i8ckcchbag66r736bm1697mk0.apps.googleusercontent.com
          // http://localhost:3000/oauth2/auth/google/callback
        }
      });
      console.log('request ', request);
    }

    return next.handle(request)
      .pipe(
        map(res => {
          // *** console ***.log("Passed through the interceptor in response");
          return res
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('Interceptor ', error);
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            // *** console ***.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // *** console ***.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            if (error.error.statusCode === 401) {
              this.router.navigate(['/user/login']);
            }
          }
          return throwError(() => errorMsg);
        })
      );
  }

}
