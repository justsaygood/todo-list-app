import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

import Task from '../Task/task'
import EditTask from '../EditTask/edit-task'

import './task-list.css'

export default function TaskList({
  taskData,
  onToggleDone,
  onEditClick,
  onCloseClick,
  onChangeDescription,
  taskFilter,
}) {
  const elements = taskData.map((item) => {
    const { id, minutes, seconds } = item
    const creationTime = formatDistanceToNow(new Date(item.created))

    let classNames = 'active'
    let checked = false

    if (item.completed) {
      classNames = 'completed'
      checked = true
    }

    if (item.edited) {
      classNames = ' editing'
    }

    if (taskFilter === 'all') {
      return (
        <li key={id} className={classNames}>
          <Task
            description={item.description}
            checked={checked}
            minutes={minutes}
            seconds={seconds}
            creationTime={creationTime}
            onToggleDone={() => onToggleDone(id)}
            onEditClick={() => onEditClick(id)}
            onCloseClick={() => onCloseClick(id)}
          />
          {item.edited ? (
            <EditTask id={id} description={item.description} onChangeDescription={onChangeDescription} />
          ) : null}
        </li>
      )
    }

    if (classNames === taskFilter || classNames === 'editing') {
      return (
        <li key={id} className={classNames}>
          <Task
            description={item.description}
            className={classNames}
            creationTime={creationTime}
            checked={checked}
            minutes={minutes}
            seconds={seconds}
            onToggleDone={() => onToggleDone(id)}
            onEditClick={() => onEditClick(id)}
            onCloseClick={() => onCloseClick(id)}
          />
          {item.edited ? (
            <EditTask id={id} description={item.description} onChangeDescription={onChangeDescription} />
          ) : null}
        </li>
      )
    }
    return null
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  onToggleDone: () => {},
  onCloseClick: () => {},
  onEditClick: () => {},
  onChangeDescription: () => {},
}

TaskList.propTypes = {
  onToggleDone: PropTypes.func,
  onCloseClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onChangeDescription: PropTypes.func,
}
