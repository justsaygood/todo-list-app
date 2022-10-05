import React, { useState, useContext } from 'react'

import { AppContext } from '../../context/app-context'

import './task-filter.css'

function TasksFilter() {
  const [allBtn, setAllBtn] = useState(true)
  const [activeBtn, setActiveBtn] = useState(false)
  const [completedBtn, setCompletedBtn] = useState(false)

  const { setFilter } = useContext(AppContext)

  const onClickButton = (buttonClicked) => {
    if (buttonClicked === 'all') {
      setAllBtn(true)
      setActiveBtn(false)
      setCompletedBtn(false)
    } else if (buttonClicked === 'active') {
      setAllBtn(false)
      setActiveBtn(true)
      setCompletedBtn(false)
    } else {
      setAllBtn(false)
      setActiveBtn(false)
      setCompletedBtn(true)
    }
  }
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={allBtn ? 'selected' : ''}
          onClick={(e) => {
            setFilter(e)
            onClickButton('all')
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeBtn ? 'selected' : ''}
          onClick={(e) => {
            setFilter(e)
            onClickButton('active')
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={completedBtn ? 'selected' : ''}
          onClick={(e) => {
            setFilter(e)
            onClickButton('completed')
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TasksFilter
