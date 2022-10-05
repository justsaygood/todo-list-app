import React, { useState, useContext } from 'react'

import { AppContext } from '../../context/app-context'
import './new-task-form.css'

function NewTaskForm() {
  const { addTask } = useContext(AppContext)
  const [description, setDescription] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const handleDescription = (event) => {
    setDescription(event.target.value)
  }

  const handleMinutes = (event) => {
    setMinutes(event.target.value)
  }

  const handleSeconds = (event) => {
    setSeconds(event.target.value)
  }

  const onSubmitForm = (event) => {
    if (event.keyCode === 13) {
      const trimDescription = description.replace(/ +/g, ' ').trim()
      event.preventDefault()

      if (trimDescription === '') {
        alert('Please, set the task')
      } else {
        addTask(trimDescription, minutes, seconds)
      }

      setDescription('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form className="new-todo-form" onKeyDown={onSubmitForm}>
      <input
        className="new-todo"
        type="text"
        name="description"
        required
        placeholder="What needs to be done?"
        onChange={handleDescription}
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
        onChange={handleMinutes}
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
        onChange={handleSeconds}
      />
      <input type="submit" style={{ display: 'none' }} />
    </form>
  )
}
export default NewTaskForm
