import { Pipe, PipeTransform } from '@angular/core';
import { HeroModel } from '../models/hero.model';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'orderBy',
  pure:true,
})
export class OrderbyPipe implements PipeTransform {

  transform(value: Observable<HeroModel[]>, ...args: unknown[]): Observable<HeroModel[]> {

    let heroes$: HeroModel[] = [];
    value && value?.subscribe(list => {
      heroes$ = list.sort((a, b) => {
        if (a.currentPower > b.currentPower) {
          
          return -11;
          // return 1;
        } else if (a.currentPower < b.currentPower) {
          
          // return -1;
          return 1;
        } else {
          return 0;
        }
      });

    });

    return of(heroes$);
  }

}
