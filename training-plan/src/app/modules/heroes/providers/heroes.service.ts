import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, map, of, shareReplay, switchMap, tap, toArray } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HeroModel } from '../models/hero.model';
import { Options } from '../models/options.model';
import { LoginService } from '../../user/providers/login.service';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private httpClient: HttpClient,
    private loginService: LoginService) { }

  // resolveHero$(): Observable<{ heroes: HeroModel[], suits: Options[], abilities: Options[] }> {
  // resolveHero$(): Observable<HeroModel[]> {

  //   const heroes$ = this.getAllHeroes();
  //   const suits$ = this.getHeroSuits$();
  //   const abilities$ = this.getHeroAbilities$();
  //   return heroes$;
  //   // return forkJoin({ heroes: heroes$, suits: suits$, abilities: abilities$ }).pipe(
  //   //   map((value: { heroes: HeroModel[], suits: Options[], abilities: Options[] }) => {
  //   //     return { ...value }
  //   //   })
  //   // );

  // }

  getHeroesByTrainerId$(): Observable<{ heroes: HeroModel[], suits: Options[], abilities: Options[] }> {

    const abilities$ = this.getHeroAbilities$();
    const suits$ = this.getHeroSuits$();

    const id = this.loginService.getUser()?._id!;
    let params = new HttpParams();
    params = params.append('id', id);

    const heroes$ = this.httpClient.get<HeroModel[]>(`${environment.server}/heroes/getHeroesByTrainerId`, {
      params: params
    });

    return forkJoin({ heroes: heroes$, suits: suits$, abilities: abilities$ }).pipe(
      map((value: { heroes: HeroModel[], suits: Options[], abilities: Options[] }) => {
        console.log(value)
        return { ...value }
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

  selectHero$(event: { hero: HeroModel, action: string }): Observable<HeroModel> {
    const _id = this.loginService.getUser()?._id;
    const payload = { user: { _id: _id }, hero: event.hero, action: event.action };
    return this.httpClient.post<HeroModel>(`${environment.server}/heroes/selectHero`, payload);
  }

  updateHero$(hero: HeroModel): Observable<HeroModel> {
    return this.httpClient.post<HeroModel>(`${environment.server}/heroes/updateHero`, hero)

  }

}
