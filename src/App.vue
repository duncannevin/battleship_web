<template>
  <div id="app">
    <div id="Nav">
      <router-link :to="{ name: 'Home' }" tag="h1">Battleship</router-link>
    </div>
    <router-view />
  </div>
</template>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#Nav {
  padding: 30px;

  h1 {
    cursor: pointer;
  }
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
