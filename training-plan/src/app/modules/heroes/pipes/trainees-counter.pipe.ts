import { Pipe, type PipeTransform } from '@angular/core';
import { HeroModel } from '../models/hero.model';
import { User } from '../../user/models/user.model';

@Pipe({
  name: 'traineesCounter',
  pure:false,
  standalone: false,
})
export class TraineesCounterPipe implements PipeTransform {

  transform(heroes: HeroModel[], args: User): number {
    const counter = [];
    heroes.forEach(hero => (hero.trainer === args._id) ? counter.push(hero) : null);
    return counter.length;
  }

}
