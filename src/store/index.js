import Vue from 'vue';
import Vuex from 'vuex';
import { AuthStore } from '@/store/auth-store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AuthStore
  }
});
