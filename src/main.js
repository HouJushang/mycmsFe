import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './sass/main.sass'
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueRouter)
import routes from './routes'
import App from './App.vue'

const router = new VueRouter({
  routes
})

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
export {
  app,
  router
}

