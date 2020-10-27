import axios from 'axios'
import * as constants from './constant'

export function requestDetail ({ commit }) {
  commit(constants.REQUEST_DETAIL)
}

export function responseDetail ({ commit }, payload) {
  commit(constants.RESPONSE_DETAIL, payload)
}

export function fetchDetail({ dispatch, commit }, id) {
  dispatch('requestDetail')
  const url = `//localhost:5000/mock/event/${id}` // used by subapp
  // const url = '/mock/event/${id}'
  return axios.get(url).then(ret => {
    ret = ret.data
    dispatch('responseDetail', ret.data)
  })
}
