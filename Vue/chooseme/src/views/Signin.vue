<template>
  <div class="signin">
    <top-header @header_message="option = $event"></top-header>
      <v-container fluid class="my-5">
           <v-row justify="center">
              <v-card class="elevation-24" width="35%">
                  <v-toolbar dark color="#102f85">
                    <v-toolbar-title>Crear una cuenta</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form v-if="show" v-model="isFormValid">
                        <v-text-field
                          prepend-icon="mdi-account"
                          name="user_name"
                          label="Nombre de Usuario"
                          type="text"
                          v-model="form.user"
                          required
                          :rules="[() => !!form.user || 'Este campo es requerido']"
                        ></v-text-field>
                        <v-text-field
                          prepend-icon="mdi-email"
                          name="email"
                          label="Correo electrónico"
                          type="text"
                          v-model="form.email"
                          required
                          :rules="[() => !!form.email || 'Este campo es requerido']"
                        ></v-text-field>
                        <v-text-field
                          prepend-icon="mdi-form-textbox"
                          name="name"
                          label="Nombre"
                          type="text"
                          v-model="form.name"
                          required
                          :rules="[() => !!form.name || 'Este campo es requerido']"
                        ></v-text-field>
                        <v-text-field
                          prepend-icon="mdi-form-textbox"
                          name="lastname"
                          label="Apellido"
                          type="text"
                          v-model="form.lastname"
                          required
                          :rules="[() => !!form.lastname || 'Este campo es requerido']"
                        ></v-text-field>
                        <v-text-field
                          prepend-icon="mdi-phone"
                          name="phone"
                          label="Telefono"
                          type="text"
                          v-model="form.phone"
                          required
                          :rules="[() => !!form.phone || 'Este campo es requerido']"
                        ></v-text-field>
                        <v-text-field
                          prepend-icon="mdi-lock"
                          name="password"
                          label="Contraseña"
                          type="password"
                          v-model="form.password"
                          required
                          :rules="[() => !!form.password || 'Este campo es requerido']"
                        ></v-text-field>
                        <v-text-field
                          prepend-icon="mdi-lock-alert"
                          name="passwordagain"
                          label="Confirmación contraseña"
                          type="password"
                          v-model="form.passwordagain"
                          required
                          :rules="[() => !!form.passwordagain || 'Este campo es requerido']"
                        ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                  <v-spacer /> 
                  <v-btn @click="onSignin" color="#102f85" :dark="isFormValid" class="mr-4 mb-4"  depressed :disabled="!isFormValid">Sign In</v-btn>
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
            :color="color"
            text
            v-bind="attrs"
            @click="snackbar = false"
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
        user: "",
        email: "",
        name: "",
        lastname: "",
        phone: "",
        password: "",
        passwordagain: "",
      },
      show: true,
      multiLine: true,
      snackbar: false,
      message: "",
      color: "",
      isFormValid: false
    };
  },
  methods: {
    async onSignin(event) {
      event.preventDefault();
      // API REST
      try {
        const response = await axios.post("http://localhost:8080/users/add", {
          user_name: this.form.user,
          email: this.form.email,
          password: this.form.password,
          passtemp: this.form.passwordagain,
          name: this.form.name,
          lastname: this.form.lastname,
          phone: this.form.phone,
        });
        if (response.data) {
          this.color = "green"
          this.snackbar = true;
          this.message = "Bienvenido a ChooseMe!"
        } else {
          this.color = "red"
          this.snackbar = true;
          this.message = "Datos inválidos, inténtalo de nuevo."
        }
      } catch (error) {
        this.color = "red"
        this.snackbar = true;
        this.message = "Datos inválidos, inténtalo de nuevo."
        console.log(error);
      }
      // Reset our form values
      this.form.user = "";
      this.form.email = "";
      this.form.name = "";
      this.form.lastname = "";
      this.form.phone = "";
      this.form.password = "";
      this.form.passwordagain = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  components: {
    "top-header": TopHeader,
  },
};
</script>
