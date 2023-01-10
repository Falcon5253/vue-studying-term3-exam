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
    participantsData: {},
    participantTemplate: {
      "id": "id",
      "about": "О",
      "alt": "Картина",
      "email": "email",
      "username": "username",
      "image": "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
      "profile": {
        "name": "name",
        "description": "text",
        "picture": "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
      },
      "createdAt": "2020-10-17T01:53:20.342Z",
      "updatedAt": "2020-10-18T01:53:20.342Z"
    },
    userData: [],
    loading: false,
  },
  mutations: {
    getData (state) {
      axios.get('./main.json')
      .then(res => state.participantsData = res.data)
      .catch(err => console.log(err));
    },
    sendUserData (state, data) {
      state.loading = true;
      const json = JSON.stringify(data);
      axios.post('http://httpbin.org/post', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        state.userData.push(res.data.data);
        state.loading = false;
      });
    },
  }
})


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
