import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://192.168.99.100:3000/';
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('AUTH_TOKEN');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
