import React, { Component } from 'react'
import { connected } from 'redux-container'
import * as actions from './action.es6'

export class User extends Component {
    static propTypes = {
        actions: React.PropTypes.object,
        params: React.PropTypes.object,
        user: React.PropTypes.object,
        history: React.PropTypes.object
    }
    componentDidMount() {
        const { fetchUser } = this.props.actions
        let user = 'yetti'
        fetchUser({ user })
    }
    render() {
        const { user } = this.props
        if (!user) {
            return null
        }
        return (
            <div className="common-container">
                <div className="panel panel-default">
                <div className="panel-heading common-header"><button className="back-button" onClick={history.back}>&lt;</button>{user.id}</div>
                <div className="panel-body">
                    <div className="user-title">
                    <img src={user.avatar_url} alt="" />
                    <span>
                    <p>{user.login}</p>
                    <p>{user.created_at}</p>
                    </span>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default connected(actions,state=>state.userReducer)(User)
