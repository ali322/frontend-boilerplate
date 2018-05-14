import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Index from './index/app.jsx'
import Detail from './detail/app.jsx'

export default () => (
  <Router>
    <Switch>
      <Route component={Index} path="/" exact />
      <Route component={Detail} path="/event/:id" />
    </Switch>
  </Router>
)
