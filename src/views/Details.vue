<template lang='pug'>
  .container.py-4
    preview-modal(:pdf='pdf')
    h1.mt-5 Titulo del Libro
    p.lead
      | Publicado en : 2020/03/01
      button.ml-4.btn.btn-outline-info
        | Mas detalles
      button.ml-4.btn.btn-danger(type='button' data-toggle='modal' data-target='#previewModal')
        | Ver Pdf 
    hr
    .row
      .col
        ul.list-group.list-group-flush
          li.list-group-item Abstrac
          li.list-group-item(v-for='item in 5')
            //-feather(type='edit' style='position: absolute; right: 5px; top: 3px')
            router-link.font-weight-bold(to='/details') Labore nulla sit veniam dolor aliqua qui duis ea in officia ut non.
      .col-md-8
        ul.list-group.list-group-flush
          li.list-group-item
            feather(type='edit' style='position: absolute; right: 5px; top: 3px')
            router-link.font-weight-bold(to='/details') Abstrac
            p Incididunt pariatur ad veniam amet et veniam quis cillum dolor eiusmod. Deserunt ea excepteur occaecat reprehenderit. Officia et veniam est est non nulla officia aute exercitation elit pariatur veniam. Occaecat fugiat excepteur esse amet ullamco nostrud duis. Ipsum anim nulla esse qui. Sint magna duis sint reprehenderit cupidatat nulla laboris incididunt occaecat velit. Aliqua cillum cupidatat ullamco Lorem Lorem.
            .row
              .col-2
                feather(type='trash-2')
              .col-2
                | 354 Kb
              .col-2
                feather(type='file-text')
          li.list-group-item
            .row
              .col
                b Detalle: 
                Ut veniam eiusmod officia non magna.
              .col
                b Index: 
                Ut Dolor consectetur irure exercitation adipisicing pariatur.
            .row
              .col
                b Fecha publicacion: 
                Ut veniam eiusmod officia non magna.
              .col
                b Publihser: 
                Ut Dolor vampirin irure exercitation adipisicing pariatur.
</template>

<script>
import PreviewModal from '@/components/PreviewModal'

export default {
  components: {
    PreviewModal,
  },
  data() {
    return {
      pdf: {},
      results: [],
    }
  }
}
</script>
