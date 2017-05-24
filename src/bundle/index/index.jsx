import React from 'react'
import { render } from 'react-dom'
import App from './container.jsx'

import "../common/responsive"

if (module.hot) {
    module.hot.accept()
}

render(<App />,document.getElementById('app'))
