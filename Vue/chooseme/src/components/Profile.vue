<template>
  <div class="profile" style="margin-top: 70px">
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
              <b-col>
                <label for="phone">Teléfono:</label>
                <b-form-input v-model= "telefono" id="phone"></b-form-input>
              </b-col>
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
            <b-row class="pb-3">
              <b-col>
                <label for="email">Email:</label>
                <b-form-input v-model= "correo" id="email"></b-form-input>
              </b-col>
            </b-row>
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
        </b-tab>
        <b-tab title="Desactivar mi cuenta"><b-card-text>Tab contents 2</b-card-text></b-tab>
        <b-tab title="Más opciones"><b-card-text>Tab contents 3</b-card-text></b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        nombre: "",
        apellido:"",
        nombre_usuario:"",
        telefono:"",
        nueva_pass: "",
        nueva_pass_conf: "",
        correo: "",
        pass: "",
        error: false,
        mensaje: ""
      }
    },
    mounted(){
      // Se hace la solicitud al back para que nos den los datos.
      this.nombre = "Juan Esteban";
      this.apellido = "Rozo Urbina";
      this.nombre_usuario = "juanrozou";
      this.telefono = "123456789";
      this.correo = "juanr@prk.uv";
    },
    methods: {
      save() {
        if(this.pass == ""){
          this.mensaje = "Por favor ingresa tu contraseña actual."
          this.error = true;
        }else if(this.nueva_pass != this.nueva_pass_conf){
          this.mensaje = "La nueva contraseña no coincide."
          this.error = true;
        } /*else {
          AQUI VA LO DE MANDAR LA SOLICITUD DE CAMBIO.
        }*/
      }
    }
  }
</script>