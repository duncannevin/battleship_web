import {BoardModel} from '../../models/board.model';
import {Action, createReducer, on} from '@ngrx/store';
import * as BoardActions from './board.actions';

export interface BoardState {
  board: BoardModel | null,
  error: Map<string, any> | null
}

const initialState: BoardState = {
  board: null,
  error: null
};

const reducer = createReducer(
  initialState,
  on(BoardActions.loadBoardSuccess, (state, { board }) => {
    return { board, error: null };
  }),
  on(BoardActions.loadBoardFailure, (state, { error }) => {
    return { board: null, error };
  })
);

export function boardReducer(state: BoardState | undefined, action: Action) {
  return reducer(state, action);
}
