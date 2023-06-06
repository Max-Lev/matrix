import { Component, ChangeDetectionStrategy, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from '../../user/providers/login.service';
import { HeroModel, ActionType } from '../models/hero.model';
import { SelectHeroAction } from '../models/update-hero.model';
import { HeroesService } from '../providers/heroes.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  templateUrl: './heroes-container.component.html',
  styleUrls: ['./heroes-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesContainerComponent implements AfterViewInit, OnInit {

  heroes$: Observable<HeroModel[]>;

  isTrainLink: boolean = false;

  actionType = ActionType;

  constructor(private heroesService: HeroesService, private router: Router,
    private loginService: LoginService, private changeDetector: ChangeDetectorRef,
    // private socialAuthService: SocialAuthService,
    private activatedRoute: ActivatedRoute) {

  }

  // signOut(): void {
  //   this.socialAuthService.signOut();
  // }

  ngOnInit(): void {
    this.heroes$ = of(this.activatedRoute.snapshot.data['getAllHeroesResolver'] as HeroModel[]);
    this.isTrainLinkActive();
  }

  ngAfterViewInit(): void {

  }

  selectHeroActionHandler(event: SelectHeroAction) {

    this.lockHero(event);

    this.heroesService.selectHero$(event).subscribe((heroResponse: HeroModel) => {

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

  lockHero(event: SelectHeroAction) {
    if (event.action === ActionType.UNSELECT && event.hero.trainer !== this.loginService.getUser()?._id) {
      return;
    }
  }

  isTrainLinkActive() {
    this.heroes$.forEach((heroes: HeroModel[]) => {
      this.isTrainLink = heroes.some((hero: HeroModel) => hero.trainer === this.loginService.getUser()?._id);
    });
  }

  trainLink() {
    this.router.navigate(['train'], { relativeTo: this.activatedRoute });
  }

}
