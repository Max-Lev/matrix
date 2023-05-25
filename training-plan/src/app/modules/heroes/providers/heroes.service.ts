import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private httpClient: HttpClient) { }

  getAllHeroes():Observable<any> {
    return this.httpClient.get(`${environment.server}/heroes/findAll`)
    // .subscribe(students => {
    //   console.log(students);
    // })
  }
}
