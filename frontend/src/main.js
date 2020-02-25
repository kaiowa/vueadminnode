import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/';
import axios from 'axios';
import VueMeta from 'vue-meta';
import Vuex from 'vuex';

Vue.config.productionTip = false;
Vue.prototype.$http  =  axios;
Vue.use(Vuex);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  let token=(store.state.web && store.state.web.usuario && store.state.web.usuario.token) ? true : false;
  if(requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

axios.interceptors.request.use(function(config) {

  const onLine = navigator.onLine ? true : false;
  let token=(store.state.web && store.state.web.usuario && store.state.web.usuario.token) ? store.state.web.usuario.token : null;

  if ( token !== null ) {

    config.headers.Authorization = `Bearer ${token}`;
    config.headers['X-Access-Token']= `Bearer ${token}`;

  }
  return config;
}, function(err) {
  return Promise.reject(err);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');