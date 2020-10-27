import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const modules = {
}

export default () => {
  const store = new Vuex.Store({
    state: {},
    modules
  })
  return store
}
