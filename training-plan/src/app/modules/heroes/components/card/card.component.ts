import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {

  @Input() student: Hero;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this)
  }


}
