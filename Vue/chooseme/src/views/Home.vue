<template>
  <div class="home" :key="$store.state.logged">
    <top-header @header_message = "option = $event" ></top-header>
    <component v-bind:is="$store.state.tab" ></component>
    <foot />
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader';
  import Rulet from '../components/Rulet';
  import Footer from '../components/Footer';
  //import Productlist from '../components/Productlist';
  //import Login from '../components/Login';
  //import Signin from '../components/Signin';
  //import Profile from '../components/Profile';

  export default {
    components: {
      "top-header": TopHeader, 
      "rulet": Rulet, 
      "foot": Footer
      //"product": Productlist, 
      //"login": Login,
      //"signin": Signin,
      //"profile": Profile
    }
  }
</script>