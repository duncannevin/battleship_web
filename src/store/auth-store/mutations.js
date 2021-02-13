const AuthMutations = {
  updateId: (state, id) => (state.id = id),
  updateEmail: (state, email) => (state.email = email),
  updatePassword: (state, pw) => (state.password = pw),
  setAuthToken: (state, token) => {
    localStorage.setItem('AUTH_TOKEN', token);
    state.authToken = token;
  },
  removeAuthToken: state => {
    localStorage.removeItem('AUTH_TOKEN');
    state.authToken = null;
  }
};

export default AuthMutations;
