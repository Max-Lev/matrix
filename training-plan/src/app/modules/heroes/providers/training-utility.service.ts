import { Injectable } from '@angular/core';
import { HeroModel } from '../models/hero.model';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingUtilityService {

  constructor() {

  }

  power$(hero: HeroModel): HeroModel {
    
    const boost = +(Math.random() * 10).toFixed(2);
    
    const currentPower = +(hero.startingPower * boost).toFixed(3);

    hero = Object.assign(hero, { currentPower: currentPower });
    return hero;

  }

}
