<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#" v-if="!logged" to="/">ChooseMe</b-navbar-brand>
            <b-navbar-brand href="#" v-if="logged" to="/home_logged" @click="offProfile">ChooseMe</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>    
                <b-navbar-nav class="ml-auto">
                    <b-nav-form class = "px-3">
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>
                    <b-avatar></b-avatar>
                    <b-nav-item-dropdown right class = "px-3">
                        <template #button-content>
                            {{usuario}}
                        </template>
                        <b-dropdown-item to="/login" v-if="!logged">Login</b-dropdown-item>
                        <b-dropdown-item to="/signin" v-if="!logged">Sign in</b-dropdown-item>
                        <b-dropdown-item v-if="logged" @click="gotoProfile">Perfil</b-dropdown-item>
                        <b-dropdown-item v-if="logged" @click="Logout">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>   
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
    </div>
</template>
    
<script>
export default{
    props: ['usuario','logged'],
    methods: {
        Logout() {
            this.logged = false;
            localStorage.clear();
            this.$router.push('/');
        },
        gotoProfile(){
            this.$emit('profileSon', true);
        },
        offProfile(){
            this.$emit('profileSon', false);
        }
    },
}
</script>