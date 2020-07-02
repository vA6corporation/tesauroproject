<template lang="pug">
  nav.col-4.d-none.d-lg-block.sidebar.mt-auto.sidebar-sticky(:class='{ active: setting.showSidebar }')
    ul.nav.flex-column
      li.nav-item.py-4.px-2.bg-info
        .preicon.text-center
          a.rounded-circle.bg-white.d-inline-block.my-3(href='#' @click='setActive' style='width: 2.5rem; height: 2.5rem')
            feather.feather-lg.feather-bold(type='chevron-right' style='margin-top: 2px; margin-left: 3px')
        .posticon.mx-2
          a.rounded-circle.bg-white.d-inline-block.my-3(href='#' @click='setActive' style='width: 2.5rem; height: 2.5rem')
            feather.feather-lg.feather-bold(type='chevron-left' style='margin-top: 2px; margin-left: 1px')
          h2.d-inline.ml-3.text-white.text-capitalize {{ currentModule.name }}
      template(v-for='(item, index) in modules')
        li.nav-item.position-relative
          .indicator.position-absolute(style='width: 0.2rem; height: 100%; left: 0px;')
          router-link.nav-link(@click.native='fetchCurrentModule(item)' :to='item.path')
            .preicon.text-center
              feather.icon-md(:type='item.icon')
            .posticon
              feather.icon-md.mr-2(:type='item.icon') 
              | {{ item.label }}
</template>

<script>
import { db } from '@/db';
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      currentModule: 'modules/currentModule',
      modules: 'modules/modules',
    }),
  },
  methods: {
    ...mapActions({
      fetchCurrentModule: 'modules/fetchCurrentModule',
    }),
    isActive(position) {
      return position == this.active;
    },
    setActive() {
      this.setting.showSidebar = !this.setting.showSidebar
      db.collection("settings").doc(this.user.uid).update(this.setting);
    }
  }
}
</script>

<style scoped>
/* nav:hover .preicon {
  display: none;
} */

nav.active .preicon {
  display: none;
}

.posticon {
  width: 0;
  height: 0;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

/* nav:hover .posticon {
  width: auto;
  height: auto;
  visibility: visible;
  opacity: 1;
} */

nav.active .posticon {
  width: auto;
  height: auto;
  visibility: visible;
  opacity: 1;
}

li .preicon {
  margin: auto;
}

nav {
  max-width: 5rem;
  transition: max-width 1s;
}

/* nav:hover {
  max-width: 100rem;
} */

nav.active {
  max-width: 100rem;
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 0 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-right {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 75px);
  /* padding-top: .5rem; */
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

/* .sidebar .nav-link:hover,
.sidebar .nav-link.active {
  color: $red;
} */

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

</style>
