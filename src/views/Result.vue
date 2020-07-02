<template lang='pug'>
  .container.py-4
    h1.mt-5 Resultados
    p.lead
      | Resultados de busqueda.
    hr
    .row
      .col
        ul.list-group.list-group-flush
          li.list-group-item(v-for='item in 10')
            feather(type='edit' style='position: absolute; right: 5px; top: 3px')
            router-link.font-weight-bold(to='/details') Labore nulla sit veniam dolor aliqua qui duis ea in officia ut non.
            p Incididunt pariatur ad veniam amet et veniam quis cillum dolor eiusmod. Deserunt ea excepteur occaecat reprehenderit. Officia et veniam est est non nulla officia aute exercitation elit pariatur veniam. Occaecat fugiat excepteur esse amet ullamco nostrud duis. Ipsum anim nulla esse qui. Sint magna duis sint reprehenderit cupidatat nulla laboris incididunt occaecat velit. Aliqua cillum cupidatat ullamco Lorem Lorem.
            .row
              .col-1
                feather(type='trash-2')
              .col-1
                | 354 Kb
              .col-1
                feather(type='file-text')
</template>

<script>
export default {
  data() {
    return {
      results: [],
    }
  }
}
</script>
