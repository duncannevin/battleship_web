import Vue from 'vue';
import Vuex from 'vuex';
import { AuthStore } from '@/store/auth-store';
import { ToasterStore } from '@/store/toaster';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AuthStore,
    ToasterStore
  }
});
