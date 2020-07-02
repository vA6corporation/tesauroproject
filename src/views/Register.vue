<template lang='pug'>
  .container.py-5
    .row
      form.col(@submit.prevent='submit')
        h1 Registro
        hr
        //-.row.form-group
          label.col-md-3.col-form-label Celular de contacto
          .col
            input.form-control(type='text' placeholder='Celular de contacto' v-model='localUser.phoneNumber' required)
        .row.form-group
          label.col-md-3.col-form-label Nombres
          .col
            input.form-control(type='text' placeholder='Nombres' v-model='localUser.name' required)
        .row.form-group
          label.col-md-3.col-form-label Email
          .col
            input.form-control(type='email' placeholder='Email' v-model='localUser.email' required)
        .row.form-group
          label.col-md-3.col-form-label Contraseña
          .col
            .input-group
              input.form-control(:type='showPassword ? `text` : `password`' placeholder='Contraseña' v-model='localUser.password' required)
              .input-group-append
                button.btn.btn-secondary(type='button' @click='showPassword = !showPassword')
                  feather(type='eye' v-if='showPassword')
                  feather(type='eye-off' v-else)
        //-.form-group
          #recaptcha
        .d-flex.justify-content-end
          router-link.btn.btn-secondary.mr-2(to='/login')
            feather(type='x')
            |  Volver 
          button.btn.btn-info(type='submit')
            feather(type='save')
            |  Guardar 
</template>

<script>
import { db, auth } from '@/db'

export default {
  mounted() {
    console.log(this.settings);
  },
  data() {
    return {
      localUser: {},
      settings: [],
      showPassword: false,
    }
  },
  methods: {
    submit() {
      this.$Progress.start();
      auth.createUserWithEmailAndPassword(this.localUser.email, this.localUser.password)
        .then(data => {
          console.log(data);
          this.$Progress.finish();
          this.$message('Usuario creado correctamente');
          db.collection('settings').doc(data.user.uid).set({
            showSidebar: true,
            phoneNumber: this.localUser.phoneNumber,
          });
          // db.collection('settings').doc(data.user.uid).set({
            //   showSidebar: true,
          // });
          // db.collection("settings")
          //   .add({
            //     uid: data.user.uid,
          //     showSidebar: true,
          //   });
          data.user.updateProfile({
            displayName: this.localUser.name,
          });
          this.$router.push('/home');
        })
        .catch(err => {
          this.$Progress.finish();
          console.log(err);
          this.$message(this.errMessages[err.code]);
        });
    }
  }
}
</script>