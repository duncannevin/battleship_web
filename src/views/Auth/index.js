import Login from '@/views/Auth/Login';
import Signup from '@/views/Auth/Signup';

import Auth from './Auth';
import store from '@/store';

const route = {
  path: '/auth/',
  name: 'Auth',
  component: Auth,
  children: [
    {
      path: '',
      redirect: 'signup'
    },
    {
      name: 'Signup',
      path: 'signup',
      component: Signup
    },
    {
      name: 'Login',
      path: 'login',
      component: Login
    },
    {
      name: 'Logout',
      path: 'logout',
      async beforeEnter(to, from, next) {
        await store.commit('AuthStore/removeAuthToken');
        next({ name: 'Home' });
      }
    }
  ]
};

export default route;
