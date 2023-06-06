import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesContainerComponent } from './heroes-container/heroes-container.component';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { TrainComponent } from './components/train/train.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TrainingUtilityService } from './providers/training-utility.service';
import { OrderbyPipe } from './pipes/orderby.pipe';

@NgModule({
  declarations: [
    HeroesContainerComponent,
    CardComponent,
    TrainComponent,
    OrderbyPipe
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [
    TrainingUtilityService,
    OrderbyPipe
  ]
})
export class HeroesModule { }
