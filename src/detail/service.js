import axios from 'axios'

export function event ({ id }) {
  return axios.get(`/mock/event/${id}`).then(ret => ret.data.data)
}
