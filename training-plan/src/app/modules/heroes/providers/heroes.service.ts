import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActionType, HeroModel } from '../models/hero.model';
import { Options } from '../models/options.model';
import { LoginService } from '../../user/providers/login.service';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getHeroesByTrainerId$(): Observable<{ heroes: HeroModel[], suits: Options[], abilities: Options[] }> {

    const abilities$ = this.getHeroAbilities$();
    const suits$ = this.getHeroSuits$();

    const id = this.loginService.getUser()?._id!;
    let params = new HttpParams();
    params = params.append('id', id);
    
    const heroes$ = this.httpClient.get<HeroModel[]>(`${environment.server}/heroes/getHeroesByTrainerId`, { params: params });

    return forkJoin({ heroes: heroes$, suits: suits$, abilities: abilities$ }).pipe(
      map((value: { heroes: HeroModel[], suits: Options[], abilities: Options[] }) => {
        return value;
      }));
  }

  getAllHeroes$(): Observable<HeroModel[]> {
    return this.httpClient.get<HeroModel[]>(`${environment.server}/heroes/getAllHeroes`);
  }

  getHeroSuits$(): Observable<Options[]> {
    return this.httpClient.get<Options[]>(`${environment.server}/heroes/getHeroSuits`);
  }

  getHeroAbilities$(): Observable<Options[]> {
    return this.httpClient.get<Options[]>(`${environment.server}/heroes/getHeroAbilities`);
  }

  selectHero$(event: { hero: HeroModel, action: ActionType }): Observable<HeroModel> {
    const _id = this.loginService.getUser()?._id;
    const payload = { user: { _id: _id }, hero: event.hero, action: event.action };
    return this.httpClient.post<HeroModel>(`${environment.server}/heroes/selectHero`, payload);
  }

  updateHero$(hero: HeroModel): Observable<HeroModel> {
    return this.httpClient.post<HeroModel>(`${environment.server}/heroes/updateHero`, hero)

  }

}
