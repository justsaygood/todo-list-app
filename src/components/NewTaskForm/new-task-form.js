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
        addTask('The task isn`t set', minutes, seconds)
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
          name="description"
          placeholder="What needs to be done?"
          onChange={this.onDescriptionChange}
          value={description}
        />
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input
          className="new-todo-timer"
          name="minutes"
          placeholder="Min"
          onChange={this.onDescriptionChange}
          value={minutes}
        />
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input
          className="new-todo-timer"
          name="seconds"
          placeholder="Sec"
          onChange={this.onDescriptionChange}
          value={seconds}
        />
      </form>
    )
  }
}
