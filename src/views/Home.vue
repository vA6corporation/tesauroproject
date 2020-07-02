<template lang='pug'>
  .container.py-4
    h1.mt-5 Busquedas
    p.lead
      | Busqueda de indices.
    hr
    .card
      .card-header
        ul.nav.nav-tabs.card-header-tabs
          li.nav-item
            a.nav-link(href='#' :class='{ active: currentComponent == "search" }' @click='currentComponent = "search"') 
              | Busqueda
          li.nav-item
            a.nav-link(href='#' :class='{ active: currentComponent == "searchAdvance" }' @click='currentComponent = "searchAdvance"') 
              | Busqueda Avanzada
          li.nav-item
            a.nav-link(href='#' :class='{ active: currentComponent == "searchCategory" }' @click='currentComponent = "searchCategory"') 
              | Busqueda por Categoria
      component(:is='currentComponent')
</template>

<script>
import Search from '@/components/Search'
import SearchAdvance from '@/components/SearchAdvance'
import SearchCategory from '@/components/SearchCategory'

export default {
  components: {
    Search,
    SearchAdvance,
    SearchCategory,
  },
  data() {
    return {
      currentComponent: 'searchAdvance',
    }
  }
}
</script>
