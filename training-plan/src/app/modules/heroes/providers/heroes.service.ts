import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActionType, HeroModel } from '../models/hero.model';
import { Options } from '../models/options.model';
import { LoginService } from '../../user/providers/login.service';
import { BehaviorSubject, Observable, filter, forkJoin, map, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) {
    
  }

  private heroesCache$: Observable<{ heroes: HeroModel[], suits: Options[], abilities: Options[] }> | null = null;

  private getAllHeroesCache$:Observable<HeroModel[]> | null = null;
  getHeroesByTrainerId$(): Observable<{ heroes: HeroModel[], suits: Options[], abilities: Options[] }> {

    if (!this.heroesCache$) {
      const abilities$ = this.getHeroAbilities$();
      const suits$ = this.getHeroSuits$();
  
      const id = this.loginService.getUser()?._id!;
      let params = new HttpParams();
      params = params.append('id', id);
  
      const heroes$ = this.httpClient.get<HeroModel[]>(`${environment.server}/heroes/getHeroesByTrainerId`, { params });
  
      this.heroesCache$ = forkJoin({ heroes: heroes$, suits: suits$, abilities: abilities$ }).pipe(
        map((value) => {
          return value;
        }),
        shareReplay(1) // ✅ Caches and reuses last result
      );
    }
  
    return this.heroesCache$;
  }

  getAllHeroes$(): Observable<HeroModel[]> {
    if (!this.getAllHeroesCache$) {
      return this.getAllHeroesCache$ = this.httpClient.get<HeroModel[]>(`${environment.server}/heroes/getAllHeroes`).pipe(
        map((heroes: HeroModel[]) => {
          return heroes;
        }),
        shareReplay(1) // ✅ Caches and reuses last result
      );
    }
    return this.getAllHeroesCache$;
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
