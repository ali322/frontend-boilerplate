import Vuex from 'vuex'
import Vue from 'vue'
import index from './index/store'
import detail from './detail/store'

Vue.use(Vuex)

const modules = {
  index,
  detail
}


export default () => {
  const store = new Vuex.Store({
    state: {},
    modules
  })
  return store
}
