import React from 'react'
import ReactDOM from 'react-dom'
import App from "./container.jsx"

import "../common/responsive"

ReactDOM.render(<App />,document.getElementById('app'))

if (module.hot) {
    module.hot.accept()
}
