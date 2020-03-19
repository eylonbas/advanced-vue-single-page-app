import Vue from 'vue';
import Vuex from 'vuex';
import VTooltip from 'v-tooltip';

import App from './App.vue';

Vue.use(VTooltip);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    pages: [
      {
        displayName: "Show all users",
        pageRef: "users-list"
      },
      {
        displayName: "Add a new user",
        pageRef: "new-user-form"
      }
    ],
    currentPage: 'users-list'
  },
  getters: {
    highestUserId: (state) => {
      let maxId;
      state.users.map((user) => {
        if (!maxId || user.id > maxId) {
          maxId=user.id;
        }
      });
      return maxId;      
    }
  },
  mutations: {
    getUsersFromApi(state, users) {
      state.users = users;
    },
    addUser(state, user) {
      state.users.push(user);      
    },
    removeUser(state, userToRemoveId) {
      state.users = state.users.filter(user => user.id !== userToRemoveId);
    },
    updatePage(state, pageRef) {
      state.currentPage = pageRef;
    }    
  },
  actions: {
    getUsersFromApi({ commit }) {
      fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => (commit('getUsersFromApi', data)));
    },    
    addUser({ commit }, user) {      
      commit('addUser', user);
    },
    removeUser({ commit }, userId) {
      commit('removeUser', userId);
    },
    updatePage({commit}, pageRef) {
      commit('updatePage', pageRef);
    }
  }
});

new Vue({  
  el: '#app',
  store,
  render: h => h(App),
  beforeCreate() {
    store.dispatch('getUsersFromApi');
  }
})
