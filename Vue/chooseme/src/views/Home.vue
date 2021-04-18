<template>
  <div class="home">
    <top-header usuario="usuario" :logged="logged"></top-header>
    <h1>This is a home page</h1>
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader.vue';

  export default {
    data(){
      return {
        logged: false
      }
    },
    components: {"top-header": TopHeader} 
  }
</script>