import Game from '@/views/Game/Game';
import store from '@/store';

const route = {
  path: '/game/',
  name: 'Game',
  component: Game,
  async beforeEnter(to, from, next) {
    try {
      await store.dispatch('AuthStore/validateToken');
      next();
    } catch (e) {
      next({ name: 'Signup' });
    }
  }
};

export default route;
