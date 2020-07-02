<template lang='pug'>
nav.navbar.navbar-expand-md.navbar-dark.bg-dark(v-if='user')
  .container
    router-link.navbar-brand(to='/home') Tesauro
    button.navbar-toggler(type='button', data-toggle='collapse', data-target='#navbarsExample07', aria-controls='navbarsExample07', aria-expanded='false', aria-label='Toggle navigation')
      span.navbar-toggler-icon
    .collapse.navbar-collapse.ml-5
      ul.navbar-nav.mx-auto
        li.nav-item.active.mr-3
          router-link.nav-link(to='/home')
            feather.feather-md.mr-2(type='search')
            | Busqueda
        li.nav-item.active.mr-3
          router-link.nav-link(to='/recent')
            feather.feather-md.mr-2(type='clock')
            | Recientes
        li.nav-item.active.mr-3
          router-link.nav-link(to='/publication')
            feather.feather-md.mr-2(type='book')
            | Publicacion
        li.nav-item.active.mr-3
          router-link.nav-link(to='/classification')
            feather.feather-md.mr-2(type='globe')
            | Clasificacion
        li.nav-item.active.mr-3
          router-link.nav-link(to='/profile')
            feather.feather-md.mr-2(type='user')
            | Mi Perfil
        //-li.nav-item.active.mr-2
          router-link.nav-link(to='/jobs')
            feather.feather-md.mr-2(type='briefcase')
            | Empleos
        //-li.nav-item.active.mr-2
          router-link.nav-link(to='/blog')
            feather.feather-md.mr-2(type='message-square')
            | Foro
        //-li.nav-item.active
          router-link.nav-link(to='/dashboard')
            feather.feather-md.mr-2(type='settings')
            | Admin
      ul.navbar-nav.ml-auto
        li.nav-item.dropdown
          a.nav-link.dropdown-toggle(href='#', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false') 
            img.rounded-circle(src='@/assets/user.svg' style='width: 2.5rem')
          .dropdown-menu.dropdown-menu-right
            a.dropdown-item(href='#')
              | {{ user.displayName }}
            a.dropdown-item(href='#')
              feather.feather-sm.mr-2(type='settings')
              | Preferencias
            a.dropdown-item(href='#')
              feather.feather-sm.mr-2(type='phone')
              | Contactanos
            a.dropdown-item(href='#' @click.prevent='signOut')
              feather.feather-sm.mr-2(type='log-out')
              | Salir
</template>

<script>
import firebase from 'firebase/app'

export default {
  data() {
    return {
      authenticated: false,
    }
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // this.$router.replace('/login');
        });
    }
  }
}
</script>