import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {GameLayoutComponent} from "../../layouts/game-layout/game-layout.component";
import {StageComponent} from './stage/stage.component';

export const routes: Routes = [
  {
    path: '',
    component: GameLayoutComponent,
    children: [
      {
        path: 'stage',
        component: StageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}
