import axios from 'axios';
import router from '@/router';

const authLocation = 'http://192.168.99.100:8080/auth/v1';
const AuthActions = {
  async signup({ commit, state }) {
    try {
      const body = {
        email: state.email,
        password: state.password
      };
      const response = await axios.post(`${authLocation}/register`, body);
      commit('setAuthToken', response.token);
    } catch (e) {
      router.push({ name: 'Home' });
    }
  }
};

export default AuthActions;
