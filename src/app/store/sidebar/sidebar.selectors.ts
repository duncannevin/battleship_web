import {State} from '../index';

export const selectSidebarItems = (state: State) => state.sidebar.items;
export const selectSidebarItem = (state: State, name: string) => state.sidebar.items.find((item) => item.name === name);
