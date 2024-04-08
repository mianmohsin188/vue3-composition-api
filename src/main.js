import { createApp, markRaw } from 'vue';
import { createPopper } from '@popperjs/core';
import router from './routes.js';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword,getAuth  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import axios from 'axios';
import './assets/theme_assets/plugins/fontawesome/js/all.min.js';
import './assets/theme_assets/css/portal.css';
import './assets/theme_assets/plugins/popper.min.js';
import './assets/theme_assets/plugins/bootstrap/js/bootstrap.min.js';
import './assets/theme_assets/plugins/chart.js/chart.min.js';
import './assets/theme_assets/js/index-charts.js';
import './global_helpers/axios-interceptors.js';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/theme_assets/js/app.js';
import HelperMixin from './global_helpers/HelperMixin.js';

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router);
});

const app = createApp(App);
const firebaseConfig = {
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

app.config.globalProperties.$firebase = firebaseApp;
app.config.globalProperties.$auth = auth;
app.config.globalProperties.$firestore = firestore;
app.config.globalProperties.$createPopper = createPopper;

app.use(pinia);
app.use(router);
app.mixin(HelperMixin);
app.mount('#app');
