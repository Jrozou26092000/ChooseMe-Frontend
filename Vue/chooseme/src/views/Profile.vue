<template>
  <div class="profile">
    <top-header ref="head" @header_message="option = $event"></top-header>

    <v-card class="m-5">
      <v-toolbar
        color="#102f85"
        dark
        flat
      >
        <v-avatar class="mt-5 mr-4" size="62">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
          >
        </v-avatar>

        <v-toolbar-title class="mt-5">{{this.nombre_usuario}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-title class="mt-5">Puntuación: {{this.puntos}}</v-toolbar-title>

        <template v-slot:extension>
          <v-tabs
            v-model="model"
            centered
            slider-color="white"
          >
            <v-tab
              v-for="(tab, i) in tabs"
              :key="i"
              :href="`#tab-${i}`"
            >
              {{ tab }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="model">

        <!-- Tab de mis reviews cuenta: (quitar variable text en data() más abajo) -->
        <v-tab-item
          value="tab-0"
        >
          <v-card
              class="mx-auto my-12"
              color="#102f85"
              dark
              max-width="80%"
              v-for="(review, index) in this.$store.state.reviews_reviewer" 
              :key="index"
          >
          <!-- cambiar el v-for para los reviews del usuario en sesión -->
              <v-card-title>
              <v-icon
                  large
                  left
              >
                  mdi-check-circle
              </v-icon>
              <span class="title font-weight-light">ChooseMe</span>
              </v-card-title>

              <v-card-text>
              <v-row class="mx-3 my-1">
                  <div class="font-weight-bold" style="text-align: justify;font-size: 120%;">"{{review.comment}}"</div>
              </v-row>
              <v-row class="ml-3 mt-5">
                  <div>Calificación: ({{review.score}})
                  <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" medium>mdi-information</v-icon>
                      </template>
                      <span>Las calificaciones de las críticas estan en una escala de 1-5.</span>
                  </v-tooltip>
                  </div>
                  </v-row>
                  <v-row class="ml-3">
                  <div>Creado: {{review.created_at.substring(0, 10)}}</div>
                  </v-row>
              </v-card-text>

              <v-card-actions>
              <v-list-item class="grow">
                  <v-list-item-avatar rounded=0>
                  <v-img
                      elevation = 6
                      alt=""
                      src="@/assets/paquete.png"
                  ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                  <v-list-item-title>{{review.product_name}}</v-list-item-title>
                  </v-list-item-content>

                  <v-row
                  align="center"
                  justify="end"
                  >
                  <v-btn icon>
                      <v-icon class="mr-2">
                      mdi-thumb-up
                      </v-icon>
                  </v-btn>
                  <span class="subheading mr-2">256</span>
                  <span class="mr-1">·</span>
                  <v-btn icon>
                      <v-icon class="mr-2">
                      mdi-thumb-down
                      </v-icon>
                  </v-btn>
                  <span class="subheading">45</span>
                  </v-row>
              </v-list-item>
              </v-card-actions>

              <v-card-actions>
                <v-btn
                  text
                  color="blue lighten-3"
                  @click="showReview = !showReview, comment='', rating=4.5"
                >
                  {{ showReview ? "Cancelar" : "Actualizar información"}}
                </v-btn>

                <v-btn
                  text
                  @click="showReview = !showReview"
                >
                  Eliminar Review
                </v-btn>
              </v-card-actions>
          
              <v-expand-transition>
                <v-card v-if="showReview">
                    <v-card-title>
                      <span class="text-h5">Crear una crítica</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                           <v-col
                            cols="12"
                          >
                            <v-textarea
                              outlined
                              name="comentar"
                              label="Comentario"
                              counter = 400
                              v-model="comment"
                              :rules="[v => (v || '' ).length <= 400 || 'El comentario debe ser de 400 comentario o menos.']"
                            ></v-textarea>
                          </v-col>
                          <v-col cols=12>
                            <v-rating
                              v-model="rating"
                              color="yellow darken-3"
                              background-color="grey darken-1"
                              empty-icon="$ratingFull"
                              half-increments
                              hover
                              large
                            ></v-rating>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*Por favor rellena todos los campos</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue lighten-4"
                        text
                        @click="save"
                      >
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
              </v-expand-transition>

          </v-card>
        </v-tab-item>

        <!-- Tab de actualizar cuenta:  -->
        <v-tab-item
          value="tab-1"
        >
          <b-container class="bv-example-row m-5">
            <b-row class="pb-3">
              <b-col>
                <label for="name">Nombre:</label>
                <b-form-input v-model="nombre" id="name"></b-form-input>
              </b-col>
              <b-col>
                <label for="last_name">Apellido:</label>
                <b-form-input v-model="apellido" id="last_name"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="pb-3">
              <b-col>
                <label for="user_name">Nombre de usuario:</label>
                <b-form-input
                  v-model="nombre_usuario"
                  id="user_name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="pb-3">
              <b-col>
                <label for="new_password">Contraseña nueva:</label>
                <b-form-input
                  v-model="nueva_pass"
                  type="password"
                  id="new_password"
                ></b-form-input>
              </b-col>
              <b-col>
                <label for="new_password_conf"
                  >Confirmar contraseña nueva:</label
                >
                <b-form-input
                  v-model="nueva_pass_conf"
                  type="password"
                  id="new_password_conf"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="pt-4">
              <b-col>
                <b-form-input
                  v-model="pass"
                  type="password"
                  placeholder="Digita tu contraseña actual"
                ></b-form-input>
              </b-col>
              <b-col>
                <b-button @click="save">Guardar cambios</b-button>
              </b-col>
            </b-row>
          </b-container>
          <b-alert
            variant="danger"
            dismissible
            fade
            :show="error"
            @dismissed="error = false"
            class="m-5"
          >
            {{ mensaje }}
          </b-alert>
          <b-alert
            variant="success"
            dismissible
            fade
            :show="success"
            @dismissed="success = false"
            class="m-5"
            >{{ mensaje }}</b-alert
          >
        </v-tab-item>

        <!-- Tab de desactivar cuenta:  -->
        <v-tab-item
          value="tab-2"
        >
          <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="m-5">
            <b-form-group
              id="input-group-1"
              label="Contraseña:"
              label-for="input-1"
              description="Recordatorio: Choose Me jamás te pedirá tus credenciales por fuera de la página."
            >
              <b-form-input
                id="input-1"
                v-model="form.passwordDesact"
                type="password"
                placeholder="Introduce tu contraseña"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Por favor verifica tu contraseña:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.passwordDesactAgain"
                type="password"
                placeholder="Introduce nuevamente tu contraseña"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="¿Por qué quieres desactivar tu cuenta?:"
              label-for="input-3"
            >
              <b-form-select
                id="input-3"
                v-model="form.OptionsDesact"
                :options="Optionsdesacts"
                required
              ></b-form-select>
            </b-form-group>

            <br />

            <b-form-checkbox
              id="checkbox-1"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
            >
              Confirmación de desactivación de cuenta, te extrañaremos :(
            </b-form-checkbox>

            <br /><br />

            <b-button class="mr-3" type="submit" variant="primary"
              >Aceptar</b-button
            >
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
          <b-alert
            variant="danger"
            dismissible
            fade
            :show="error"
            @dismissed="error = false"
            class="m-5"
          >
            {{ mensaje }}
          </b-alert>
          <b-alert
            variant="success"
            dismissible
            fade
            :show="success"
            @dismissed="success = false"
            class="m-5"
            >{{ mensaje }}</b-alert
          >
        </v-tab-item>

        <!-- Tab de eliminar cuenta:  -->
        <v-tab-item
          value="tab-3"
        >
           <b-form class="m-5">
            <b-form-group
              id="delete-1"
              label="Contraseña:"
              label-for="delete-1"
              description="Recordatorio: Una vez elimines tu cuenta no será posible recuperarla, tus datos se
              borrarán de la aplicación y tus reviews y comentarios quedarán anónimos."
            >
              <b-form-input
                id="delete-1"
                v-model="delete_pass"
                type="password"
                placeholder="Introduce tu contraseña"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="delete-2"
              label="Por favor verifica tu contraseña:"
              label-for="delete-2"
            >
              <b-form-input
                id="delete-2"
                v-model="delete_pass_conf"
                type="password"
                placeholder="Introduce nuevamente tu contraseña"
                required
              ></b-form-input>
            </b-form-group>
            <b-button @click="deleteAccount" variant="danger"
              >Eliminar</b-button
            >
          </b-form>
          <b-alert
            variant="danger"
            dismissible
            fade
            :show="error"
            @dismissed="error = false"
            class="m-5"
          >
            {{ mensaje }}
          </b-alert>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <!-- <b-card no-body class="m-5" align="left">
      <b-tabs
        pills
        card
        vertical
        nav-wrapper-class="w-25"
        style="height: 500px"
      >
        <b-tab title="Actualizar cuenta" active>
          <b-container class="bv-example-row">
            <b-row class="pb-3">
              <b-col>
                <label for="name">Nombre:</label>
                <b-form-input v-model="nombre" id="name"></b-form-input>
              </b-col>
              <b-col>
                <label for="last_name">Apellido:</label>
                <b-form-input v-model="apellido" id="last_name"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="pb-3">
              <b-col>
                <label for="user_name">Nombre de usuario:</label>
                <b-form-input
                  v-model="nombre_usuario"
                  id="user_name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="pb-3">
              <b-col>
                <label for="new_password">Contraseña nueva:</label>
                <b-form-input
                  v-model="nueva_pass"
                  type="password"
                  id="new_password"
                ></b-form-input>
              </b-col>
              <b-col>
                <label for="new_password_conf"
                  >Confirmar contraseña nueva:</label
                >
                <b-form-input
                  v-model="nueva_pass_conf"
                  type="password"
                  id="new_password_conf"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="pt-4">
              <b-col>
                <b-form-input
                  v-model="pass"
                  type="password"
                  placeholder="Digita tu contraseña actual"
                ></b-form-input>
              </b-col>
              <b-col>
                <b-button @click="save">Guardar cambios</b-button>
              </b-col>
            </b-row>
          </b-container>
          <b-alert
            variant="danger"
            dismissible
            fade
            :show="error"
            @dismissed="error = false"
            class="mt-3"
          >
            {{ mensaje }}
          </b-alert>
          <b-alert
            variant="success"
            dismissible
            fade
            :show="success"
            @dismissed="success = false"
            class="mt-3"
            >{{ mensaje }}</b-alert
          >
        </b-tab>
        <b-tab title="Desactivar mi cuenta">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Contraseña:"
              label-for="input-1"
              description="Recordatorio: Choose Me jamás te pedirá tus credenciales por fuera de la página."
            >
              <b-form-input
                id="input-1"
                v-model="form.passwordDesact"
                type="password"
                placeholder="Introduce tu contraseña"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Por favor verifica tu contraseña:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.passwordDesactAgain"
                type="password"
                placeholder="Introduce nuevamente tu contraseña"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="¿Por qué quieres desactivar tu cuenta?:"
              label-for="input-3"
            >
              <b-form-select
                id="input-3"
                v-model="form.OptionsDesact"
                :options="Optionsdesacts"
                required
              ></b-form-select>
            </b-form-group>

            <br />

            <b-form-checkbox
              id="checkbox-1"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
            >
              Confirmación de desactivación de cuenta, te extrañaremos :(
            </b-form-checkbox>

            <br /><br />

            <b-button class="mr-3" type="submit" variant="primary"
              >Aceptar</b-button
            >
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
          <b-alert
            variant="danger"
            dismissible
            fade
            :show="error"
            @dismissed="error = false"
            class="mt-3"
          >
            {{ mensaje }}
          </b-alert>
          <b-alert
            variant="success"
            dismissible
            fade
            :show="success"
            @dismissed="success = false"
            class="mt-3"
            >{{ mensaje }}</b-alert
          >
        </b-tab>
        <b-tab title="Eliminar mi cuenta">
          <b-form>
            <b-form-group
              id="delete-1"
              label="Contraseña:"
              label-for="delete-1"
              description="Recordatorio: Una vez elimines tu cuenta no será posible recuperarla, tus datos se
              borrarán de la aplicación y tus reviews y comentarios quedarán anónimos."
            >
              <b-form-input
                id="delete-1"
                v-model="delete_pass"
                type="password"
                placeholder="Introduce tu contraseña"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="delete-2"
              label="Por favor verifica tu contraseña:"
              label-for="delete-2"
            >
              <b-form-input
                id="delete-2"
                v-model="delete_pass_conf"
                type="password"
                placeholder="Introduce nuevamente tu contraseña"
                required
              ></b-form-input>
            </b-form-group>
            <b-button @click="deleteAccount" variant="danger"
              >Eliminar</b-button
            >
          </b-form>
          <b-alert
            variant="danger"
            dismissible
            fade
            :show="error"
            @dismissed="error = false"
            class="mt-3"
          >
            {{ mensaje }}
          </b-alert>
        </b-tab>
      </b-tabs>
    </b-card> -->
  </div>
</template>

<script>
import axios from "axios";
import TopHeader from "../components/TopHeader";
export default {
  data() {
    return {
      nombre: "",
      apellido: "",
      nombre_usuario: "",
      telefono: "",
      nueva_pass: "",
      nueva_pass_conf: "",
      pass: "",
      error: false,
      success: false,
      mensaje: "",
      user: "",
      puntos: 0,
      //Datos de desactivación de cuenta
      form: {
        passwordDesact: "",
        passwordDesactAgain: "",
        OptionsDesact: null,
      },
      Optionsdesacts: [
        { text: "Cuéntanos, ¿por qué te vas?", value: null },
        "Encontré una página mejor",
        "No deseo seguir calificando productos",
        "La comunidad no es muy colaborativa",
        "Solo deseo desactivar mi cuenta",
      ],
      show: true,
      // Datos eliminación de cuenta:
      delete_pass: "",
      delete_pass_conf: "",
      // PRUEBA:
      model: 'tab-0',
      tabs: ['Mis críticas', 'Actualizar cuenta', 'Desactivar cuenta', 'Eliminar cuenta'],
      showReview: false,
      comment: "",
      rating: 4.5,
    };
  },
  async mounted() {
    // Se hace la solicitud al back para que nos den los datos.
    try {
      const response = await axios.post(
        "http://localhost:8080/users/perfil",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      this.user = response.data;
      //this.$store.state.tab = 'rulet';
    } catch (error) {
      console.log(error);
    }
    this.nombre = this.user.name;
    this.apellido = this.user.lastname;
    this.nombre_usuario = this.user.user_name;
    this.puntos = this.user.points;
    // this.telefono = this.user.phone;
    // this.correo = this.user.email;
  },

  methods: {
    async save() {
      if (this.pass == "") {
        this.mensaje = "Por favor ingresa tu contraseña actual.";
        this.error = true;
      } else if (this.nueva_pass != this.nueva_pass_conf) {
        this.mensaje = "La nueva contraseña no coincide.";
        this.error = true;
      } else {
        try {
          const response = await axios.post(
            "http://localhost:8080/users/update",
            {
              user_id: this.user.user_id,
              user_name: this.nombre_usuario,
              password: this.pass,
              passtemp: this.nueva_pass,
              active: this.user.active,
              name: this.nombre,
              lastname: this.apellido,
              points: this.user.points,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          if (response.data) {
            this.$store.commit("setUsername", this.nombre_usuario);
            this.pass = "";
            this.nueva_pass = "";
            this.nueva_pass_conf = "";
            localStorage.clear();
            localStorage.setItem("token", response.data);
            this.mensaje = "Tus cambios se han realizado con éxito.";
            this.success = true;
          } else {
            this.mensaje = "Datos inválidos, inténtalo de nuevo.";
            this.error = true;
          }
        } catch (error) {
          this.mensaje = "Datos inválidos, inténtalo de nuevo.";
          this.error = true;
        }
      }
    },

    //Métodos para desactivación de cuenta
    async onSubmit(event) {
      event.preventDefault();
      if (this.form.passwordDesactAgain === this.form.passwordDesact) {
        try {
          const response = await axios.post(
            "http://localhost:8080/users/desactivate",
            {
              password: this.form.passwordDesact,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          if (response.data) {
            this.mensaje = "Te extrañaremos, vuelve pronto :(";
            this.success = true;
            this.$refs.head.Logout();
          } else {
            this.mensaje = "Ups, algo salió mal inténtalo de nuevo.";
            this.error = true;
          }
        } catch (error) {
          this.mensaje = "Ups, algo salió mal inténtalo de nuevo.";
          this.error = true;
          console.log(error);
        }
      } else {
        this.mensaje = "Las contraseñas no coinciden.";
        this.error = true;
      }
      this.form.passwordDesactAgain = "";
      this.form.passwordDesact = "";
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.passwordDesact = "";
      this.form.passwordDesactAgain = "";
      this.form.OptionsDesact = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    async deleteAccount() {
      if (this.delete_pass == "" || this.delete_pass_conf == "") {
        this.mensaje = "Por favor ingresa los datos requeridos.";
        this.error = true;
      } else if (this.delete_pass != this.delete_pass_conf) {
        this.mensaje = "Las contraseñas no coinciden.";
        this.error = true;
      } else {
        //Realizar la solicitud
        try {
          const response = await axios.post(
            "http://localhost:8080/users/delete",
            {
              password: this.delete_pass,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          if (response.data) {
            this.$store.commit("isLogged", false);
            this.$store.commit("setUsername", "Usuario");
            localStorage.clear();
            this.$router.push("/").catch(() => {});
            window.scrollTo(0, 0);
          } else {
            this.mensaje = "Ups, algo salió mal inténtalo de nuevo.";
            this.error = true;
          }
        } catch (error) {
          this.mensaje = "Ups, algo salió mal inténtalo de nuevo.";
          this.error = true;
          console.log(error);
        }
      }
    },
  },
  components: {
    "top-header": TopHeader,
  },
};
</script>
