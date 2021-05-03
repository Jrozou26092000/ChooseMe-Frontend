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
    current_product: "",
    product_search: "",
    product_reviews: [],
    page_product_reviews: 0
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
    setCurrent_product(state, product){
      state.current_product = product
    },
    setProduct_search(state, product_search){
      state.product_search = product_search
    },
    setProduct_reviews(state, reviews){
      state.product_reviews.push(reviews);
    },
    resetProduct_reviews(state, new_reviews){
      state.product_reviews = new_reviews
    },
    resetPage_product_reviews(state){
      state.page_product_reviews = 0
    },
    incrementPage_product_reviews(state){
      // CAMBIAR A += 10!!!
      state.page_product_reviews += 1
    }
  },
  actions: {},
  modules: {},
  getters: {
    getPage_product_reviews(state) {
      return state.page_product_reviews
    },
    getCurrent_product(state){
      return state.current_product
    }
  }
});