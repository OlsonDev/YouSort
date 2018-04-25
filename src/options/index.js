import Vue from 'vue';
import Vuetify from 'vuetify';
import root from './root.vue';

Vue.config.productionTip = false;

Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(root),
});