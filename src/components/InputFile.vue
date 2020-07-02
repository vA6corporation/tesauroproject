<template lang="pug">
.custom-file
  input#inputPdf.custom-file-input(type='file', lang='es' :accept='accept' multiple
    @change='getBase64($event.target.files)' :required='required')
  //-label.custom-file-label.text-muted.text-truncate(:for='_uid') {{ label || placeholder }}
</template>

<script>
import { db } from '@/db'
import firebase from 'firebase/app'

export default {
  props: ['value', 'required', 'placeholder', 'accept'],
  data() {
    return {
      label: null
    }
  },
  methods: {
    getBase64(files) {
      files.forEach(file => {
        if (file) {
          this.label = file.name;
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            console.log('Leido correctamente');
            var doc = {
              userId: this.user.uid,
            };
            db.collection("pdfs").add(doc)
            .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
            });
            // this.$emit('input', reader.result);
            // db.collection('settings').doc(this.user.uid).set({
            //   showSidebar: true,
            //   phoneNumber: this.localUser.phoneNumber,
            // });
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        }
      });
    },
  },
  watch: {
    value() {
      if (this.value == undefined) {
        this.$el.querySelector('input').value = '';
        this.label = null;
      }
    } 
  }
}
</script>

