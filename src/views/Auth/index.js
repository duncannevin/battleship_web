import Login from '@/views/Auth/Login';
import Signup from '@/views/Auth/Signup';

import Auth from './Auth';

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
    }
  ]
};

export default route;
