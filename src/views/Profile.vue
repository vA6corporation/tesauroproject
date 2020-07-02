<template lang='pug'>
  form.container.py-4(@submit.prevent='submit')
    h1.mt-5 Mi Perfil
    p.lead
      | Datos del perfil.
    hr
    //-p
      | Use 
      a(href='/docs/4.5/examples/sticky-footer-navbar/') the sticky footer with a fixed navbar
      |  if need be, too.
    //- | {{ user }}
    .row.form-group
      label.col-md-3.col-form-label Nombres
      .col
        input.form-control(type='text' v-model='localUser.displayName' placeholder='Nombres' required)
    //-.row.form-group
      label.col-md-3.col-form-label DNI/RUC
      .col
        input.form-control(type='text' v-model='setting.documento' placeholder='DNI/RUC' required)
    .row.form-group
      label.col-md-3.col-form-label Celular
      .col
        input.form-control(type='text' v-model='setting.phoneNumber' placeholder='Celular' required)
    .d-flex.justify-content-end
      button.btn.btn-primary(type='submit')
        feather(type='save')
        |  Guardar 
</template>

<script>
import ModuleCard from '@/components/ModuleCard'
import TestModal from '@/components/TestModal'
import { db, auth } from '@/db'

export default {
  components: {
    ModuleCard,
    TestModal,
  },
  mounted() {
    this.localUser = Object.assign({}, this.user);
  },
  data() {
    return {
      localUser: {},
    }
  },
  methods: {
    submit() {
      db.collection("settings").doc(this.user.uid).update(this.setting);
      var user = auth.currentUser;
      user.updateProfile({
        displayName: this.localUser.displayName,
      });
      this.$message('Se han guardado los cambios');
    }
  }
}
</script>
