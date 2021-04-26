import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    logged: false,
    user: 'Usuario',
    tab: 'rulet',
    product: ""
  },
  mutations: {},
  actions: {},
  modules: {},
});