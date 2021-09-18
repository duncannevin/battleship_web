import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameRoutingModule} from "./game-routing.module";
import { StageComponent } from './stage/stage.component';

@NgModule({
  declarations: [
    StageComponent
  ],
  imports: [
    GameRoutingModule,
    CommonModule
  ]
})
export class GameModule { }
