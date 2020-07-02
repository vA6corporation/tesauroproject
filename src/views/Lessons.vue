<template lang="pug">
  .container-fluid
    .row
      sidebar
      .col.py-3
        .form-group
        .row
</template>

<script>
import Sidebar from '@/components/Sidebar'
import { db } from '@/db'

export default {
  components: {
    Sidebar,
  },
  firestore: {
    documents: db.collection('documents'),
  },
  data() {
    return {
      documents: [],
      document: {},
    }
  },
  methods: {
    submit() {
      if (this.document.id) {
        db.collection("documents").doc(this.document.id).update(this.document).catch(err => {
          console.log(err.message);
        });
      } else {
        db.collection("documents").add(this.document)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      }
    },
    update() {
      db.collection("documents").doc(this.document.id).update(this.document);
    },
    remove(documentId) {
      db.collection('documents')
      .doc(documentId)
      .delete().then(() => {
        console.log('terminado');
      }).catch(err => {
        console.log(err.message);
      });
    }
  }
}
</script>