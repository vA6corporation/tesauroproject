<template lang='pug'>
  #app
    vue-progress-bar
    topbar
    router-view(v-if='start')
</template>

<script>
import Topbar from '@/components/Topbar'
import { mapGetters } from 'vuex'

export default {
  mounted() {
    this.$loading(true);
    this.$Progress.start();
  },
  components: {
    Topbar,
  },
  computed: {
    ...mapGetters({
      start: 'system/start',
    }),
  },
  watch: {
    start() {
      this.$loading(false);
      this.$Progress.finish();
    }
  }
}
</script>

<style lang="scss">
@import "@/sass/app.scss";
</style>