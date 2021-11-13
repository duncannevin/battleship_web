import {createFeatureSelector} from '@ngrx/store';
import {BoardState} from '../board/board.reducer';

export const selectBoardState = createFeatureSelector<BoardState>('board');
