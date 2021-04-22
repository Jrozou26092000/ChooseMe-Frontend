<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
            <b-navbar-brand href="#" @click.prevent="gotoHome">ChooseMe</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>    
                <b-navbar-nav class="ml-auto">
                    <b-nav-form class = "px-3">
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="product"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" @click.prevent="search">Search</b-button>
                    </b-nav-form>
                    <b-avatar></b-avatar>
                    <b-nav-item-dropdown right class = "px-3">
                        <template #button-content>
                            {{$store.state.user}}
                        </template>
                        <b-dropdown-item @click= "gotoLogin" v-if="!$store.state.logged">Login</b-dropdown-item>
                        <b-dropdown-item @click= "gotoSignin" v-if="!$store.state.logged">Sign in</b-dropdown-item>
                        <b-dropdown-item v-if="$store.state.logged" @click="gotoProfile">Perfil</b-dropdown-item>
                        <b-dropdown-item v-if="$store.state.logged" @click="Logout">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>   
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
    </div>
</template>
    
<script>
export default{
    data(){
        return {
            product: ''
        }
    },
    methods: {
        Logout() {
            this.$store.state.logged = false;
            this.$store.state.user = "Usuario";
            this.$store.state.tab = 'rulet';
            localStorage.clear();
        },
        gotoProfile(){
            this.$store.state.tab = 'profile';
        },
        search(){
            if (this.product != ''){
                this.$store.state.products = ['Banano', 'Celular', 'Laptop', 'Mouse', 'Barca', 'Liverpool',this.product];
                this.$store.state.tab = 'product';
                this.product = ''
            }
        },
        gotoHome(){
            this.$store.state.tab = 'rulet';
            this.product = ''
        },
        gotoLogin(){
           this.$store.state.tab = 'login';
        },
        gotoSignin(){
            this.$store.state.tab = 'signin';
        }
    },
}
</script>