import axios from 'axios'

function fetchTodosRequest () {
  return {
    type: 'FETCH_TODOS_REQUEST'
  }
}

function fetchTodosSuccess (body) {
  return {
    type: 'FETCH_TODOS_SUCCESS',
    body
  }
}

function fetchTodosFailure (ex) {
  return {
    type: 'FETCH_TODOS_FAILURE',
    ex
  }
}

export function fetchTodos () {
  return dispatch => {
    dispatch(fetchTodosRequest())
    return axios('http://example.com/todos')
      .then(res => res.json())
      .then(json => dispatch(fetchTodosSuccess(json.body)))
      .catch(ex => dispatch(fetchTodosFailure(ex)))
  }
}
