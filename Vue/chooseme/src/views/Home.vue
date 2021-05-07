<template>
  <div class="home" :key="$store.state.logged">
    <top-header @header_message = "option = $event"></top-header>
    <!-- <v-container class="my-5">
      <v-row>
        Hola
      </v-row>
    </v-container> -->
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
