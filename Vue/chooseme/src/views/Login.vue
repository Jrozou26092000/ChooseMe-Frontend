<template>
    <div class="login">
      <top-header @header_message = "option = $event" ></top-header>
      <b-container style="margin-top: 70px; width: 50%">
          <b-card 
              header="Bienvenidos a ChooseMe!"
              header-bg-variant="dark"
              header-text-variant="white"
              align="center"
          >   

          <b-form @submit="onLogin" v-if="show">
              <b-form-group
                  id="input-group-1"
                  label="Correo electrónico:"
                  label-for="input-1"
              >
                  <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  required
                  >
                  </b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
                  <b-form-input
                  id="input-2"
                  v-model="form.password"
                  placeholder="Ingrese su contraseña"
                  type = "password"
                  required
                  ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="secondary">Log In</b-button>
          </b-form>
          <b-alert show variant="danger" v-if="not_loggedin" class="mt-3">Email o contraseña incorrectos.</b-alert>
              <template #footer>
                  <small class="text-muted">¿Aún no tienes cuenta? Resgístrate 
                    <b-link to="/signin">aquí</b-link>.
                  </small>
              </template>
          </b-card>
      </b-container>
    </div>
</template>

<script>
  import axios from 'axios';
  import TopHeader from '../components/TopHeader';

  export default {
    data() {
      return {
        form: {
            email: '',
            password: ''
        },
        show: true,
        not_loggedin: false
      }
    },
    methods: {
      async onLogin(event) {
        event.preventDefault()
        // API REST
        /* let json = {
          "email": this.form.email,
          "password": this.form.password
          // "active": 1
        };
        axios.post('http://localhost:8080/users/loggin',json).then(
          data => {
              var jwt = JSON.parse(atob(data.data.jwt.split(".")[1]));
              this.not_loggedin = false;
              localStorage.setItem('token', data.data.jwt);
              localStorage.setItem('user_name', jwt.sub);
              // this.$router.push('/home_logged');
              this.$store.state.user = jwt.sub;
              this.$store.state.logged = true;
               this.$store.state.tab = 'rulet';
          }
        ).catch(
          error =>{
            this.loggedin = false;
            this.not_loggedin = true;
            console.log(error);
          }
        ) */
        try {
            const response = await axios.post('http://localhost:8080/users/loggin',{
              "email": this.form.email,
              "password": this.form.password
            });
            var jwt = JSON.parse(atob(response.data.jwt.split(".")[1]));
            this.not_loggedin = false;
            localStorage.setItem('token', response.data.jwt);
            localStorage.setItem('user_name', jwt.sub);
            this.$store.state.user = jwt.sub;
            this.$router.push('/');
            this.$store.state.logged = true;
            //this.$store.state.tab = 'rulet';
        } catch (error) {
            console.log(error);
        }
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
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