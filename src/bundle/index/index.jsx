import React from 'react'
import ReactDOM from 'react-dom'

import Index from "./module/container.jsx"

if (module.hot) {
    module.hot.accept()
}

function bootstrap() {
    ReactDOM.render(<Index />, document.getElementById('app'));
}

if (typeof window.addEventListener) {
    window.addEventListener("DOMContentLoaded", bootstrap);
} else {
    window.attachEvent('onload', bootstrap);
}