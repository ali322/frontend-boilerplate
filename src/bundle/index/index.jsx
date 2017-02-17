import React from 'react'
import { render } from 'react-dom'
import { match, hashHistory, Router } from 'react-router'
import app from './app.jsx'
import routes from './routes.jsx'

const App = app()(Router)

match({ history: hashHistory, routes }, (err, redirectLocation, renderProps) => {
    render(<App {...renderProps} history={hashHistory} />, document.getElementById('app'))
})
