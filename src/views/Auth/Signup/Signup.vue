<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import router from '@/router';

@Component
export default class Signup extends Vue {
  name = 'Signup';

  password1 = '';

  async submit(evt) {
    evt.preventDefault();
    try {
      this.validate();
      this.errorMsg = '';
      await this.$store.dispatch('AuthStore/signup');
      await router.push({ name: 'Game' });
    } catch (e) {
      const statusCode = e.response.status;

      if (statusCode > 499) {
        await this.$store.dispatch('ToasterStore/pushToaster', {
          type: 'err',
          msg: 'Internal server error'
        });
        return;
      }

      if (statusCode === 403) {
        await this.$store.dispatch('ToasterStore/pushToaster', {
          type: 'err',
          msg: 'Email in use'
        });
        return;
      }

      await this.$store.dispatch('ToasterStore/pushToaster', {
        type: 'err',
        msg: 'Unauthorized'
      });
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
