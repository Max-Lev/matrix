import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HeroesService } from './providers/heroes.service';
import { HeroModel } from './models/hero.model';
import { Options } from './models/options.model';

@Injectable({
  providedIn: 'root'
})
export class IsSelectedGuard implements CanActivate {

  constructor(
    private router: Router, private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,) {

  }
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | any {

    return this.heroesService.getHeroesByTrainerId$().pipe(
      map((value: { heroes: HeroModel[], suits: Options[], abilities: Options[] }) => {
        if (value.heroes.length > 0) {
          return true;
        } else {
          return this.router.createUrlTree(['/heroes']); // Redirect if no heroes
        }
      })
    );

  }

}
