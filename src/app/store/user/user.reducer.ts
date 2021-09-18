import {User} from '../../models/user.model';
import {UserAction, UserActionTypes} from './user.actions';

export interface UserState {
  user: User | null,
  error: any
}

const initialState: UserState = {
  user: null,
  error: null
};

export function userReducer(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    case UserActionTypes.loadUserSuccess:
      return { ...state, ...action.payload, error: null };
    case UserActionTypes.loadUserFailure:
      return { ...state, user: null, ...action.payload };
    default:
      return state;
  }
}
