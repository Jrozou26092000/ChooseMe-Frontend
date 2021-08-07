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
              v-for="(review, index) in this.$store.state.reviews_user" 
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
                  <span class="subheading mr-2">{{review.ups}}</span>
                  <span class="mr-1">·</span>
                  <v-btn icon>
                      <v-icon class="mr-2">
                      mdi-thumb-down
                      </v-icon>
                  </v-btn>
                  <span class="subheading">{{review.downs}}</span>
                  </v-row>
              </v-list-item>
              </v-card-actions>

              <v-card-actions>
                <v-btn
                  class="ma-2"
                  color="blue"
                  @click="indicadorActualizacion(index)"
                >
                  {{ showReview === index ? "Cancelar" : "Actualizar información"}}
                </v-btn> 

                <v-btn
                  color="red"
                  dark
                  @click="eliminarReview(review)"
                >
                  Eliminar crítica
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                  color="indigo darken-2"
                  dark
                  @click="ConsultaActualizaciones(review)"
                >
                  Consultar actualizaciones
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <v-card v-if = "showReview === index">
                    <v-card-title>
                      <span class="text-h5">Actualiza tu crítica</span>
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
                        </v-row>
                      </v-container>
                      <small>*Por favor rellena todos los campos</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue lighten-4"
                        text
                        @click="actualizarReview(review,index)"
                      >
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
              </v-expand-transition> 

          </v-card>

          <infinite-loading @infinite="getReviewsUser" class="mt-5">
                        <div slot="waveDots">
                            <v-alert
                            elevation="4"
                            color="#283593"
                            dense
                            type="info"
                            >
                                <strong> Cargando... </strong>
                            </v-alert>
                        </div>
                        <div slot="no-more">
                            <v-alert
                            elevation="4"
                            color="#283593"
                            dense
                            type="info"
                            >
                                <strong> No hay más resultados </strong>
                            </v-alert>
                        </div>
                        <div slot="no-results">
                            <v-alert
                            elevation="4"
                            color="#283593"
                            dense
                            type="info"
                            >
                                <strong> No hay más resultados </strong>
                            </v-alert>
                        </div>
                    </infinite-loading>

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

    <v-dialog
      v-model="dialog"
      persistent
      max-width="25%"
    >
      <v-card>
        <v-card-title class="text-h5">
          ¿Deseas eliminar la crítica realizada?
        </v-card-title>
        <v-card-text>Una vez eliminada una crítica no podrá restaurarse, y toda la información contenida en ella será eliminada. Por favor confirma tu identidad para poder eliminar la crítica.</v-card-text>
        
        <v-card-actions>
        <label class="font-weight-medium" for="eliminar">Contraseña:</label>
        <b-form-input v-model="eliminacion" type="password" id="eliminar"></b-form-input>
        </v-card-actions>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="eliminarReviewDef"
          >
            Eliminar
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="OnCancel"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="botonActualizaciones"
      persistent
      max-width="80%"
    >

      <v-card>
        <v-list two-line>
          <template v-for="(review) in this.reviewActualizaciones">
            <v-divider
            :key="review.impression_id"
            >
            </v-divider>
            <v-list-item
              :key="review.impression_id"
            >
              <v-list-item-content>
                <v-list-item-title v-html="review.impression"></v-list-item-title>
                <v-list-item-subtitle>Creado el: {{review.created_at.substring(0, 10)}} </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>

      <v-btn
          color="error"
          @click="botonActualizaciones = false"
        >
        Cerrar
      </v-btn>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
      >
        {{ adErase }}

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
import InfiniteLoading from "vue-infinite-loading";

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
      id: 0,
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
      showReview: "",
      comment: "",
      dialog: false,
      eliminacion: "",
      reviewEliminacion: "",
      reviewActualizacionId: "",
      reviewActualizaciones: [],
      botonActualizaciones: false,
      adErase: "",
      snackbar: false,
      multiLine: true,
      color: "error",
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
    } catch (error) {
      console.log(error);
    }
    this.nombre = this.user.name;
    this.apellido = this.user.lastname;
    this.nombre_usuario = this.user.user_name;
    this.puntos = this.user.points;
    this.id = this.user.user_id;

    try {
        this.$store.commit("resetPage_reviews_user");
        this.$store.commit("resetReviews_user");

        const response = await axios.get(
          "http://localhost:8080/user/review/"+ this.id + "/0",
          {}
        );
        this.$store.commit("addReviews_user", response.data);

      } catch (error) {
        console.log(error);
      }

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
    async getReviewsUser($state) {
      this.$store.commit("incrementPage_reviews_user");
      try {
        const response = await axios.get(
          "http://localhost:8080/user/review/"+ this.id + "/" + this.$store.getters.getPage_reviews_user,
          {}
        );
        if (response.data.length == 0) { //No hay más resultados
          $state.complete();
        } else {
          this.$store.commit("addReviews_user", response.data);

          $state.loaded();
        }
      } catch (error) {
        console.log(error);
      }
    },

    indicadorActualizacion(index){
      if(this.showReview === index){
        this.showReview = "";
      }else{
        this.showReview = index;
      }
    },
    eliminarReview(review){
      this.dialog = true;
      this.reviewEliminacion = review.comment_id;
    },
    async eliminarReviewDef(){
      try {
        const response = await axios.post(
          "http://localhost:8080/products/delete/"+ this.reviewEliminacion,
          {
            "password":this.eliminacion
          },
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        );
        if(response.data === true){
          console.log("Eliminado correctamente");
          this.adErase = "Eliminado correctamente";
          this.snackbar = true;
          this.color = "success";
        }else{
          console.log("No eliminado");
          this.adErase = "No pudo ser eliminado";
          this.snackbar = true;
          this.color = "error";
        }
      } catch (error) {
        console.log(error);
        this.adErase = "No pudo ser eliminado";
        this.snackbar = true;
        this.color = "error";
      } 
      this.eliminacion = "";
      this.dialog = false;
    },
    OnCancel(){
      this.eliminacion = "";
      this.dialog = false;
    },
    async actualizarReview(review,index){
      this.reviewActualizacionId = review.comment_id;
      try {
        const response = await axios.post(
          "http://localhost:8080/review/update",
          {
            "impression":this.comment, "user_id":this.id, "comment_id":this.reviewActualizacionId
          },
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        );
        if(response.data === "ok"){
          console.log("Actualizado correctamente");
        }else{
          console.log("No actualizado");
        }
      } catch (error) {
        console.log(error);
      } 
      this.indicadorActualizacion(index);
    },
    ConsultaActualizaciones(review){
      this.reviewActualizaciones = review.impressions;
      this.botonActualizaciones = true;
    }
  },
  components: {
    "top-header": TopHeader,
    InfiniteLoading
  },
};
</script>
