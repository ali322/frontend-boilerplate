import Vuex from "vuex"
import Vue from "vue"
import index from "./module"

Vue.use(Vuex)

const modules = {
  index
}

const store = new Vuex.Store({
  state: {},
  modules
})

export default store
