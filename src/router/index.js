import Vue from 'vue';
import VueRouter from 'vue-router';
import { abpmRouter, routers } from './routers';

Vue.use(VueRouter);

const RouterConfig = {
  routes: routers
};

export const router = new VueRouter(RouterConfig);
