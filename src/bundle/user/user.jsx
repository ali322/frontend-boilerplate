import React from 'react'
import ReactDOM from 'react-dom'
import User from "./module/container.jsx"

ReactDOM.render(<User />,document.getElementById('app'))

if (module.hot) {
    module.hot.accept()
}


