<template lang="pug">
  .container-fluid
    .row
      sidebar-admin
      .col.py-3
        .card.text-white.bg-primary.mb-3(style='max-width: 18rem;')
          .card-header Header
          .card-body
            h5.card-title Primary card title
            p.card-text
              | Some quick example text to build on the card title and make up the bulk of the card's content.
</template>

<script>
import { storage } from '@/db'
import firebase from 'firebase/app'
import SidebarAdmin from '@/components/SidebarAdmin'

export default {
  components: {
    SidebarAdmin,
  },
  mounted() {
    this.customLabel = document.querySelector('#customLabel');
  },
  data() {
    return {
      file: null,
      uploadTask: null,
      uploadProgress: 0,
      customLabel: null,
    }
  },
  methods: {
    loadFile(file) {
      this.customLabel.innerHTML = file.name;
      this.file = file;
    },
    uniqueId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    submit() {
      var storageRef = storage.ref();
      var fileRef = storageRef.child(`videos/${this.uniqueId()}`);
      this.uploadTask = fileRef.put(this.file);
      this.uploadTask.then(() => {
        console.log('subido');
      }).catch(() => {
        console.log('error o cancelado');
      });
      this.uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.uploadProgress = progress;
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
        this.$message('Video subido correctamente');
        this.uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
        });
      });
    },
  }
}
</script>