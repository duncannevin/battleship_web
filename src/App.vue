<template>
  <div id="app">
    <Toaster></Toaster>
    <div id="Nav">
      <router-link :to="{ name: 'Home' }" tag="h1">Battleship</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Toaster from '@/components/Toaster';

@Component({
  components: {
    Toaster
  }
})
export default class App extends Vue {
  name = 'App';

  get toasters() {
    return this.$store.state.ToasterStore.toasters;
  }
}
</script>
<style lang="scss">
html {
  background-color: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  &,
  a,
  button,
  input[type='submit'] {
    color: aliceblue;
  }

  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0;
  }
}

#Nav {
  padding: 30px;

  h1 {
    cursor: pointer;
  }
}

input[type='submit'],
button {
  padding: 6px;
  border-radius: 5px;
  background-color: transparent;
}

.card {
  width: 100%;
  max-width: 400px;
  border: 1px solid #000;
  margin: 0 auto;

  & > div {
    padding: 1rem;
  }

  .card-footer {
    border-top: 1px solid #000;
  }
}

.auth-form {
  width: fit-content;
  margin: 0 auto;

  * {
    text-align: left;
  }

  .auth-error {
    color: #ff0000;
  }
}
</style>
