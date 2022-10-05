import React, { useContext } from 'react'

import { AppContext } from '../../context/app-context'
import TasksFilter from '../TasksFilter/task-filter'

import './footer.css'

function Footer() {
  const { tasksLeftCount, clearCompleted, setFilter } = useContext(AppContext)
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeftCount} items left</span>
      <TasksFilter onFilterChange={setFilter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
