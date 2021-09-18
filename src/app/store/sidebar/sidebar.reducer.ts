import {INavData} from '@coreui/angular';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as SidebarActions from './sidebar.actions';

export interface SidebarState extends EntityState<INavData> {
}

export function selectItemNameAsId(item: INavData) {
  return item.name!!;
}

export enum SIDEBAR_SECTION {
  BATTLING = 'battling',
  STAGED = 'staged',
  PREPARE = 'prepare'
}

export const adapter: EntityAdapter<INavData> = createEntityAdapter<INavData>({
  selectId: selectItemNameAsId
});

export function insertSection(section: SIDEBAR_SECTION, iNav: INavData, state: SidebarState) {
  const asArray = adapter.getSelectors().selectAll(state);
  const sectionIndex = asArray.findIndex((iNav) => iNav.title && iNav.name === section);

  if (sectionIndex === undefined) {
    return state;
  }

  return adapter.addMany(asArray.splice(sectionIndex + 1, 1, iNav), state);
}

export const initialState: SidebarState = adapter.getInitialState({
  ids: ['In Battle', 'Your Move', 'Enemy Move', 'Ready For Battle', 'Your Fleets', 'Enemy Fleets', 'Prepare For Battle', 'Stage a Fleet'],
  entities: {
    'In Battle': {
      title: true,
      name: 'In Battle'
    },
    'Your Move': {
      base: '/game',
      name: 'Your Move',
      children: [
      ]
    },
    'Enemy Move': {
      base: '/game',
      name: 'Enemy Move',
      children: [
      ]
    },
    'Ready For Battle': {
      title: true,
      name: 'Ready For Battle'
    },
    'Your Fleets': {
      base: '/game',
      name: 'Your Fleets',
      children: [
      ]
    },
    'Enemy Fleets': {
      base: '/game',
      name: 'Enemy Fleets',
      children: [
      ]
    },
    'Prepare For Battle': {
      title: true,
      name: 'Prepare For Battle'
    },
    'Stage a Fleet': {
      name: 'Stage a Fleet',
      url: '/game/stage'
    }
  }
});

const reducer = createReducer(
  initialState,
  on(SidebarActions.pushSidebarItem, (state, { section, iNav }) => {
    return insertSection(section, iNav, state);
  }),
  on(SidebarActions.removeSidebarItem, (state, { section, name }) => {
    return adapter.removeOne(name, state);
  })
);

export function sidebarReducer(state: SidebarState | undefined, action: Action) {
  return reducer(state, action);
}
