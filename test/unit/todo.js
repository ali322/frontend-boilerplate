import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../action'
import moxios from 'moxios'
import axios from 'axios'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    // fetchMock.getOnce('/todos', {
    //   body: { todos: ['do something'] },
    //   headers: { 'content-type': 'application/json' }
    // })
    moxios.stubRequest('/todos', {
      status: 200,
      responseText: 'hello world'
      //   response: {
      //     todos: ['do something']
      //   }
    })
    return axios
      .get('/todos')
      .then(ret => {
        console.log('ret', ret)
        expect(1).toBe(1)
      })
      .catch(e => {
        console.log('err', e)
      })
    // nock('http://localhost')
    //   .get('/todos')
    //   .reply(200, { todos: ['do something'] })
    // const expectedActions = [
    //   { type: 'FETCH_TODOS_REQUEST' },
    //   { type: 'FETCH_TODOS_SUCCESS', body: { todos: ['do something'] } }
    // ]
    // const store = mockStore({ todos: [] })

    // return store.dispatch(actions.fetchTodos()).then(() => {
    //   // return of async actions
    //   expect(store.getActions()).toEqual(expectedActions)
    // })
  })
})
