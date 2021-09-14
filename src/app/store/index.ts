import {
  ActionReducerMap, createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {userReducer, UserState} from "./user/user.reducer";
import * as userSelectors from './user/user.selectors';

export interface State {
  user: UserState
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectors = {
  user: userSelectors
}
