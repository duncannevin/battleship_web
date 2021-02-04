<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Signup extends Vue {
  name = 'Signup';

  password1 = '';
  errorMsg = '';

  submit(evt) {
    evt.preventDefault();
    try {
      this.validate();
      this.errorMsg = '';
      this.$store.dispatch('AuthStore/signup');
    } catch (e) {
      this.errorMsg = e.message;
    }
  }

  validate() {
    if (!this.email.length) {
      throw new Error('Email is a required field');
    }

    if (!this.password.length || !this.password1.length) {
      throw new Error('Passwords are required fields');
    }

    if (this.password !== this.password1) {
      throw new Error('Passwords do not match');
    }

    return true;
  }

  get password() {
    return this.$store.state.AuthStore.password;
  }

  set password(value) {
    this.$store.commit('AuthStore/updatePassword', value);
  }

  get email() {
    return this.$store.state.AuthStore.email;
  }

  set email(value) {
    this.$store.commit('AuthStore/updateEmail', value);
  }
}
</script>

<template src="./template.html"></template>
<style scoped lang="scss" src="./style.scss"></style>
