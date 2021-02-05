import axios from 'axios';

const authLocation = 'http://192.168.99.100:9999/v1/auth';
const AuthActions = {
  async signup({ commit, state }) {
    const body = {
      email: state.email,
      password: state.password
    };
    const response = await axios.post(`${authLocation}/register`, body);
    return commit('setAuthToken', response.token);
  }
};

export default AuthActions;
