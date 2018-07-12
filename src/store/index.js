import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count: 0
};

const actions = {
  getConfigAsync({ commit, state }) {}
  // async call to get json

  // assign json to component

  // commit mutations of loading status
};

const store = new Vuex.Store({
  state,
  actions
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
