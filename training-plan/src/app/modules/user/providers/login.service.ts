import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { GoogleUser, User } from '../models/user.model';
import { BehaviorSubject, Observable, tap, map, catchError, of, EMPTY, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private userSubject = new BehaviorSubject<User | null>(null);

  loggedIn = true;

  constructor(private httpClient: HttpClient) {

  };


  setUser(user: User) {
    if (user.access_token) {
      this.isLoggedIn.next(true);
      this.userSubject.next(user);
    } else {
      this.isLoggedIn.next(false);
      this.userSubject.next(user);
    }
  }

  getUser(): User | null {
    const user = this.userSubject.getValue() || JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  login(formData: { username: string, email: string }): Observable<any> {

    return this.httpClient.post<User>(`${environment.server}/auth/login`, formData)
      .pipe(
        catchError(err => {
         return throwError(()=>new Error(err))
        })
      )
      .pipe(map(user => {
        this.loggedIn = true;
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user)
        return user;
      }));
  }

  register(formData: { userName: string, password: string }): Observable<any> {

    return this.httpClient.post<any>(`${environment.server}/auth/register`, formData, { responseType: 'json' }).pipe(
      catchError(err => {
        throw new Error(err);
      })
    );
  }

  manualLogin(formData: { email: string, password: string }): Observable<any> {

    return this.httpClient.post<User>(`${environment.server}/auth/manualLogin`, formData)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));

  }

}
