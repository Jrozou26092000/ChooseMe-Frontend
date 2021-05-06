import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    products: [],
    logged: false,
    user: "Usuario",
    current_product: "",
    product_search: "",
    product_reviews: [],
    page_product_reviews: 0,
    reviewers: [],
    page_reviewers: 0,
    top5: false
  },
  mutations: {
    setProductlist(state, products) {
      state.products = products;
    },
    isLogged(state, logged) {
      state.logged = logged;
    },
    setUsername(state, user) {
      state.user = user;
    },
    setCurrent_product(state, product) {
      state.current_product = product;
    },
    setProduct_search(state, product_search) {
      state.product_search = product_search;
    },
    setProduct_reviews(state, reviews) {
      state.product_reviews.push(reviews);
    },
    resetProduct_reviews(state, new_reviews) {
      state.product_reviews = new_reviews;
    },
    resetPage_product_reviews(state) {
      state.page_product_reviews = 0;
    },
    incrementPage_product_reviews(state) {
      state.page_product_reviews += 10;
    },
    resetReviewersList(state){
      state.reviewers = [];
    },
    addReviewersList(state, reviewers){
      state.reviewers.push(reviewers);
    },
    resetPage_reviewers(state) {
      state.page_reviewers = 0;
    },
    incrementPage_reviewers(state) {
      state.page_reviewers += 10;
    },
    setTop5(state, top5){
      state.top5 = top5;
    }
  },
  actions: {},
  modules: {},
  getters: {
    getPage_product_reviews(state) {
      return state.page_product_reviews;
    },
    getPage_reviewers(state) {
      return state.page_reviewers;
    },
    getCurrent_product(state) {
      return state.current_product;
    },
  },
});
