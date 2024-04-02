import {createApp, markRaw} from 'vue'
import { createPinia } from 'pinia'
import router from './routes.js'


import './style.css'

import App from './App.vue'
import axios from "axios";

import './assets/theme_assets/plugins/fontawesome/js/all.min.js'
import './assets/theme_assets/css/portal.css'
import "./assets/theme_assets/plugins/popper.min.js"
import "./assets/theme_assets/plugins/bootstrap/js/bootstrap.min.js"
/*import "./assets/theme_assets/plugins/chart.js/chart.min.js"
import "./assets/theme_assets/js/index-charts.js"*/
import "./global_helpers/axios-interceptors.js"

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'



const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
})
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
