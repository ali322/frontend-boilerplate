import React, { Component } from 'react'
import PropTypes from 'prop-types'
import container from 'mobx-container'
import { hot } from 'react-hot-loader'
import store from './store'

export class Detail extends Component {
  static propTypes = {
    actions: PropTypes.object,
    match: PropTypes.object,
    detail: PropTypes.object,
    history: PropTypes.object
  }
  componentDidMount () {
    const { fetchDetail } = this.props.store
    const { id } = this.props.match.params
    fetchDetail({ id })
  }
  render () {
    const { history } = this.props
    const { event } = this.props.store
    if (!event) {
      return null
    }
    return (
      <div className="container">
        <div className="header header-with-btn">
          <button className="btn" onClick={history.goBack}>
            <i className="fa fa-arrow-left" />
          </button>
          {event.name}
        </div>
        <div className="content">
          <div className="detail">
            <img src={event.avatar} alt="" />
            <p>Title: {event.title}</p>
            <p>Created at: {event.created_at}</p>
            <p>{event.message}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default hot(module)(container({ store })(Detail))
