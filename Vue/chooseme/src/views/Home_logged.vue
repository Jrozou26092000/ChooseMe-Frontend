<template>
  <div class="home_logged">
    <top-header :usuario="user_name" logged="logged" @profileSon="active_profile = $event"></top-header>
    <profile v-if="active_profile"/>
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader.vue';
  import Profile from '../components/Profile.vue';

  export default {
    data(){
      return{
        user_name: localStorage.getItem('user_name'),
        logged: true,
        active_profile: false
      }
    },
    components: {"top-header": TopHeader, "profile": Profile},
    mounted(){
      if(!localStorage.getItem('token')){
        this.$router.push('/login');
      }
    }
  }
</script>