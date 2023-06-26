import { Component, OnChanges, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, interval} from 'rxjs';
import { HeroModel } from '../../models/hero.model';
import { Options } from '../../models/options.model';
import { SelectHeroAction, UpdateHeroAction } from '../../models/update-hero.model';
import { TrainingUtilityService } from '../../providers/training-utility.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  @Input() hero: HeroModel;

  @Output() selectHeroActionEmitter: EventEmitter<SelectHeroAction> = new EventEmitter();

  form: FormGroup;

  @Input() suits: Options[] = [];

  @Input() abilities: Options[] = [];

  @Output() trainHeroEmitter: EventEmitter<UpdateHeroAction> = new EventEmitter();

  @Output() formUpdateEvent: EventEmitter<UpdateHeroAction> = new EventEmitter();

  @Output() readyTrain: EventEmitter<any> = new EventEmitter();

  stop$ = new Subject<boolean>();

  destroy$ = new Subject<boolean>();

  nextTraining?: number;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private trainingUtilityService: TrainingUtilityService,) {

  }

  ngOnInit(): void {
    this.formInit();
  }

  ngAfterViewInit(): void {
    this.heroUpdate$();
    if (this.router.url === '/heroes/train') {
      this.nextTraining$(this.hero, 'load page');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes ', changes)
  }

  ngOnDestroy(): void {
    this.stop$.next(false);
    this.stop$.unsubscribe();
  }

  formInit(): void {
    this.form = this.formBuilder.group({
      suit: new FormControl(this.hero.suit),
      ability: new FormControl(this.hero.ability),
    });
  }

  heroUpdate$(): void {
    this.form.valueChanges
    // .pipe(takeUntil(this.stop$))
    .subscribe(value => {
      this.formUpdateEvent.emit({ hero: { ...this.hero }, payload: value });
    });
  }

  selectHeroAction(event: SelectHeroAction): void {
    this.selectHeroActionEmitter.emit(event);
  }

  trainHeroAction(hero: HeroModel) {

    hero = this.trainingUtilityService.power$(hero);
    this.nextTraining$(hero, 'user action');
  }


  nextTraining$(hero: HeroModel, action: string) {

    if (action === 'user action') {
      if (hero.trainingCounter === 0) {
        hero = Object.assign(hero, { trainingCounter: ++hero.trainingCounter, startDate: new Date() });
      }
      else {
        hero = Object.assign(hero, { trainingCounter: ++hero.trainingCounter });
      }
      this.trainHeroEmitter.emit({ hero, payload: {} });
    }

    const startTraining = new Date(hero.startDate).getTime();
    this.nextTraining = +new Date(startTraining).setSeconds(new Date(startTraining).getSeconds() + 10).toString();

    interval(1000).pipe(takeUntil(this.destroy$)).subscribe({
      next: (timeCounter: number) => {
        console.log('time counter: ', timeCounter, 'now:', new Date());

        if (Date.now() > this.nextTraining!) {
          if (hero.trainingCounter !== 0) {
            this.trainHeroEmitter.emit({ hero, payload: { trainingCounter: 0 } });
          }
          // console.log('stop: ', new Date());
          this.destroy$.next(false);
        }

      }
    });
  }



}
