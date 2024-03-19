import { createApp } from 'vue';
import App from './App.vue';
import VueCookies from 'vue-cookies';
import Vuex from 'vuex';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import router from './router/index.js';

var appMain = createApp(App);
appMain.use(Vuex);
appMain.use(store);
appMain.use(router);
appMain.use(VueCookies);
appMain.mount('#app');
