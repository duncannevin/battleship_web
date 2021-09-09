import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {userReducer, UserState} from "./user/user.reducer";

export interface State {
  user: UserState
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectUser = (state: State) => state.user.user;
export const selectUserError = (state: State) => state.user.error;
