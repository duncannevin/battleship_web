<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Toaster extends Vue {
  name = 'Toaster';

  get toasters() {
    return this.$store.state.ToasterStore.toasters;
  }
}
</script>

<template src="./template.html"></template>
<style scoped lang="scss" src="./style.scss"></style>
