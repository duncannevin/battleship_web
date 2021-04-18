import API from '../../api';

const authLocation = '/auth';

const AuthActions = {
  async signup({ commit, state }) {
    try {
      const { data } = await doAuth('register', state);
      await commit('setAuthToken', data.token);
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
      await commit('setAuthToken', data.token);
      return data;
    } catch (e) {
      const statusCode = e.response.status;

      if (statusCode > 499) {
        throw new Error('Internal server error');
      }

      throw new Error('Unauthorized');
    }
  },
  async validateToken({ commit }) {
    const storedToken = localStorage.getItem('AUTH_TOKEN');

    if (storedToken) {
      try {
        const { data } = await API.get(`${authLocation}/users`);
        commit('updateEmail', data.email);
        commit('updateId', data.id);
        return data;
      } catch (e) {
        throw new Error('Unauthorized');
      }
    } else {
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
  return await API.post(`${authLocation}/${kind}`, reqBody);
}
