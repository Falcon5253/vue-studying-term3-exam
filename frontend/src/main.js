import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//  Components
import MainPage from "@/components/MainPage"



Vue.config.productionTip = false


const routes = [
  { path: '/', component: MainPage },
  // { path: '/about', component: About },
]

const router = new VueRouter({
  routes,
})


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
