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
import searchPage from "@/components/searchPage"
import profilePage from "@/components/profilePage"



// Router
const routes = [
  { path: '/', component: mainPage },
  { path: '/participant/:id', component: participantPage },
  { path: '/search', component: searchPage },
  { path: '/profile', component: profilePage}
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
  getters: {
    participantsData (state) {
      return state.participantsData;
    },
    participantTemplate (state) {
      return state.participantTemplate;
    },
    userData(state) {
      return state.userData;
    },
    loading(state) {
      return state.loading
    }
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
      })
      .finally( () => {
        state.loading = false;
      })
    },
    sendComment (state, data) {
      state.loading = true;
      const json = JSON.stringify(data);
      axios.post('http://httpbin.org/post', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        let data = JSON.parse(res.data.data);
        let participants = state.participantsData;
        let participant = participants.find((el) => {
          return el.id == data.reviewForId;
        });
        let index = participants.indexOf(participant);
        state.participantsData[index].comments.splice(0, 0, {
          id: data.name + Math.random(),
          text: data.text,
          username: data.name,
          picture: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
        });
      })
      .finally( () => {
        state.loading = false;
      })
    },
  },
  actions: {
    getData (context, data) {
      context.commit('getData', data);
    },
    sendComment(context, data) {
      context.commit('sendComment', data);
    },
    sendUserData(context, data) {
      context.commit('sendUserData', data);
    }
  },
})


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
