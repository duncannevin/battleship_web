import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {GameLayoutComponent} from "../../layouts/game-layout/game-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: GameLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}
