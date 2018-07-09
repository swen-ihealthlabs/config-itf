import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count: 0
};

const store = new Vuex.Store({
  state
});

store.registerModule('interlude', {
  namespaced: true,
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus(status, payload) {
      state.isLoading = payload.isLoading;
      console.log(`state has changed to ${state.isLoading}`);
    }
  }
});

export default store;
