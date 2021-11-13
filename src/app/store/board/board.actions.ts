import {createAction, props} from '@ngrx/store';
import {BoardModel} from '../../models/board.model';
import {Error} from '../../models/error.model';

enum BoardActionTypes {
  generateBoard = '[Board] Generate board',
  loadBoardSuccess = '[Board] Load board success',
  loadBoardFailure = '[Board] Load board failure'
}

export const generateBoard = createAction(BoardActionTypes.generateBoard);

export const loadBoardSuccess = createAction(BoardActionTypes.loadBoardSuccess, props<{ board: BoardModel }>());
export const loadBoardFailure = createAction(BoardActionTypes.loadBoardFailure, props<{ error: Error }>());
