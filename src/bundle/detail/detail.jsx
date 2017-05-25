import React from 'react'
import ReactDOM from 'react-dom'
import App from "./container.jsx"

ReactDOM.render(<App />,document.getElementById('app'))

if (module.hot) {
    module.hot.accept()
}
