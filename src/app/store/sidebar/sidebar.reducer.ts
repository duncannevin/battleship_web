import {INavData} from '@coreui/angular';
import {SidebarAction, SidebarActionTypes} from './sidebar.actions';

export interface SidebarState {
  items: INavData[]
}

const initialState: SidebarState = {
  items: [
  ]
};

export function sidebarReducer(state: SidebarState = initialState, action: SidebarAction) {
  switch (action.type) {
    case SidebarActionTypes.pushItem:
      return action.payload?.push ?
        { ...state, items: [...state.items, action.payload?.push] } :
        state;
    case SidebarActionTypes.removeItem:
      return { ...state, items: state.items.filter((item) => item.name !== action.payload)};
    default:
      return state;
  }
}
