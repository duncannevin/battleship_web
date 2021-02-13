import AuthState from '@/store/auth-store/state';
import AuthMutations from '@/store/auth-store/mutations';
import AuthActions from '@/store/auth-store/actions';
import { AuthGetters } from '@/store/auth-store/getters';

export const AuthStore = {
  namespaced: true,
  state: () => AuthState,
  mutations: AuthMutations,
  actions: AuthActions,
  getters: AuthGetters
};
