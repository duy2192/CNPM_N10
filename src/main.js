import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import VueSession from 'vue-session'
import CKEditor from 'ckeditor4-vue'
Vue.use(CKEditor)
Vue.use(VeeValidate)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueSession,{
  persist: true
}
)
import router from '@/routes/router'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
