import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../index';
import * as BoardActions from './board.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {BoardService} from '../../services/board.service';
import {Observable, of} from 'rxjs';
import {BoardModel} from '../../models/board.model';
import {loadBoardFailure, loadBoardSuccess} from './board.actions';

@Injectable()
export class BoardEffects {
  generateBoard$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(BoardActions.generateBoard),
        exhaustMap((action) => (
          this.boardService.generate()
            .pipe(this.setBoard())
        ))
      ));

  constructor(private actions$: Actions, private store: Store<State>, private boardService: BoardService) {
  }

  private setBoard() {
    return (source: Observable<BoardModel>): Observable<Action> => {
      return source.pipe(
        map((board) => (loadBoardSuccess({board}))),
        catchError((error) => of(loadBoardFailure({error})))
      )
    }
  }
}
