import { Component, ChangeDetectionStrategy, AfterViewInit, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, lastValueFrom, map, of, takeUntil } from 'rxjs';
import { LoginService } from '../../user/providers/login.service';
import { HeroModel, ActionType } from '../models/hero.model';
import { SelectHeroAction } from '../models/update-hero.model';
import { HeroesService } from '../providers/heroes.service';
import { User } from '../../user/models/user.model';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-heroes-container',
  templateUrl: './heroes-container.component.html',
  styleUrls: ['./heroes-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesContainerComponent implements AfterViewInit, OnInit, OnDestroy {

  heroes$: Observable<HeroModel[]>;

  isTrainLink: boolean = false;

  actionType = ActionType;

  stop$ = new Subject<boolean>();

  constructor(private heroesService: HeroesService, private router: Router,
    private loginService: LoginService, private changeDetector: ChangeDetectorRef,
    private socialAuthService: SocialAuthService,
    private activatedRoute: ActivatedRoute) {

  }
  ngOnDestroy(): void {
    this.stop$.next(false);
    this.stop$.unsubscribe();
  }

  ngOnInit(): void {
    this.heroes$ = of(this.activatedRoute.snapshot.data['getAllHeroesResolver'] as HeroModel[]);
    
    lastValueFrom(this.heroes$.pipe(map(heroes => {
      console.log('getAllHeroesResolver: ',heroes);
      return heroes;
    })));
    
    this.activatedRoute.data.subscribe(data => {
      const _data = data['getAllHeroesResolver']; // 👈 Automatically updates when route changes
      console.log('_data: ',_data);
    });

    this.isTrainLinkActive();
  }

  ngAfterViewInit(): void {

    const user  = this.loginService.getUser();
    console.log('user: ', user);
    
  }

  selectHeroActionHandler(event: SelectHeroAction) {

    this.heroesService.selectHero$(event).pipe(takeUntil(this.stop$)).subscribe((heroResponse: HeroModel) => {

      this.heroes$.forEach((heroes: HeroModel[]) => heroes.map((hero: HeroModel) => {
        if (hero._id === heroResponse._id) {
          hero = Object.assign(hero, { ...heroResponse });
        }
        return hero;
      }));

      this.isTrainLinkActive();

      this.changeDetector.detectChanges();
    });

  }

  isTrainLinkActive() {
    this.heroes$.forEach((heroes: HeroModel[]) => {
      this.isTrainLink = heroes.some((hero: HeroModel) => hero.trainer === this.loginService.getUser()?._id);
    });
  }

  trainLink() {
    this.router.navigate(['train'], { relativeTo: this.activatedRoute });
  }

  logOut() {
    this.loginService.loggedIn = false;
    localStorage.removeItem('user');
    this.loginService.setUser(new User());
    this.router.navigate(['user']);
  }

}
