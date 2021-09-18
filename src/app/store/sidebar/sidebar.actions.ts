import {Action} from '@ngrx/store';
import {INavData} from '@coreui/angular';

export enum SidebarActionTypes {
  pushItem = '[Sidebar] Push item',
  removeItem = '[Sidebar] Remove item'
}

export class SidebarAction implements Action {
  type!: string;
  payload?: {
    push?: INavData,
    remove?: string
  }
}

export class PushSidebarItem implements SidebarAction {
  type = SidebarActionTypes.pushItem

  constructor(readonly payload: { push: INavData }) {
  }
}

export class RemoveItem implements SidebarAction {
  type = SidebarActionTypes.removeItem

  constructor(readonly payload: { remove: string }) {
  }
}

export type SidebarActions = PushSidebarItem | RemoveItem;
