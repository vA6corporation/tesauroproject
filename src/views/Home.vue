<template lang='pug'>
  .container.py-4
    h1.mt-5 Seguimiento de envios
    p.lead
      | Panel de seguimiento de envios.
    hr
    ul.list-group
      li.list-group-item.p-0.shadow-sm
        a.list-group-item-action.d-flex.align-items-center.justify-content-between.px-5.py-4(href='#' 
          data-toggle='collapse' data-target='#collapse')
          h2.mb-0 
            feather.feather-xl.mr-4.text-success(type='airplay')
            b Envios en progreso
          feather.feather-lg.feather-bold(type='chevron-down')
        #collapse.collapse.p-5
          .row
            .col-md-6
              module-card
            .col
              module-card
      .p-3
      li.list-group-item.p-0.shadow-sm
        a.list-group-item-action.d-flex.align-items-center.justify-content-between.px-5.py-4(href='#' 
          data-toggle='collapse' data-target='#collapse2')
          h2.mb-0 
            feather.feather-xl.mr-4.text-info(type='airplay')
            b Nuevos envios
          feather.feather-lg.feather-bold(type='chevron-down')
        #collapse2.collapse.p-5
          //-.row
            .col-md-6
              module-card
            .col
              module-card
      //-.p-3
      //-li.list-group-item.d-flex.align-items-center.py-4.justify-content-between.px-5.shadow-sm
        h2.mb-0 
          feather.feather-xl.mr-4.color-orange(type='airplay')
          b Envios Express
        feather.feather-lg.feather-bold(type='chevron-down')
      .p-3
      li.list-group-item.d-flex.align-items-center.justify-content-between.py-4.px-5.shadow-sm
        h2.mb-0 
          feather.feather-xl.mr-4.text-danger(type='airplay')
          b Estado de envios
        feather.feather-lg.feather-bold(type='chevron-down')
      .p-3
      li.list-group-item.d-flex.align-items-center.justify-content-between.py-4.px-5.shadow-sm
        h2.mb-0 
          feather.feather-xl.mr-4(type='airplay')
          b Historial de envios
        feather.feather-lg.feather-bold(type='chevron-down')
      .p-3
      //-li.list-group-item.d-flex.align-items-center.justify-content-between.py-4.px-5.shadow-sm
        h2.mb-0 
          feather.feather-xl.mr-4(type='airplay')
          b Carrera de Marqueting digital
        feather.feather-lg.feather-bold(type='chevron-down')
      .p-3
      //-li.list-group-item.d-flex.align-items-center.justify-content-between.py-4.px-5.shadow-sm
        h2.mb-0 
          feather.feather-xl.mr-4(type='airplay')
          b Carrera de Marqueting digital
        feather.feather-lg.feather-bold(type='chevron-down')
      .p-3
      //-li.list-group-item.d-flex.align-items-center.justify-content-between.py-4.px-5.shadow-sm
        h2.mb-0 
          feather.feather-xl.mr-4(type='airplay')
          b Carrera de Marqueting digital
        feather.feather-lg.feather-bold(type='chevron-down')
</template>

<script>
import ModuleCard from '@/components/ModuleCard'
import TestModal from '@/components/TestModal'

export default {
  components: {
    ModuleCard,
    TestModal,
  }
}
</script>
