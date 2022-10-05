import React from 'react'

import { Context } from '../../context/app-context'
import NewTaskForm from '../NewTaskForm/new-task-form'
import TaskList from '../TaskList/task-list'
import Footer from '../Footer/footer'

import './app.css'

function App() {
  return (
    <Context>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList />
          <Footer />
        </section>
      </section>
    </Context>
  )
}

export default App
