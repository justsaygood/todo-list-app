import React from 'react'
import PropTypes from 'prop-types'

import './task.css'

export default class Task extends React.Component {
  state = {
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment,react/no-unused-state
    id: this.props.id,
  }

  static propTypes = {
    checked: PropTypes.bool,
    onToggleDone: PropTypes.func,
    description: PropTypes.string,
    creationTime: PropTypes.string,
    onEditClick: PropTypes.func,
    onCloseClick: PropTypes.func,
  }

  static defaultProps = {
    description: 'Please, set the task',
    checked: false,
    onToggleDone: () => {},
    creationTime: () => {},
    onEditClick: () => {},
    onCloseClick: () => {},
  }

  render() {
    const { description, onToggleDone, onCloseClick, onEditClick, checked, creationTime } = this.props

    return (
      <div className="view">
        <input className="toggle" type="checkbox" readOnly onClick={onToggleDone} checked={checked} />
        <div className="label">
          <span className="description">{description}</span>
          <span className="created">created {creationTime} ago</span>
        </div>
        <button className="icon icon-edit" type="button" aria-label="Icon input edit" onClick={onEditClick} />
        <button className="icon icon-destroy" type="button" aria-label="Icon input deleted" onClick={onCloseClick} />
      </div>
    )
  }
}
