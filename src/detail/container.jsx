import { wrapper, configureStore } from 'redux-container'
import detailReducer from './reducer'
import App from './app.jsx'

const store = configureStore(detailReducer)

export default wrapper(store)(App)
