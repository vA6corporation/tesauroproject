<template lang="pug">
#previewModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
  .modal-dialog.modal-xl.modal-dialog-scrollable
    .modal-content
      .modal-header
        h5.modal-title.text-capitalize {{ pdf.name }}
        button.close(type='button', data-dismiss='modal', aria-label='Close')
          span(aria-hidden='true') ×
      .modal-body(style='height: 90vh')
        iframe(:src='pdf.url' seamless style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%")
      //-.modal-footer
        button.btn.btn-secondary(type='button', data-dismiss='modal') Close
        //-button.btn.btn-primary(type='button') Save changes

</template>

<script>
export default {
  props: ['pdf'],
  methods: {
    resizeIframe(iframe) {
      iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
    }
  }
}
</script>

<style>

</style>