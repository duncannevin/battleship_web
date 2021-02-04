const AuthMutations = {
  updateEmail: (state, email) => (state.email = email),
  updatePassword: (state, pw) => (state.password = pw),
  setAuthToken: (state, token) => {
    localStorage.setItem('AUTH_TOKEN', token);
    state.authToken = token;
  }
};

export default AuthMutations;
