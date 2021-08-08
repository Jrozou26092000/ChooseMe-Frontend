<template>
  <div class="login">
    <top-header @header_message="option = $event"></top-header>
         <v-container fluid class="mt-5">
           <v-row justify="center">
              <v-card class="elevation-24" width="35%">
                  <v-toolbar dark color="#102f85">
                    <v-toolbar-title>Iniciar sesión</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form v-if="show">
                        <v-text-field
                          prepend-icon="mdi-account"
                          name="login"
                          label="Correo electrónico"
                          type="text"
                          v-model="form.email"
                          required
                          :rules="[() => !!form.email || 'Este campo es requerido']"
                        ></v-text-field>
                        <v-text-field
                          id="password"
                          prepend-icon="mdi-lock"
                          name="password"
                          label="Constraseña"
                          type="password"
                          v-model="form.password"
                          required
                          :rules="[() => !!form.password || 'Este campo es requerido']"
                          @keydown.enter="onLogin"
                        ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                  <v-spacer /> 
                  <v-btn @click="onLogin" dark color="#102f85" class="mr-4 mb-4">Login</v-btn>
                  </v-card-actions>
              </v-card>
           </v-row>
         </v-container>

      <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
      >
        {{ message }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="redirectToSignIn"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import TopHeader from "../components/TopHeader";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
      multiLine: true,
      snackbar: false,
      message: `Emalil o contraseña incorrectos.`
    };
  },
  methods: {
    async onLogin(event) {
      event.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:8080/users/loggin",
          {
            email: this.form.email,
            password: this.form.password,
          }
        );
        if (response.data) {
          var jwt = JSON.parse(atob(response.data.jwt.split(".")[1]));
          localStorage.setItem("token", response.data.jwt);
          localStorage.setItem("user_name", jwt.sub);
          this.$store.commit("isLogged", true);
          this.$store.commit("setUsername", jwt.sub);
          window.scrollTo(0, 0);
          this.$router.push("/");
        } else {
          this.snackbar = true;
        }
      } catch (error) {
        this.snackbar = true;
        console.log(error);
      }
      this.form.email = "";
      this.form.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    } ,
    redirectToSignIn(){
      this.snackbar = false
      this.$router.push("/login").catch(() => {});
      window.scrollTo(0, 0);
    }, 
  },
  components: {
    "top-header": TopHeader,
  }
};
</script>