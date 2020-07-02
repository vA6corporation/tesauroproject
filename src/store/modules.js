export const modules = {
  namespaced: true,
  state: {
    currentModule: { name: 'dashboard' },
    modules: [
      { label: 'Dashboard', name: 'dashboard', path: '/dashboard', icon: 'monitor' },
      { label: 'Usuarios', name: 'users', path: '/users', icon: 'users' },
      { label: 'Videos', name: 'videos', path: '/videos', icon: 'film' },
    ]
  },
  mutations: {
    SET_CURRENT_MODULE(state, data) {
      state.currentModule = data;
    }
  },
  actions: {
    fetchCurrentModule({ commit }, currentModule) {
      commit("SET_CURRENT_MODULE", currentModule);
    }
  },
  getters: {
    modules(state) {
      return state.modules;
    },
    currentModule(state) {
      return state.currentModule;
    }
  }
}
