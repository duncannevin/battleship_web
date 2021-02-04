import AuthState from '@/store/auth-store/state';
import AuthMutations from '@/store/auth-store/mutations';
import AuthActions from '@/store/auth-store/actions';

export const AuthStore = {
  namespaced: true,
  state: () => AuthState,
  mutations: AuthMutations,
  actions: AuthActions
};
