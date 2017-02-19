import { wrapper, configureStore } from 'redux-container'
import rootReducer from './reducer.es6'

export default () => {
    const store = configureStore(rootReducer, { eventReducer: { events: [], repo: '' } })
    if (module.hot) {
        module.hot.accept('./reducer.es6', () => {
            const nextReducer = require('./reducer.es6')
            store.replaceReducer(nextReducer)
        })
    }
    return originalComponent => {
        return wrapper(store)(originalComponent)
    }
}
