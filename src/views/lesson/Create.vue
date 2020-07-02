<template lang="pug">
  .container-fluid
    .row
      sidebar-admin
      .col.py-3
        form(@submit.prevent='submit')
          .form-group.row
            .col-6.mx-auto
              video#videoPlayer.embed-responsive.embed-responsive-16by9(
                @load='player.play()'
                :src='src' controls poster='@/assets/teleradiomed.png' 
                controlsList="nodownload nopictureinpicture")
          .form-group
            .custom-file
              //- input#customFile.custom-file-input(type='file' @change='loadFile($event.target.files[0])' accept='video/webm')
              input#customFile.custom-file-input(type='file' @change='loadFile($event.target.files[0])')
              label#customLabel.custom-file-label(for='customFile') Choose video
          .form-group
            .progress
              .progress-bar.progress-bar-striped.progress-bar-animated(role='progressbar', :style="`width: ${this.uploadProgress}%`", 
                aria-valuemin='0', aria-valuemax='100')
          button.btn.btn-info.mr-2(type='submit')
            | Guardar 
            feather(type='save')
          template(v-if='uploadTask')
            button.btn.btn-secondary.mr-2(type='button' @click='uploadTask.pause()')
              | Pause 
              feather(type='pause')
            button.btn.btn-secondary.mr-2(type='button' @click='uploadTask.resume()')
              | Reanudar  
              feather(type='play')
            button.btn.btn-secondary(type='button' @click='uploadTask.cancel()')
              | Cancelar 
              feather(type='x')
        .row
          .col
            ul.list-group
              a.list-group-item(href='#' v-for='item in videos' @click='setSrc(item.url)')
                | {{ item }}
</template>

<script>
import SidebarAdmin from '@/components/SidebarAdmin'
import { storage, db } from '@/db'
import firebase from 'firebase/app'

export default {
  components: {
    SidebarAdmin,
  },
  mounted() {
    this.customLabel = this.$el.querySelector('#customLabel');
    this.player = this.$el.querySelector('#videoPlayer');
    this.fetchData();
  },
  data() {
    return {
      file: null,
      uploadTask: null,
      uploadProgress: 0,
      customLabel: null,
      videos: [],
      player: null,
      src: '',
    }
  },
  methods: {
    loadFile(file) {
      this.customLabel.innerHTML = file.name;
      this.file = file;
    },
    async fetchData() {
      var videos = await db.collection('videos').where('user', '==', this.user.uid).get();
      this.videos = [];
      videos.forEach(item => {
        console.log(item.data());
        this.videos.push(item.data());
      });
    },
    uniqueId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    setSrc(src) {
      this.src = src;
      // this.player.play();
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

        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          db.collection('videos').add({
            user: this.user.uid,
            url: downloadURL,
          }).then(ref => {
            this.fetchData();
            console.log(ref);
          });
        });
      });
    },
  }
}
</script>