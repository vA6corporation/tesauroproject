import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import VueLoading from 'vuejs-loading-plugin'
import VueProgressBar from 'vue-progressbar'
import VueFeather from 'vue-feather'
import Toast from './plugins/Toast'
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import jquery from 'jquery'
window.$ = jquery;
import 'bootstrap'
import { mapGetters } from 'vuex'

Vue.use(VueLoading)
Vue.use(VueResource);
Vue.use(VueFeather);
Vue.use(Toast);
Vue.use(VueProgressBar, {
  color: '#818fa7',
  failedColor: "#818fa7",
  thickness: '0.2rem',
  transition: {
    speed: '0.5s',
    termination: 300
  },
});

Vue.config.productionTip = false;
Vue.http.options.root = 'http://localhost:5001/ulearning/us-central1';

Vue.mixin({
  data() {
    return {
      errMessages: {
        "auth/user-not-found": "El usuario no existe",
        "auth/wrong-password": "La contraseña o el usuario no coincide",
        "auth/too-many-requests": "Demasiados intentos fallidos, porfabor intentelo en un momento",
        "auth/weak-password": "La contraseña debe tener al menos 6 caracteres",
        "auth/email-already-in-use": "Este email esta actualmente en uso",
        "auth/invalid-email": "El email no es valido"
      },
      shortMonths: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      setting: 'setting/setting',
    }),
  },
  methods: {
    formatDate(date) {
      var d = new Date(date);
      var month = d.getMonth();
      var day = '' + d.getDate();
      var year = d.getFullYear();
      
      if (day.length < 2) day = '0' + day;
    
      return `${day} ${this.shortMonths[month]} ${year}`;
    },
  }
});

const configOptions = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

firebase.initializeApp(configOptions);
firebase.analytics();

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("user/fetchUser", user);
  if (user) {
    firebase.firestore().collection("settings").doc(user.uid).get().then(doc => {
      if (doc.exists) {
        store.dispatch("setting/fetchSetting", doc.data());
        store.dispatch("system/fetchStart", true);
      }
      store.dispatch("system/fetchStart", true);
    });
  } else {
    if (window.location.pathname != '/register') {
      router.replace('/login');
    }
    store.dispatch("system/fetchStart", true);
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');