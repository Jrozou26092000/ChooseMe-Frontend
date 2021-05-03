<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
            <b-navbar-brand href="#" @click.prevent="gotoHome">ChooseMe</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>    
                <b-navbar-nav class="ml-auto">
                    <b-nav-form class = "px-3">
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar productos" v-model="product"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" @click.prevent="search">Buscar</b-button>
                    </b-nav-form>
                    <b-avatar></b-avatar>
                    <b-nav-item-dropdown right class = "px-3">
                        <template #button-content>
                            {{$store.state.user}}
                        </template>
                        <b-dropdown-item @click= "gotoLogin" v-if="!$store.state.logged">Iniciar sesión</b-dropdown-item>
                        <b-dropdown-item @click= "gotoSignin" v-if="!$store.state.logged">Resgistrarse</b-dropdown-item>
                        <b-dropdown-item v-if="$store.state.logged" @click="gotoProfile">Configurar cuenta</b-dropdown-item>
                        <b-dropdown-item v-if="$store.state.logged" @click="Logout">Salir</b-dropdown-item>
                    </b-nav-item-dropdown>   
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
    </div>
</template>
    
<script>
import axios from 'axios';
export default{
    data(){
        return {
            product: ''
        }
    },
    methods: {
        async Logout() {
             try {
                await axios.post('http://localhost:8080/users/out',{},
                {headers:{'Authorization': 'Bearer '+ localStorage.getItem('token')}});
            } catch (error) {
                console.log(error);
            }
            this.$store.commit("isLogged", false);
            this.$store.commit("setUsername", "Usuario");
            localStorage.clear();
            this.$router.push('/').catch(()=>{});
            window.scrollTo(0, 0);
        },
        gotoProfile(){
            this.$router.push('/profile').catch(()=>{});
        },
        async search(){
            if (this.product != ''){
                try {
                    const response = await axios.post('http://localhost:8080/products/search',{
                        "name": this.product
                    });
                    this.$store.commit("setProductlist", response.data);
                    //console.log( this.$store.products);
                } catch (error) {
                    console.log(error);
                }
                this.$router.push('/productview').catch(()=>{});
                window.scrollTo(0, 0);
                this.$store.commit("setProduct_search", this.product);
                this.product = '';
            }
        },
        gotoHome(){
            this.product = '';
            this.$router.push('/').catch(()=>{});
            window.scrollTo(0, 0);
        },
        gotoLogin(){
           this.$router.push('/login').catch(()=>{});
        },
        gotoSignin(){
            this.$router.push('/signin').catch(()=>{});
        }
    },
}
</script>