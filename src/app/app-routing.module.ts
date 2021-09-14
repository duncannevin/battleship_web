import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameGuard} from './guards/game-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/game',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      },
      {
        canActivate: [GameGuard],
        path: 'game',
        loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/game'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
