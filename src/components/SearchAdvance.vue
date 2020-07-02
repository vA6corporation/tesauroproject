<template lang="pug">
.card-body
  h5.card-title.mb-4 Busqueda avanzada
  //- p.card-text With supporting text below as a natural lead-in to additional content.
  .form-group.row
    .col-5
      input.form-control(type='text' placeholder='Termino a buscar')
    .col-1.text-center
      | en
    .col-3
      select.custom-select()
        option(value='0') DOCUMENTO
        option(value='1') TITULO
        option(value='2') TERMINO INDEXADO
    .col
  .form-group.row(v-for='(item, index) in filters')
    .col-2
      select.custom-select(v-model='item.logic')
        option(value='AND') AND
        option(value='OR') OR
    .col-3
      input.form-control(type='text' v-model='item.text' placeholder='Termino a buscar')
    .col-1.text-center
      | en
    .col-3
      select.custom-select(v-model='item.type')
        option(value='0') DOCUMENTO
        option(value='1') TITULO
        option(value='2') TERMINO INDEXADO
    .col
      button.btn.btn-info.mr-2(type='button' @click='upFilter(index)')
        feather(type='arrow-up')
      button.btn.btn-info.mr-2(type='button' @click='removeFilter(index)')
        feather(type='x')
      button.btn.btn-info(type='button' @click='addFilter' v-if='index == filters.length - 1')
        feather(type='plus')
  .form-group.row
    label.col-3.col-form-label Año de publicacion
    .col-2
      input.form-control(type='number' value='2020')
  router-link.btn.btn-primary(to='/result') 
    feather(type='search')
    |  Buscar
</template>

<script>
export default {
  mounted() {
    this.filters.push({ logic: 'AND', type: '0', text: '' });
  },
  data() {
    return {
      filters: [],
    }
  },
  methods: {
    addFilter() {
      this.filters.push({ logic: 'AND', type: '0', text: '' });
    },
    removeFilter(index) {
      if (this.filters.length > 1) {
        this.filters.splice(index, 1);
      }
    },
    upFilter(index) {
      if (index != 0) {
        var filter = Object.assign({}, this.filters[index]);
        this.filters.splice(index, 1);
        this.filters.splice(index-1, 0, filter);
      }
    }
  }
}
</script>

<style>

</style>