import { wrapper, configureStore } from 'redux-container'
import rootReducer from './reducer'
import { hot } from 'react-hot-loader'
import App from './app.jsx'

const store = configureStore(rootReducer, {
  eventReducer: { events: [], repo: '' }
})

export default wrapper(store)(hot(module)(App))
