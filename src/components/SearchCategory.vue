<template lang="pug">
.card-body.text-center
  h5.card-title.mb-4 Busqueda por categoria
  //- p.card-text With supporting text below as a natural lead-in to additional content.
  
  .form-group.row.text-center
    .col
      | Categoria
      select.custom-select()
        option() Ejercicios
        option() Cuaderno de trabajo
        //- option() Trigonometria
    .col-4
      | Nivel
      select.custom-select()
        option() Primaria
        option() Secundaria
        //- option() Trigonometria
    .col
      | Tipo
      select.custom-select()
        option() Algebra
        option() Geometria
        option() Trigonometria
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