import React from 'react'
import { render } from 'react-dom'
import { match, browserHistory, Router } from 'react-router'
import app from './app.jsx'
import routes from './routes.jsx'

const App = app()(Router)
if (module.hot) {
  module.hot.accept()
}
match({ history: browserHistory, routes }, (err, redirectLocation, renderProps) => {
    render(<App {...renderProps} history={browserHistory} />, document.getElementById('app'))
})
