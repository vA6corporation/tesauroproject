<template lang='pug'>
.position-absolute(style='top: 20px; right: 10px')
  div(aria-live='polite', aria-atomic='true', style='position: relative; min-height: 200px; top: 0px')
    div(style='position: absolute; top: 0; right: 0;')
      .toast.text-reset(role='alert', aria-live='assertive', aria-atomic='true' style='min-width: 25rem'
        :data-delay='options.delay' v-for='(item, index) in messages' :id='`toast${index}`')
        .toast-header
          //- img.rounded.mr-2(src='', alt='')
          strong.mr-auto Aviso
          //-small.text-muted just now
          button.close.px-2.py-1(type='button', data-dismiss='toast', aria-label='Close')
            span(aria-hidden='true') ×
        .toast-body
          | {{ item }}
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      timeoutId: null,
      options: {
        delay: 8000,
      },
    }
  },
  methods: {
    pushMessage(message) {
      this.messages.push(message);
      this.$nextTick(() => {
        $(`#toast${this.messages.length - 1}`).toast('show');
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.messages = [];
        }, this.options.delay += 1000);
      })
    },
  }
}
</script>

<style scoped>
.close {
  position: absolute;
  top: 0px;
  right: 5px;
}
</style>