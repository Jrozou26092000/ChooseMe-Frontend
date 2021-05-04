<template>
  <div class="home" :key="$store.state.logged">
    <top-header @header_message = "option = $event"></top-header>
    <rulet />
    <!-- <component v-bind:is="$store.state.tab" ></component> -->
    <foot />
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader';
  import Rulet from '../components/Rulet';
  import Footer from '../components/Footer';
  export default {
    components: {
      "top-header": TopHeader, 
      "rulet": Rulet, 
      "foot": Footer
    }
  }
</script>
