// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { router } from './router/index';
import { Button } from 'iview';
import store from './store';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.config.debug = true;

// global import
// Vue.use(iView);
// when we need certain component only
Vue.component('Button', Button);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
