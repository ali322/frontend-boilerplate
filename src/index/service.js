import axios from 'axios'

export function events () {
  return axios.get('/mock/events').then(ret => ret.data.data)
}
