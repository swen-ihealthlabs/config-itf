import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import { abpmRouter, routers } from './routers';

Vue.use(VueRouter);

const RouterConfig = {
  routes: routers
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  store.commit('interlude/updateLoadingStatus', { isLoading: true });
  next();
});

// router.afterEach(to => {
//   store.commit('interlude/updateLoadingStatus', { isLoading: false });
// });

export default router;
