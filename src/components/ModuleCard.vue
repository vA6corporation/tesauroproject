<template lang="pug">
  .card.shadow.border-warning
    .card-body.p-4.pt-5.m-1
      h4.text-center.mb-4 
        b Envio a Gamarra 134
      .d-flex.justify-content-between
        span 17 %
        span S/ 15 
      .form-group.mb-5.position-relative
        div.bg-secondary.position-absolute(style='width: 100%; height: 1px; top:2px; z-index: 1')
        div.bg-warning.position-absolute(style='width: 8rem; height: 5px; z-index: 2')
        //- div texto
      .d-flex.justify-content-between
        button.btn.btn-outline-secondary(type='button' style='width: 10rem')
          b Acerca de
        router-link.btn.btn-warning(to='/lessons' style='width: 10rem')
          b Continuar
</template>

<script>
export default {
  
}
</script>