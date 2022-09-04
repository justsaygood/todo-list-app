import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from "../NewTaskForm/new-task-form";
import TaskList from "../TaskList/task-list";
import Footer from "../Footer/footer";

import "./app.css";

export default class App extends Component {
    maxId = 100;

    state = {
        todoData: [
            this.createTask('Learn React', 1 ),
            this.createTask('Create App', 2),
            this.createTask('Drink coffee', 3),
        ]
    };


    static propTypes = {
        todoData: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        todoData: [
            {
                completed: false,
                edited: false,
            },
        ]
    };

    createTask(description, id) {
        const trimDescription = description.replace(/ +/g, ' ').trim();

        return {
            id,
            description: trimDescription,
            completed: false,
            edited: false,
        };
    };

    completeTask = (id) => {
        this.setState(({ todoData }) => {
            const newTodoData = todoData.map((el) => {
                if (el.id === id) {
                    return {
                        ...el,
                        completed: !el.completed,
                    };
                }
                return el;
            });
            return {
                todoData: newTodoData,
            }
        });
    }

    editTask = (id) => {
        this.setState(({ todoData }) => {
            const newTodoData = todoData.map((el) => {
                if (el.id === id) {
                    return {
                        ...el,
                        edited: true,
                    };
                }
                return el;
            });
            return {
                todoData: newTodoData,
            }
        });
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
                    };
                }
                return el;
            })
            return {
                todoData: newTodoData,
            };
        });
    };

    deleteTask = (id) => {
      this.setState(({todoData}) => {
          const newTodoData = todoData.filter((el) => el.id !== id);
          return {
              todoData: newTodoData,
          };
      });
    };

    addTask = (description) => {
        const newItem = this.createTask(description, this.maxId++);
        this.setState(({ todoData }) => {
            const newTodoData = [...todoData, newItem];
            return {
                todoData: newTodoData,
            };
        })
    }


    render() {
        const {todoData} = this.state
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                </header>
                <NewTaskForm
                    addTask= {this.addTask} />
                <TaskList
                    taskData = {todoData}
                    onToggleDone = { this.completeTask }
                    onEditClick =  { this.editTask }
                    onCloseClick= { this.deleteTask }
                    onChangeDescription ={this.changeDescription}/>
                <Footer />
            </section>
        );
    }
}