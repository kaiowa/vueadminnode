import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import web from './modules/web.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    web
  },
  plugins: [createPersistedState({
    paths:['web'],
  }),],
});
