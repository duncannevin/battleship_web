import {UserState} from './user.reducer';
import {State} from '../index';

export const selectUser = (state: State) => state.user.user;
export const selectUserError = (state: State) => state.user.error;
export const isUserAuthorized = (user: UserState) => (user.user && !user.error);
