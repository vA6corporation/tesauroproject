<template lang='pug'>
  .container.py-4
    h1.mt-5 Recientes
    p.lead
      | Publicaciones recientes
    hr
    .row.form-group.mb-5(v-for='item in uploadedPdfs')
      .col-md-3
        feather.feather-xxl(type='file-text')
      .col
        h3 {{ item.name }}
        template(v-if='item.update')
          .form-group
            textarea.form-control(v-model='item.description' placeholder='Descripcion')
          button.btn.btn-info(type='button' @click='saveDescription(item)')
            feather(type='save')
            |  Guardar
        template(v-else)
          template(v-if='item.description')
            p
              | {{ item.description }}
            a(href='#' @click='item.update = true') Editar 
          template(v-else)
            button.btn.btn-info(type='button' @click='item.update = true')
              feather(type='plus')
              |  Agregar descripcion
</template>

<script>
import { db } from '@/db'

export default {
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      uploadedPdfs: [],
    }
  },
  methods: {
    saveDescription(item) {
      delete item.update;
      db.collection('pdfs').doc(item.id).set(item);
      this.fetchData();
    },
    async fetchData() {
      var uploadedPdfs = await db.collection('pdfs')
      .where('user', '==', this.user.uid)
      .orderBy("createdAt")
      .limit(10)
      .get();
      this.uploadedPdfs = [];
      uploadedPdfs.forEach(item => {
        // console.log(item.data());
        var doc = item.data();
        doc.id = item.id;
        doc.update = false;
        this.uploadedPdfs.push(doc);
      });
    }
  }
}
</script>
