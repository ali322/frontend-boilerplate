import { wrapper, configureStore } from 'redux-container'
import eventReducer from './reducer'
import App from './app.jsx'

const store = configureStore(eventReducer, { events: [], repo: '' })

export default wrapper(store)(App)
