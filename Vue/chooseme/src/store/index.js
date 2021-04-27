import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    products: [],
    logged: false,
    user: "Usuario",
    tab: "rulet",
    product: "",
    product_description:""
  },
  mutations: {
    setProductlist(state, products){
      state.products = products
    },
    isLogged(state, logged){
      state.logged = logged
    },
    setUsername(state, user){
      state.user = user
    },
    setTab(state, tab){
      state.tab = tab
    },
    setProduct(state, product){
      state.product = product
    },
    setProduct_description(state, product){
      state.product_description = product
    }
  },
  actions: {},
  modules: {},
});