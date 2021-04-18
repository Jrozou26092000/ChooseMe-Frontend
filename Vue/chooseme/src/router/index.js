import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signin.vue"),
  },
  {
    path: "/home_logged",
    name: "Home_logged",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home_logged.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
