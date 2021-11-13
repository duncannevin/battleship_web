import {Component, OnInit} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {State} from '../../../store';
import {generateBoard} from '../../../store/board/board.actions';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  generateBoard() {
    this.store.dispatch(generateBoard());
  }

  constructor(private actions$: Actions, private store: Store<State>) {
  }

  ngOnInit(): void {
  }
}
