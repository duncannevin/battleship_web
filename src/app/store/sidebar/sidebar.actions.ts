import {createAction, props} from '@ngrx/store';
import {INavData} from '@coreui/angular';
import {SIDEBAR_SECTION} from './sidebar.reducer';

export enum SidebarActionTypes {
  pushItem = '[Sidebar] Push item',
  removeItem = '[Sidebar] Remove item',
  pushChildItem = '[Sidebar] Push child item'
}

export const pushSidebarItem = createAction(SidebarActionTypes.pushItem, props<{ section: SIDEBAR_SECTION, iNav: INavData }>());
export const removeSidebarItem = createAction(SidebarActionTypes.removeItem, props<{ section: SIDEBAR_SECTION, name: string}>());
