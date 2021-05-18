import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)
Vue.config.productionTip = false
Vue.use(VueRouter)
import router from '@/routes/router'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
