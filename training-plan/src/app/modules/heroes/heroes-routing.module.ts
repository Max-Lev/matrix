import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesContainerComponent } from './heroes-container/heroes-container.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '', component: HeroesContainerComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
