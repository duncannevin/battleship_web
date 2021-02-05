import { ToasterState } from '@/store/toaster/state';
import { ToasterMutations } from '@/store/toaster/mutations';
import { ToasterActions } from '@/store/toaster/actions';

export const ToasterStore = {
  namespaced: true,
  state: () => ToasterState,
  mutations: ToasterMutations,
  actions: ToasterActions
};
