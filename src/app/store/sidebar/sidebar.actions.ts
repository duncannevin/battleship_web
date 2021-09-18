import {createAction, props} from '@ngrx/store';
import {INavData} from '@coreui/angular';
import {PushChildINav} from '../../models/push-child-inav.model';

export enum SidebarActionTypes {
  pushItem = '[Sidebar] Push item',
  removeItem = '[Sidebar] Remove item',
  pushChildItem = '[Sidebar] Push child item'
}

export const pushSidebarItem = createAction(SidebarActionTypes.pushItem, props<{ iNav: INavData }>());
export const pushSidebarChild = createAction(SidebarActionTypes.pushChildItem, props<{ childINav: PushChildINav }>());
export const removeSidebarItem = createAction(SidebarActionTypes.removeItem, props<{ name: string}>());
