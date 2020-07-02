<template lang='pug'>
.container-fluid
  .row
    .col.mx-auto.text-center.d-flex.align-items-center(style='max-width: 25.5rem')
      form.form-signin.text-white(@submit.prevent='submit')
        //- img.mb-4.rounded-circle(src='@/assets/user.svg', alt='', width='72', height='72')
        .title.text-center
          .display-4 Mister 
          .display-3.mb-5 Courier
        label.sr-only(for='inputEmail') Email
        input#inputEmail.form-control(type='email', v-model='localUser.email' placeholder='Email', required, autofocus)
        label.sr-only(for='inputPassword') Contraseña
        input#inputPassword.form-control(type='password', v-model='localUser.password' placeholder='Contraseña', required)
        .checkbox.mb-3
          label
            input(type='checkbox', value='remember-me')
            |  Recuerdame
        .form-group
          #recaptcha
        .form-group
          button.btn.btn-lg.btn-primary.btn-block(type='submit') 
            | Ingresar
        router-link.text-reset(to='/register')
          | Registrarse
        p.mt-5.mb-3.text-muted © 2017-2019
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      localUser: {},
    }
  },
  methods: {
    submit() {
      this.$Progress.start();
      firebase
      .auth()
      .signInWithEmailAndPassword(this.localUser.email, this.localUser.password)
      .then(() => {
        this.$Progress.finish();
        this.$router.replace('/home');
      })
      .catch(err => {
        console.log(err);
        this.$Progress.finish();
        this.$message(this.errMessages[err.code]);
        // if (err.code == 'auth/too-many-requests') {
        //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
        //     'size': 'normal',
        //     'callback': (res) => {
        //       console.log(res);
        //       // reCAPTCHA solved, allow signInWithPhoneNumber.
        //       // ...
        //     },
        //     'expired-callback': () => {
        //       // Response expired. Ask user to solve reCAPTCHA again.
        //       // ...
        //     }
        //   })
        //   window.recaptchaVerifier.render();
        // }
      });
    }
  }
}
</script>

<style scoped>
.container-fluid {
  background-image: url('../assets/cafeRacer.jpg');
  background-size: cover;
  background-position: bottom;
}

.title {
  font-family: 'Sriracha', cursive;
}

.col {
  height: 100vh;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>