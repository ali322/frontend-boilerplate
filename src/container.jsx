import { wrapper, configureStore } from 'redux-container'
import rootReducer from './reducer'
import { hot } from 'react-hot-loader'
import Routes from './routes.jsx'

const store = configureStore(rootReducer, {
  eventReducer: { events: [], repo: '' }
})

export default wrapper(store)(Routes)
