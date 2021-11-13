import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {userReducer, UserState} from './user/user.reducer';
import {boardReducer, BoardState} from './board/board.reducer';
import * as userSelectors from './user/user.selectors';
import * as boardSelectors from './board/board.selectors';

export interface State {
  user: UserState,
  board: BoardState
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  board: boardReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectors = {
  user: userSelectors,
  board: boardSelectors
}
