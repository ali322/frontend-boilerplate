import React from 'react'
import ReactDOM from 'react-dom'

import User from "./module/container.jsx"

if (module.hot) {
    module.hot.accept()
}

function bootstrap() {
    ReactDOM.render(<User />, document.getElementById('app'));
}

if (typeof window.addEventListener) {
    window.addEventListener("DOMContentLoaded", bootstrap);
} else {
    window.attachEvent('onload', bootstrap);
}
