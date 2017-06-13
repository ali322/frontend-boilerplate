import { wrapper, configureStore } from 'redux-container'
import eventReducer from './module/reducer'
import App from './module/app.jsx'

const store = configureStore(eventReducer, { events: [], repo: '' })
if (module.hot) {
    module.hot.accept('./module/reducer', () => {
        const nextReducer = require('./module/reducer')
        store.replaceReducer(nextReducer)
    })
}

export default wrapper(store)(App)
