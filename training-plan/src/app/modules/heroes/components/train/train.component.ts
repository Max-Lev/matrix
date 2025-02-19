import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';
import { HeroModel } from '../../models/hero.model';
import { Options } from '../../models/options.model';
import { UpdateHeroAction } from '../../models/update-hero.model';
import { HeroesService } from '../../providers/heroes.service';
import { OrderbyPipe } from '../../pipes/orderby.pipe';


@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainComponent implements OnInit, OnDestroy {

  heroes$: Observable<HeroModel[]>;

  suits: Options[] = [];

  abilities: Options[] = [];

  stop$ = new Subject<boolean>();

  constructor(private changeDetector: ChangeDetectorRef, private activatedRoute: ActivatedRoute,
    private orderbyPipe: OrderbyPipe, private router: Router,
    private heroesService: HeroesService) {

  }


  ngOnInit(): void {

    const { abilities, heroes, suits } = this.activatedRoute.snapshot.data['trainHeroesResolver'];
    this.heroes$ = of(heroes);
    this.abilities = abilities;
    this.suits = suits;
  }

  ngOnDestroy(): void {
    this.stop$.next(false);
    this.stop$.unsubscribe();
  }

  trainHeroHandler(action: UpdateHeroAction) {
    debugger;
    this.formUpdateEventHandler(action);
  }

  formUpdateEventHandler(action: UpdateHeroAction) {

    let _hero: HeroModel = { ...action.hero, ...action.payload };
    // _hero = this.trainingUtilityService.power$(_hero);
    debugger;
    this.heroesService.updateHero$(_hero).subscribe((heroResponse: HeroModel) => {
      debugger;
      console.log('heroResponse ', heroResponse);
      this.setHeroesState(action, heroResponse);
    });

  }

  setHeroesState(action: UpdateHeroAction, heroResponse: HeroModel) {

    this.heroes$.forEach((heroes: HeroModel[]) => heroes.map((hero: HeroModel) => {
      if (hero._id === action.hero._id) {
        hero = Object.assign(hero, { ...heroResponse });
      }
      return hero;
    }));
    this.heroes$ = this.orderbyPipe.transform(this.heroes$);
    this.changeDetector.detectChanges();

  }

  back() {
    this.router.navigate(['heroes'])
  }

}
