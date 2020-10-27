import axios from 'axios'
import * as constants from './constant'

export function requestEvents ({ commit }) {
  commit(constants.REQUEST_EVENTS)
}

export function responseEvents ({ commit }, payload) {
  commit(constants.RESPONSE_EVENTS, payload)
}

export function fetchEvents ({ commit, dispatch }, param) {
  dispatch('requestEvents')
  const url = '//localhost:5000/mock/events' // used by subapp
  // const url = '/mock/events'
  axios
    .get(url)
    .then(ret => {
      ret = ret.data
      dispatch('responseEvents', ret.data)
    })
    .catch(err => console.log('err', err))
}
