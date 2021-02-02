<script>
import Vue from 'vue';
import Component from 'vue-class-component';
// Define the component in class-style
@Component
export default class extends Vue {
  name = 'Home';
  // Class properties will be component data
  count = 0;

  // Methods will be component methods
  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>
