<template>
  <div>
    <v-toolbar
      dark
      src="@/assets/HeaderBackground.jpg"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      
      <router-link to="/">
        <v-img 
          src="@/assets/Logo_chooseme2.png" 
          class="ml-5"
          max-height="150"
          max-width="150"
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

     <v-btn icon @click.prevent="search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      src = "@/assets/HeaderBackground.jpg"
      dark
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item class="mt-5">
        <v-list-item-avatar color="grey darken-4">
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
          @click="gotoLogin"
        >
          <v-list-item-icon>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Iniciar sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          v-if="!$store.state.logged"
          @click="gotoSignin"
        >
          <v-list-item-icon>
            <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Resgistrarse</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          v-if="$store.state.logged"
          @click="gotoProfile"
        >
          <v-list-item-icon>
            <v-icon>mdi-wrench</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Configurar cuenta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          @click="gotoReviewers"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Críticos</v-list-item-title>
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
    async gotoReviewers(){
      try {
          const response = await axios.get("http://localhost:8080/users/top5",{});
          this.$store.commit("resetReviewersList");
          this.$store.commit("addReviewersList", response.data);
          this.$store.commit("setTop5", false);
        } catch (error) {
          console.log(error);
        }
      this.$router.push("/reviewers").catch(() => {});
    }
  },
};
</script>
