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
    products: [], // Lista de los productos que fueron buscados.
    product_reviews: [], // Lista de las reviews de un producto consultado.
    reviewers: [], // Lista de reviewers consultados.
    reviews_reviewer: [], //Lista de reviews de un reviewer.

    page_reviews_reviewer: 0, //Paginación de los reviews de un reviewer
    logged: false, // Indicador hay un usuario logueado o no.
    user: "Usuario", // Nombre del usuario actual.
    current_product: "", // Producto actual que se esta consultando. 
    product_search: "", // Nombre de la busqueda de la busqueda de productos.
    page_product_reviews: 0, // Paginado reviews de los productos.
    page_reviewers: 0, // Paginado de los reviewers.
    top5: false, // Indicador si se se está consultando el top 5 o no.
    current_reviewer: "", // Reviewer actual que está siendo consultado.
    reviewer_search: ""
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
      state.product_reviews.push(...reviews);
    },
    resetProduct_reviews(state, new_reviews) {
      state.product_reviews = new_reviews;
    },
    resetPage_product_reviews(state) {
      state.page_product_reviews = 0;
    },
    incrementPage_product_reviews(state) {
      state.page_product_reviews += 1;
    },
    resetReviewersList(state){
      state.reviewers = [];
    },
    addReviewersList(state, reviewers){
      state.reviewers.push(...reviewers);
    },
    resetPage_reviewers(state) {
      state.page_reviewers = 0;
    },
    incrementPage_reviewers(state) {
      state.page_reviewers += 10;
    },
    setTop5(state, top5){
      state.top5 = top5;
    },
    setCurrent_reviewer(state, reviewer){
      state.current_reviewer = reviewer;
    },
    setReviewer_search(state, reviewer){
      state.reviewer_search = reviewer;
    },

    addReviewsReviewer(state, reviews){
      state.reviews_reviewer.push(...reviews);
    },

    resetReviewsReviewer(state){
      state.reviews_reviewer = [];
    },

    resetPage_reviews_reviewer(state){
      state.page_reviews_reviewer = 0;
    },

    incrementPage_reviews_reviewer(state){
      state.page_reviews_reviewer += 10;
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
    getPage_reviews_reviewer(state) {
      return state.page_reviews_reviewer;
    }
  },
});
