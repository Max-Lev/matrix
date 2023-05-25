import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesContainerComponent } from './heroes-container/heroes-container.component';
import {MatCardModule} from '@angular/material/card';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    HeroesContainerComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MatCardModule
  ]
})
export class HeroesModule { }
