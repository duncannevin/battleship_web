import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/register',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'auth',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'game',
        loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
