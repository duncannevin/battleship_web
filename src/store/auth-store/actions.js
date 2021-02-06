import axios from 'axios';

const authLocation = 'http://192.168.99.100:9999/v1/auth';
const AuthActions = {
  async signup({ commit, state }) {
    const { data } = await doAuth('register', state);
    commit('setAuthToken', data.token);
    return data;
  },
  async login({ commit, state }) {
    const { data } = await doAuth('login', state);
    commit('setAuthToken', data.token);
    return data;
  }
};

export default AuthActions;

async function doAuth(kind, state) {
  const reqBody = {
    email: state.email,
    password: state.password
  };
  return await axios.post(`${authLocation}/${kind}`, reqBody);
}
