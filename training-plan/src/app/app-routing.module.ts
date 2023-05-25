import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'user', loadChildren: () => import('./modules/user/user.module')
      .then(m => m.UserModule)
  },
  {
    path: 'heroes', loadChildren: () => import('./modules/heroes/heroes.module')
      .then(m => m.HeroesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: 'user', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
