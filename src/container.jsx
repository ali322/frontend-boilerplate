import { wrapper, configureStore } from 'redux-container'
import rootReducer from './reducer'
import Routes from './routes.jsx'

const store = configureStore(rootReducer, { eventReducer: { events: [], repo: '' } })
if (module.hot) {
    module.hot.accept('./reducer', () => {
        const nextReducer = require('./reducer')
        store.replaceReducer(nextReducer)
    })
}

export default wrapper(store)(Routes)
