import moxios from 'moxios'
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import * as actions from '@/index/module/action'
import * as constants from '@/index/module/constant'

describe('index action', () => {
  let mockStore
  beforeEach(() => {
    moxios.install()
    mockStore = configureStore([thunkMiddleware])
  })
  afterEach(() => {
    moxios.uninstall()
  })

  test('should RESPONSE_EVENTS when fetched', () => {
    let ret = {
      status: 'ok',
      data: []
    }
    moxios.stubRequest('/mock/events', {
      status: 200,
      response: ret
    })
    let initialState = {
      eventReducer: { events: [] }
    }
    const store = mockStore(initialState)
    let expectedActions = [
      { type: constants.REQUEST_EVENTS },
      { type: constants.RESPONSE_EVENTS, payload: ret.data }
    ]

    return store.dispatch(actions.fetchEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
