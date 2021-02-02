import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home';
import Auth from '@/views/Auth';

Vue.use(VueRouter);

const routes = [Home, Auth];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
