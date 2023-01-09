import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false

//  Components
import mainPage from "@/components/mainPage"
import participantPage from "@/components/participantPage"


// Router
const routes = [
  { path: '/', component: mainPage },
  { path: '/:id', component: participantPage },
]

const router = new VueRouter({
  routes,
})


// Vuex
const store = new Vuex.Store({
  state: {
    participantsData: {}
  },
  mutations: {
    getData (state) {
      axios.get('./main.json')
      .then(res => state.participantsData = res.data)
      .catch(err => console.log(err))
    },
  }
})


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
