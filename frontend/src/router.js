import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    }
    if (to.hash) {
        return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./pages/Home/Home.vue'),
      meta: { 'seotitle':'home',requiresAuth: true },

    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/Login/Login.vue'),
      meta: { 'seotitle':'home',requiresAuth: false },

    },
    { path: '*', redirect: '/404.html', hidden: true },
  ],
});


