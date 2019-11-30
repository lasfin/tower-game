import Vue from 'vue'
import App from './App.vue'
import store from './store'

if (process.env.NODE_ENV === 'production') {
  Vue.config.devtools = false;
  Vue.config.productionTip = false;
}

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
