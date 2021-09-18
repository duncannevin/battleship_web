import {INavData} from '@coreui/angular';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as SidebarActions from './sidebar.actions';

export interface SidebarState extends EntityState<INavData> {
}

export function selectItemNameAsId(item: INavData) {
  return item.name!!;
}

export const adapter: EntityAdapter<INavData> = createEntityAdapter<INavData>({
  selectId: selectItemNameAsId
});

export const initialState: SidebarState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(SidebarActions.pushSidebarItem, (state, { iNav }) => {
    return adapter.addOne(iNav, state);
  }),
  on(SidebarActions.pushSidebarChild, (state, { childINav }) => {
    return state;
  }),
  on(SidebarActions.removeSidebarItem, (state, { name }) => {
    return adapter.removeOne(name, state);
  })
);

export function sidebarReducer(state: SidebarState | undefined, action: Action) {
  return reducer(state, action);
}
