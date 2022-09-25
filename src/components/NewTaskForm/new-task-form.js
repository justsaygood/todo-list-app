import React from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  state = {
    description: '',
    minutes: '',
    seconds: '',
  }

  static defaultProps = {
    addTask: () => {},
  }

  static propTypes = {
    addTask: PropTypes.func,
  }

  onSubmitForm = (event) => {
    const { addTask } = this.props
    const { description, minutes, seconds } = this.state

    if (event.keyCode === 13) {
      const trimDescription = description.replace(/ +/g, ' ').trim()
      event.preventDefault()

      if (trimDescription === '') {
        alert('Please, set the task')
      } else {
        addTask(trimDescription, minutes, seconds)
      }

      this.setState({
        description: '',
        minutes: '',
        seconds: '',
      })
    }
  }

  onDescriptionChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { description, minutes, seconds } = this.state

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <form className="new-todo-form" onKeyDown={this.onSubmitForm}>
        <input
          className="new-todo"
          type="text"
          name="description"
          required
          placeholder="What needs to be done?"
          onChange={this.onDescriptionChange}
          value={description}
        />
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input
          className="new-todo-timer"
          placeholder="Min"
          name="minutes"
          type="number"
          min="0"
          max="59"
          required
          value={minutes}
          onChange={this.onDescriptionChange}
        />
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input
          className="new-todo-timer"
          placeholder="Sec"
          name="seconds"
          type="number"
          min="0"
          max="60"
          required
          value={seconds}
          onChange={this.onDescriptionChange}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    )
  }
}
