import { HttpClientModule } from '@angular/common/http';
import { inject, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainComponent } from './components/train/train.component';
import { HeroesContainerComponent } from './heroes-container/heroes-container.component';
import { HeroesService } from './providers/heroes.service';

const routes: Routes = [
  {
    path: '', component: HeroesContainerComponent,
    resolve: {
      getAllHeroesResolver: () => inject(HeroesService).getAllHeroes$()
    }
  },
  {
    path: 'train', component: TrainComponent,
    resolve: {
      trainHeroesResolver: () => inject(HeroesService).getHeroesByTrainerId$()
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: []
})
export class HeroesRoutingModule { }
