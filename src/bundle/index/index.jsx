import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Index from "./module/container.jsx"

const render = Component => {
    ReactDOM.render((<AppContainer><Component /></AppContainer>),
        document.getElementById('app'))
}
render(Index)

if (module.hot) {
    module.hot.accept('./module/container.jsx', () => render(Index))
}
