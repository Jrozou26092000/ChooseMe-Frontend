<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
 /*  export default {
    beforeCreate(){
      if(sessionStorage.getItem("user_name") === null){
        sessionStorage.setItem("user_name", "Usuario");
        sessionStorage.setItem("products", []);
        sessionStorage.setItem("logged", false);
        sessionStorage.setItem("tab", "rulet");
        sessionStorage.setItem("product", "");
      }
    }
  } */
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
