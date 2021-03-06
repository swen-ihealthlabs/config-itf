// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store';
import { Button, Row, Col, Table, Icon, Spin } from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.config.debug = true;

// global import
// Vue.use(iView);
// when we need certain component only
Vue.component('Button', Button);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Table', Table);
Vue.component('Spin', Spin);
Vue.component('Icon', Icon);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
