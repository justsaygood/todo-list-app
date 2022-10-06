import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export function Context(props) {
  const createTask = (description, minutes, seconds) => {
    const id = Date.now() + Math.floor(Math.random() * 10000)
    const trimDescription = description.replace(/ +/g, ' ').trim()
    let minValueNumber = +minutes
    let secValueNumber = +seconds

    if (secValueNumber > 60) {
      minValueNumber += Math.trunc(secValueNumber / 60)
      secValueNumber -= Math.trunc(secValueNumber / 60) * 60
    }
    return {
      id,
      description: trimDescription,
      created: new Date(),
      completed: false,
      edited: false,
      minutes: minValueNumber,
      seconds: secValueNumber,
    }
  }

  const [todoData, setTodoData] = useState([
    createTask('Learn React', 1, 0),
    createTask('Create App', 20, 0),
    createTask('Drink coffee', 5, 0),
  ])

  const [filterData, setFilterData] = useState('all')

  const addTask = (description, minutes, seconds) => {
    const newItem = createTask(description, Number(minutes), Number(seconds))
    setTodoData(() => [...todoData, newItem])
  }

  const completeTask = (id) => {
    setTodoData(() =>
      todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            completed: !el.completed,
          }
        }
        return el
      })
    )
  }

  const editTask = (id) => {
    setTodoData(() =>
      todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            edited: true,
          }
        }
        return el
      })
    )
  }

  const deleteTask = (id) => {
    setTodoData(() => todoData.filter((el) => el.id !== id))
  }
  const changeDescription = (id, description) => {
    setTodoData(() =>
      todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            description,
            edited: false,
            completed: false,
          }
        }
        return el
      })
    )
  }

  const clearCompleted = () => {
    setTodoData(() => todoData.filter((el) => el.completed === false))
  }

  const setFilter = (e) => {
    setFilterData(e.target.innerText.toLowerCase())
  }

  const tasksLeftCount = todoData.filter((el) => !el.completed).length

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const valueContextApp = {
    todoData,
    filterData,
    addTask,
    changeDescription,
    editTask,
    completeTask,
    deleteTask,
    clearCompleted,
    setFilter,
    tasksLeftCount,
  }

  const { children } = props

  return <AppContext.Provider value={valueContextApp}>{children}</AppContext.Provider>
}
