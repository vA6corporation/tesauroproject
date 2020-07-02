<template lang="pug">
  .container-fluid
    .row
      sidebar-admin
      .col.py-3
        table.table
          thead.thead-dark
            th Email
            th Nombres
            th F. de Registro
          tbody
            tr(v-for='item in users')
              td {{ item.email }}
              td {{ item.displayName }}
              td {{ formatDate(item.metadata.creationTime) }}
</template>

<script>
import SidebarAdmin from '@/components/SidebarAdmin'

export default {
  components: {
    SidebarAdmin,
  },
  mounted() {
    this.fetchUsers();
  },
  data() {
    return {
      users: [],
      nextPageToken: null,
    }
  },
  methods: {
    fetchUsers() {
      console.log('solicitamos usuarios');
      this.$http.get('users').then(res => {
        console.log(res);
        this.users = res.body.users;
      });
    }
  }
}
</script>