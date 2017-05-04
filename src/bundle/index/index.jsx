import React from 'react'
import ReactDOM from 'react-dom'
import Index from "./module/container.jsx"

ReactDOM.render(<Index />,document.getElementById('app'))

if (module.hot) {
    module.hot.accept()
}
