import axios from 'axios';

const authLocation = 'http://192.168.99.100:9999/v1/auth';
const AuthActions = {
  async signup({ commit, state }) {
    try {
      const { data } = await doAuth('register', state);
      commit('setAuthToken', data.token);
      return data;
    } catch (e) {
      const statusCode = e.response.status;

      if (statusCode > 499) {
        throw new Error('Internal server error');
      }

      if (statusCode === 409) {
        throw new Error('Email in use');
      }

      throw new Error('Unauthorized');
    }
  },
  async login({ commit, state }) {
    try {
      const { data } = await doAuth('login', state);
      commit('setAuthToken', data.token);
      return data;
    } catch (e) {
      const statusCode = e.response.status;

      if (statusCode > 499) {
        throw new Error('Internal server error');
      }

      throw new Error('Unauthorized');
    }
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
