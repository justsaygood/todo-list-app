import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm/new-task-form'
import TaskList from '../TaskList/task-list'
import Footer from '../Footer/footer'

import './app.css'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [
      this.createTask('Learn React', 1, 1, 0),
      this.createTask('Create App', 2, 20, 0),
      this.createTask('Drink coffee', 3, 5, 0),
    ],
    filterData: 'all',
  }

  static defaultProps = {
    todoData: [
      {
        created: new Date(),
        completed: false,
        edited: false,
        minutes: 30,
        seconds: 30,
      },
    ],
    filterData: 'all',
  }

  completeTask = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            completed: !el.completed,
          }
        }
        return el
      })
      return {
        todoData: newTodoData,
      }
    })
  }

  editTask = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            edited: true,
          }
        }
        return el
      })
      return {
        todoData: newTodoData,
      }
    })
  }

  changeDescription = (id, description) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            description,
            completed: false,
            edited: false,
          }
        }
        return el
      })
      return {
        todoData: newTodoData,
      }
    })
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((el) => el.id !== id)
      return {
        todoData: newTodoData,
      }
    })
  }

  addTask = (description, minutes, seconds) => {
    const newItem = this.createTask(description, this.maxId++, Number(minutes), Number(seconds))
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newItem]
      return {
        todoData: newTodoData,
      }
    })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((el) => el.completed === false)
      return {
        todoData: newTodoData,
      }
    })
  }

  onFilterChange = (event) => {
    this.setState({
      filterData: event.target.innerText.toLowerCase(),
    })
  }

  createTask(description, id, minutes, seconds) {
    let minValueNumber = +minutes
    let secValueNumber = +seconds
    if (secValueNumber > 60) {
      minValueNumber += Math.trunc(secValueNumber / 60)
      secValueNumber -= Math.trunc(secValueNumber / 60) * 60
    }

    return {
      id,
      description,
      created: new Date(),
      completed: false,
      edited: false,
      minutes: minValueNumber,
      seconds: secValueNumber,
    }
  }

  render() {
    const { todoData, filterData } = this.state
    const tasksLeftCount = todoData.filter((el) => !el.completed).length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
        </header>
        <NewTaskForm addTask={this.addTask} />
        <TaskList
          taskData={todoData}
          onToggleDone={this.completeTask}
          onEditClick={this.editTask}
          onCloseClick={this.deleteTask}
          onChangeDescription={this.changeDescription}
          taskFilter={filterData}
        />
        <Footer
          tasksLeftCount={tasksLeftCount}
          clearCompleted={this.clearCompleted}
          onFilterChange={this.onFilterChange}
        />
      </section>
    )
  }
}
