import React, { useContext } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { AppContext } from '../../context/app-context'
import Task from '../Task/task'
import EditTask from '../EditTask/edit-task'

import './task-list.css'

function TaskList() {
  const { todoData, filterData, changeDescription } = useContext(AppContext)

  const taskListElement = (id, classNames, description, creationTime, checked, minutes, seconds, edited) => (
    <li key={id} className={classNames}>
      <Task
        id={id}
        description={description}
        checked={checked}
        minutes={minutes}
        seconds={seconds}
        creationTime={creationTime}
      />
      {edited ? <EditTask id={id} description={description} changeDescription={changeDescription} /> : null}
    </li>
  )

  const elements = todoData.map((item) => {
    const { id, minutes, seconds, description, edited } = item
    const creationTime = formatDistanceToNow(new Date(item.created))

    let classNames = 'active'
    let checked = false

    if (item.completed) {
      classNames = 'completed'
      checked = true
    }

    if (item.edited) {
      classNames = 'editing'
    }

    if (filterData === 'all') {
      return taskListElement(item.id, classNames, description, creationTime, checked, minutes, seconds, edited)
    }

    if (filterData === 'active' && item.completed) {
      classNames = 'completed--hidden'
      console.log('if filData', filterData, 'class is', classNames)
      return taskListElement(id, classNames, description, creationTime, checked, minutes, seconds, edited)
    }

    if (filterData === 'completed' && !item.completed) {
      classNames = 'active--hidden'
      console.log('if filData', filterData, 'class is', classNames)
      return taskListElement(id, classNames, description, creationTime, checked, minutes, seconds, edited)
    }
    return taskListElement(id, classNames, description, creationTime, checked, minutes, seconds, edited)
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
