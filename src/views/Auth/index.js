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
      path: 'signup',
      component: Signup
    },
    {
      path: 'login',
      component: Login
    }
  ]
};

export default route;
