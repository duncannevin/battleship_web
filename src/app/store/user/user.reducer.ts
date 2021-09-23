import {User} from '../../models/user.model';
import {Action, createReducer, on} from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  user: User | null,
  error: Map<string, any> | null
}

const initialState: UserState = {
  user: null,
  error: null
};

const reducer = createReducer(
  initialState,
  on(UserActions.loadUserSuccess, (state, { user }) => {
    return { user, error: null };
  }),
  on(UserActions.loadUserFailure, (state, { error }) => {
    return { user: null, error };
  }),
  on(UserActions.resetUser, () => {
    return initialState;
  })
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
