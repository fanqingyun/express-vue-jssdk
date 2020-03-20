<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link>
      <router-link to="/child">About</router-link>
    </div>
    <router-view />
  </div>
</template>



<script>
// import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from './components/HelloWorld.vue';

// @Component({
//   components: {
//     // HelloWorld,
//   },
// })
export default {
  mounted() {
    this.$axios.post("/api/about", { url: window.location.href }, result => {
      this.$JsApi.config(
        result.data.appID,
        result.data.timestamp,
        result.data.noncestr,
        result.data.signature
      );
    });
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
