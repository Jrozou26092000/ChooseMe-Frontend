<template>
  <div>
    <v-toolbar
      dark
      prominent
      src="@/assets/Toolbar_background.jpg"
    >
      <v-app-bar-nav-icon class="mt-5" @click="drawer = !drawer"></v-app-bar-nav-icon>
      
      <router-link to="/">
        <v-img 
          src="@/assets/Logo_chooseme2.png" 
          class="ml-5 mt-5"
          max-height="250"
          max-width="250"
          @click.prevent="gotoHome"
        ></v-img>
      </router-link>
      <!-- <img 
        class="ml-5 mt-5" 
        src="@/assets/Logo_chooseme2.png" 
        height="70"
        href="#" 
        @click.prevent="gotoHome"
      /> -->

      <v-spacer></v-spacer>

      <v-text-field
        label="Buscar productos"
        filled
        rounded
        dense
        class="mt-5"
        v-model="product"
        @keydown.enter="search"
      ></v-text-field>

     <v-btn icon  class="mt-5" @click.prevent="search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      src="@/assets/Toolbar_background.jpg"
      dark
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item class="mt-5">
        <v-list-item-avatar>
          <v-icon v-if="!$store.state.logged" dark>mdi-account-circle</v-icon>
          <span v-if="$store.state.logged" class="white--text headline">{{($store.state.user).charAt(0).toUpperCase()}}</span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{$store.state.user}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list>
        <v-list-item
          link
          v-if="!$store.state.logged"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="gotoLogin">Iniciar sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          v-if="!$store.state.logged"
        >
          <v-list-item-icon>
            <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="gotoSignin">Resgistrarse</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          v-if="$store.state.logged"
        >
          <v-list-item-icon>
            <v-icon>mdi-wrench</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="gotoProfile">Configurar cuenta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

      <template>
        <div class="pa-2">
          <v-btn block @click="Logout" v-if="$store.state.logged">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#" @click.prevent="gotoHome"
        >ChooseMe</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="px-3">
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Buscar productos"
              v-model="product"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" @click.prevent="search"
              >Buscar</b-button
            >
          </b-nav-form>
          <b-avatar></b-avatar>
          <b-nav-item-dropdown right class="px-3">
            <template #button-content>
              {{ $store.state.user }}
            </template>
            <b-dropdown-item @click="gotoLogin" v-if="!$store.state.logged"
              >Iniciar sesión</b-dropdown-item
            >
            <b-dropdown-item @click="gotoSignin" v-if="!$store.state.logged"
              >Resgistrarse</b-dropdown-item
            >
            <b-dropdown-item v-if="$store.state.logged" @click="gotoProfile"
              >Configurar cuenta</b-dropdown-item
            >
            <b-dropdown-item v-if="$store.state.logged" @click="Logout"
              >Salir</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      product: "",
      drawer: null
    };
  },
  methods: {
    async Logout() {
      try {
        await axios.post(
          "http://localhost:8080/users/out",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
      this.$store.commit("isLogged", false);
      this.$store.commit("setUsername", "Usuario");
      localStorage.clear();
      this.$router.push("/").catch(() => {});
      window.scrollTo(0, 0);
    },
    gotoProfile() {
      this.$router.push("/profile").catch(() => {});
    },
    async search() {
      if (this.product != "") {
        try {
          const response = await axios.post(
            "http://localhost:8080/products/search",
            {
              name: this.product,
            }
          );
          this.$store.commit("setProductlist", response.data);
          //console.log( this.$store.products);
        } catch (error) {
          console.log(error);
        }
        this.$router.push("/productview").catch(() => {});
        window.scrollTo(0, 0);
        this.$store.commit("setProduct_search", this.product);
        this.product = "";
      }
    },
    gotoHome() {
      this.product = "";
      this.$router.push("/").catch(() => {});
      window.scrollTo(0, 0);
    },
    gotoLogin() {
      this.$router.push("/login").catch(() => {});
    },
    gotoSignin() {
      this.$router.push("/signin").catch(() => {});
    },
  },
};
</script>
