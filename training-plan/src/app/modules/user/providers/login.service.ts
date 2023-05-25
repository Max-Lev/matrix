import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, delay, first, map, of, repeat, retry, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GoogleUser, User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient) { };


  setUser(user: User) {
    if (user) {
      this.isLoggedIn.next(true);
    }
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.getValue();
  }

  // public get userValue() {
  //   return this.userSubject.value;
  // }
  // public set setUserValue(user:User) {
  //   debugger;
  //   this.userSubject.next(user);
  // }

  // login(formData: { userName: string, password: string }): Observable<any> {

  //   return this.httpClient.post<User>(`${environment.server}/auth/login`, formData)
  //     .pipe(tap(user => console.log(user)))
  //     .pipe(map(user => {
  //       // store user details and jwt token in local storage to keep user logged in between page refreshes
  //       localStorage.setItem('user', JSON.stringify(user));
  //       this.userSubject.next(user)
  //       return user;
  //     }));

  // }

  register(formData: { userName: string, password: string }): Observable<any> {

    return this.httpClient.post<any>(`${environment.server}/register/user`, formData, { responseType: 'json' }).pipe(
      catchError(err => {
        throw new Error(err);
      })
    );
  }


  // getGoogleUser$(): Observable<any> {
  //   debugger;
  //   return this.httpClient.get<any>(`${environment.server}/oauth2/getUser`).pipe(delay(1000), repeat(2)) as any;
  //   //   .pipe(map((googleUser: GoogleUser) => {
  //   //     console.log('getUser',googleUser)
  //   //     // this.userSubject.next(new User(googleUser.user))
  //   //     this.userSubject.next(googleUser.user)
  //   //   }))
  //   // return this.userSubject;
  // }

}
