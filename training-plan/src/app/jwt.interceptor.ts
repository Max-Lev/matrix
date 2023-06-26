import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
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
    const debuggToken = JSON.parse(localStorage.getItem('user') || '{}').access_token;
    const token: string | undefined = this.loginService!.getUser()?.access_token;// || debuggToken;
    const isLoggedIn: boolean = this.loginService.isLoggedIn.getValue();
    console.log(debuggToken, token, isLoggedIn);
    // if (token && isLoggedIn) {
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
      // console.log('request ', request);
    }

    return next.handle(request)
      .pipe(

        map((event: any) => {
          if ((event instanceof HttpResponse) && event.body && event.body['access_token']) {
            this.loginService.setUser(event.body['access_token']);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('Interceptor ', error);
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            if (error.error.statusCode === 401) {
              // this.router.navigate(['/'])
              this.router.navigate(['/user/login']);
              return throwError(() => new Error(error.error));
            }
          }
          return throwError(() => errorMsg);
        })
      );
  }

}
