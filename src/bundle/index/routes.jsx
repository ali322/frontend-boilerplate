import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Index from './module/app.jsx'
import User from '../user/module/app.jsx'

const routes = (
    <Route path="/page/index">
        <IndexRoute component={Index} />
        <Route path="/user/:user" component={User} />
    </Route>
)

export default routes
