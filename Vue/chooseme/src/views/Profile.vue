<template>
  <div class="profile" style="margin-top: 70px">
    <top-header ref="head" @header_message = "option = $event" ></top-header>
    <b-card no-body class="m-5" align="left">
      <b-tabs pills card vertical nav-wrapper-class="w-25" style="height: 500px;">
        <b-tab title="Cuenta" active>
          <b-container class="bv-example-row">
            <b-row class="pb-3">
              <b-col>
                <label for="name">Nombre:</label>
                <b-form-input v-model= "nombre" id="name"></b-form-input>
              </b-col>
              <b-col>
                <label for="last_name">Apellido:</label>
                <b-form-input v-model= "apellido" id="last_name"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="pb-3">
              <b-col>
                <label for="user_name">Nombre de usuario:</label>
                <b-form-input v-model= "nombre_usuario" id="user_name"></b-form-input>
              </b-col>
              <!-- <b-col>
                <label for="phone">Teléfono:</label>
                <b-form-input v-model= "telefono" id="phone"></b-form-input>
              </b-col> -->
            </b-row>
            <b-row class="pb-3">
              <b-col>
                <label for="new_password">Contraseña nueva:</label>
                <b-form-input v-model= "nueva_pass" type="password" id="new_password"></b-form-input>
              </b-col>
              <b-col>
                <label for="new_password_conf">Confirmar contraseña nueva:</label>
                <b-form-input v-model= "nueva_pass_conf" type="password" id="new_password_conf"></b-form-input>
              </b-col>
            </b-row>
           <!--  <b-row class="pb-3">
              <b-col>
                <label for="email">Email:</label>
                <b-form-input v-model= "correo" id="email"></b-form-input>
              </b-col>
            </b-row> -->
            <b-row class="pt-4">
              <b-col>
                <b-form-input v-model= "pass" type="password" placeholder="Digita tu contraseña actual"></b-form-input>
              </b-col>
              <b-col>
                <b-button @click= "save">Guardar cambios</b-button>
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
            {{mensaje}}
          </b-alert>
          <b-alert
              variant="success"
              dismissible
              fade
              :show="success"
              @dismissed="success = false"
              class="mt-3"
          >{{mensaje}}</b-alert>
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

            <b-form-group id="input-group-3" label="¿Por qué quieres desactivar tu cuenta?:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="form.OptionsDesact"
                :options="Optionsdesacts"
                required
              ></b-form-select>
            </b-form-group>

            <br>

            <b-form-checkbox
              id="checkbox-1"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
            >
              Confirmación de desactivación de cuenta, te extrañaremos :(
            </b-form-checkbox>

            <br><br>

            <b-button class="mr-3" type="submit" variant="primary">Aceptar</b-button>
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
            {{mensaje}}
          </b-alert>
          <b-alert
              variant="success"
              dismissible
              fade
              :show="success"
              @dismissed="success = false"
              class="mt-3"
          >{{mensaje}}</b-alert>
        </b-tab>
        <b-tab title="Más opciones"><b-card-text>Tab contents 3</b-card-text></b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios';
  import TopHeader from '../components/TopHeader';
  export default{
    data() {
      return {
        nombre: "",
        apellido:"",
        nombre_usuario:"",
        telefono:"",
        nueva_pass: "",
        nueva_pass_conf: "",
        //correo: "",
        pass: "",
        error: false,
        success: false,
        mensaje: "",
        user: "",
        //Datos de desactivación de cuenta
        form: {
          passwordDesact: '',
          passwordDesactAgain: '',
          OptionsDesact: null
        },
        Optionsdesacts: [{ text: 'Cuéntanos, ¿por qué te vas?', value: null }, 
                          'Encontré una página mejor', 
                          'No deseo seguir calificando productos', 
                          'La comunidad no es muy colaborativa',
                          'Solo deseo desactivar mi cuenta'],
        show: true

      }
    },
    async mounted(){
      // Se hace la solicitud al back para que nos den los datos.
      try {
            const response = await axios.post('http://localhost:8080/users/perfil',{},
            {headers:{'Authorization': 'Bearer '+ localStorage.getItem('token')}}
            );
            this.user = response.data;
            //this.$store.state.tab = 'rulet';
        } catch (error) {
            console.log(error);
        }
      this.nombre = this.user.name;
      this.apellido = this.user.lastname;
      this.nombre_usuario = this.user.user_name;
      // this.telefono = this.user.phone;
      // this.correo = this.user.email;
    },

    methods: {
      async save() {
        if(this.pass == ""){
          this.mensaje = "Por favor ingresa tu contraseña actual."
          this.error = true;
        }else if(this.nueva_pass != this.nueva_pass_conf){
          this.mensaje = "La nueva contraseña no coincide."
          this.error = true;
        } else {
          try {
            const response = await axios.post('http://localhost:8080/users/update',
            {
              "user_id": this.user.user_id,
              "user_name" : this.nombre_usuario,
              "password" : this.pass,
              "passtemp" : this.nueva_pass,
              "active" : this.user.active,
              "name" : this.nombre,
              "lastname" : this.apellido,
              "points" : this.user.points
            },
            {headers:{'Authorization': 'Bearer '+ localStorage.getItem('token')}}
            );
            if(response.data){
              this.$store.commit("setUsername", this.nombre_usuario);
              this.pass = '';
              this.nueva_pass = '';
              this.nueva_pass_conf = '';
              localStorage.clear();
              localStorage.setItem('token', response.data);
              this.mensaje = "Tus cambios se han realizado con éxito."
              this.success = true;
            }else{
              this.mensaje = "Datos inválidos, inténtalo de nuevo."
              this.error = true;
            }
          } catch (error) {
            this.mensaje = "Datos inválidos, inténtalo de nuevo."
            this.error = true;
          }
        }
      },

      //Métodos para desactivación de cuenta
      async onSubmit(event) {
        event.preventDefault();
        if(this.form.passwordDesactAgain === this.form.passwordDesact){
          try {
            const response = await axios.post('http://localhost:8080/users/desactivate',{
              "password": this.form.passwordDesact 
            },{headers:{'Authorization': 'Bearer '+ localStorage.getItem('token')}});
            if(response.data){
              this.mensaje = "Te extrañaremos, vuelve pronto :("
              this.success = true;
              this.$refs.head.Logout();
            }else{
              this.mensaje = "Ups, algo salió mal inténtalo de nuevo."
              this.error = true;
            }
          } catch (error) {
            this.mensaje = "Ups, algo salió mal inténtalo de nuevo."
            this.error = true;
            console.log(error);
          }
        }else{
          this.mensaje = "Las contraseñas no coinciden."
          this.error = true;
        }
        this.form.passwordDesactAgain = '';
        this.form.passwordDesact = '';
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.passwordDesact = ''
        this.form.passwordDesactAgain = ''
        this.form.OptionsDesact = null
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    components: {
      "top-header": TopHeader
    }
  }
</script>