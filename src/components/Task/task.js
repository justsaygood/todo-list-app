import React from 'react'
import PropTypes from 'prop-types'

import './task.css'

export default class Task extends React.Component {
  state = {
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment,react/no-unused-state
    id: this.props.id,
    // eslint-disable-next-line react/no-unused-state
    isCounting: false,
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    min: this.props.minutes,
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    sec: this.props.seconds,
    time: '',
  }

  static propTypes = {
    checked: PropTypes.bool,
    onToggleDone: PropTypes.func,
    description: PropTypes.string.isRequired,
    creationTime: PropTypes.string,
    onEditClick: PropTypes.func,
    onCloseClick: PropTypes.func,
  }

  static defaultProps = {
    checked: false,
    onToggleDone: () => {},
    creationTime: () => {},
    onEditClick: () => {},
    onCloseClick: () => {},
  }

  componentWillUnmount() {
    clearInterval(this.counterID)
  }

  minReduce = () => {
    const { min, sec } = this.state
    if (min === 0 && sec === 0) {
      this.setState({
        min: ' ',
        sec: ' ',
        time: 'time is up',
      })
    } else {
      this.setState({
        min: min - 1,
        sec: 59,
      })
    }
  }

  secReduce = () => {
    const { min, sec, isCounting } = this.state
    const { onToggleDone } = this.props

    if (min === 0 && sec === 0 && isCounting === true) {
      onToggleDone()
      clearInterval(this.counterID)
      this.setState({
        isCounting: false,
      })
    }
    if (sec > 0) {
      this.setState({
        sec: sec - 1,
        isCounting: true,
      })
    } else {
      this.minReduce()
    }
  }

  stopTimer = (event) => {
    event.stopPropagation()
    this.setState({ isCounting: false })
    clearInterval(this.counterID)
  }

  startTimer = (event) => {
    event.stopPropagation()
    this.setState({ isCounting: true })
    this.counterID = setInterval(() => {
      this.secReduce()
    }, 1000)
  }

  render() {
    const { description, onToggleDone, onCloseClick, onEditClick, checked, creationTime } = this.props
    const { isCounting, min, sec, time } = this.state
    const timerButtons = !isCounting ? (
      /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
      <button className="icon icon-play" type="button" aria-label="Icon play" onClick={this.startTimer} />
    ) : (
      /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
      <button className="icon icon-pause" type="button" aria-label="Icon pause" onClick={this.stopTimer} />
    )

    return (
      <div className="view">
        <input className="toggle" type="checkbox" readOnly onClick={onToggleDone} checked={checked} />
        <div className="label">
          <span className="description">{description}</span>
          <span className="timer">
            {timerButtons}
            <span className="timer__clock">
              {min}:{sec} {time}
            </span>
          </span>
          <span className="created">created {creationTime} ago</span>
        </div>
        <button className="icon icon-edit" type="button" aria-label="Icon input edit" onClick={onEditClick} />
        <button className="icon icon-destroy" type="button" aria-label="Icon input deleted" onClick={onCloseClick} />
      </div>
    )
  }
}
