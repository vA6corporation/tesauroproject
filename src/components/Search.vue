<template lang="pug">
.card-body.text-center
  h5.card-title Busqueda
  //- p.card-text With supporting text below as a natural lead-in to additional content.
  .form-group
    input.form-control(type='text' placeholder='Busqueda')
  a.btn.btn-primary(href='#') 
    feather(type='search')
    |  Buscar
</template>

<script>
export default {

}
</script>

<style>

</style>