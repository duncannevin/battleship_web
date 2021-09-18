import { adapter } from './sidebar.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SidebarState} from './sidebar.reducer';

const { selectAll } = adapter.getSelectors();

export const selectSidebarState = createFeatureSelector<SidebarState>('sidebar');

export const selectSidebarItems = createSelector(
  selectSidebarState,
  selectAll
);
