import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import autobind from 'autobind-decorator'
import { connected } from 'redux-container'
import * as actions from './action'

export class Index extends Component {
  static propTypes = {
    actions: PropTypes.object,
    repo: PropTypes.string,
    events: PropTypes.array
  }
  componentDidMount () {
    const { fetchEvents } = this.props.actions
    fetchEvents()
  }
  @autobind
  handleRefresh (e) {
    e && e.preventDefault()
    const { fetchEvents } = this.props.actions
    fetchEvents()
  }
  render () {
    let { events } = this.props
    events = events || []
    return (
      <div className="container">
        <div className="header">
          Github Events{' '}
          <button
            className="refresh-btn refresh-icon"
            onClick={this.handleRefresh}
          />
        </div>
        <div className="content">
          {events.map(event => (
            <div className="event" key={event.id}>
              <Link to={`/event/${event.id}`}>
                <div className="event-title">
                  <img src={event.avatar} alt="" />
                  <span>
                    <p>{event.name}</p>
                    <p>{event.created_at}</p>
                  </span>
                  <i className="fa fa-caret-right" />
                </div>
                <p>
                  {event.type} In <b>{event.repo}1</b>
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default connected(state => state.eventReducer, actions)(Index)
