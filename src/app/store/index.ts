import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {userReducer, UserState} from "./user/user.reducer";
import * as userSelectors from './user/user.selectors';
import * as sidebarSelectors from './sidebar/sidebar.selectors';
import {sidebarReducer, SidebarState} from './sidebar/sidebar.reducer';

export interface State {
  user: UserState,
  sidebar: SidebarState
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  sidebar: sidebarReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectors = {
  user: userSelectors,
  sidebar: sidebarSelectors
}
