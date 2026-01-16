import './Vistera/VistraJS.js'

let store = $.store.create({
  state: {
    user: null,
    isLoading: false,
    error: null
  },
  
  actions: {
    setUser(state, userData) {
      state.user = userData;
    },
    setLoading(state, loading) {
      state.isLoading = loading;
    },
    setError(state, error) {
      state.error = error;
    }
  },
  
  getters: {
    isLoggedIn(state) {
      return state.user !== null;
    },
    userName(state) {
      return state.user?.name || 'Guest';
    }
  }
});
export default store;
