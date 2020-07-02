<template lang='pug'>
  .container.py-4
    preview-modal(:pdf='pdf')
    h1.mt-5 Publicacion
    p.lead
      | Administracion de documentos en PDF.
    hr
    .row
      .col-md-3
        label.btn.btn-info.btn-block(for='inputPdf') 
          feather(type='plus')
          |  Agregar PDF 
        //-input-file(accept='application/pdf,application/vnd.ms-excel')
        input#inputPdf.custom-file-input(type='file', lang='es' accept='application/pdf,application/vnd.ms-excel' multiple
          @change='uploadPdfs($event.target.files)' hidden)
        .form-group(v-for='(item, index) in pdfs')
          | {{ item.name }}
          .progress
            .progress-bar.progress-bar-striped.progress-bar-animated(role='progressbar', :style="`width: ${uploadProgress[index]}%`", 
              aria-valuemin='0', aria-valuemax='100')
      .col
        .form-group
          input.form-control(type='text' v-model='key' placeholder='Buscar libros')
        .card
          .card-header.border-bottom-0
            | Libros publicados
          ul.list-group.list-group-flush
            li.list-group-item.d-flex.justify-content-between(v-for='item in filterUploadedPdfs')
              | {{ item.name }}
              .btn-toolbar
                a.mr-2(href='#' data-toggle='modal' data-target='#previewModal' @click='pdf = item') 
                  feather(type='eye')
                  |  Visualizar 
                a.text-danger(href='#' @click='deletePdf(item)') 
                  feather(type='trash-2')
                  |  Eliminar
            li.list-group-item.text-muted(v-if='!uploadedPdfs.length')
              | Ningun libro publicado 
</template>

<script>
import ModuleCard from '@/components/ModuleCard'
import TestModal from '@/components/TestModal'
import PreviewModal from '@/components/PreviewModal'
import { db, storage } from '@/db'
import firebase from 'firebase/app'

export default {
  components: {
    ModuleCard,
    TestModal,
    PreviewModal,
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      key: null,
      uploadedPdfs: [],
      uploadProgress: [],
      pdfs: [],
      pdf: {},
    }
  },
  computed: {
    filterUploadedPdfs() {
      return this.uploadedPdfs.filter(e => !this.key || e.name.includes(this.key));
    }
  },
  methods: {
    uniqueId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    async fetchData() {
      var uploadedPdfs = await db.collection('pdfs').where('user', '==', this.user.uid).get();
      this.uploadedPdfs = [];
      uploadedPdfs.forEach(item => {
        // console.log(item.data());
        var doc = item.data();
        doc.id = item.id;
        this.uploadedPdfs.push(doc);
      });
    },
    deletePdf(pdf) {
      console.log(pdf);
      db.collection('pdfs')
      .doc(pdf.id)
      .delete().then(() => {
        this.fetchData();
        this.$message('Eliminado correctamente');
      }).catch(err => {
        console.log(err.message);
      });
    },
    uploadPdfs(pdfs) {
      this.pdfs = pdfs;
      this.pdfs.forEach((pdf, index) => {
        this.uploadProgress.push(0);
        var fileRef = storage.child(`pdfs/${this.uniqueId()}`);
        this.uploadTask = fileRef.put(pdf);
        this.uploadTask.then(() => {
          console.log('subido');
        }).catch(() => {
          console.log('error o cancelado');
        });
        this.uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadProgress[index] = progress;
          this.$forceUpdate();
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          this.$message('Se ha cancelado o producido un error');
        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          this.$message('Libro subido correctamente');

          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            db.collection('pdfs').add({
              user: this.user.uid,
              name: pdf.name,
              url: downloadURL,
              createdAt: new Date().getTime(),
            }).then(ref => {
              setTimeout(() => {
                this.fetchData();
              }, 1000);
              console.log(ref);
            });
          });
        });
      });
    }
  }
}
</script>
