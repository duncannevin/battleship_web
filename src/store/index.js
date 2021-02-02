import Vue from 'vue';
import Vuex from 'vuex';

import AuthState from '@/store/auth-store/state';
import AuthMutations from '@/store/auth-store/mutations';
import AuthActions from '@/store/auth-store/actions';
import AuthModules from '@/store/auth-store/modules';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...AuthState
  },
  mutations: {
    ...AuthMutations
  },
  actions: {
    ...AuthActions
  },
  modules: {
    ...AuthModules
  }
});
