import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Index from './index/app.jsx'
import Detail from './detail/app.jsx'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Index} exact />
      <Route path="/event/:id" component={Detail} />
    </Switch>
  </BrowserRouter>
)
