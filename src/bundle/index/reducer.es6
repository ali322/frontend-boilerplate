import { combineReducers } from 'redux'
import eventReducer from './module/reducer.es6'
import userReducer from '../user/module/reducer.es6'

const rootReducer = combineReducers({
    eventReducer,
    userReducer
})

export default rootReducer
