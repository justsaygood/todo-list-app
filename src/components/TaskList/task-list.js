import React from 'react';
import Task from '../Task/task';
import EditTask from '../EditTask/edit-task';

import "./task-list.css";

export default function TaskList({ taskData, onToggleDone, onEditClick, onCloseClick, onChangeDescription }) {

    const elements = taskData.map((item) => {
        const { id, edited, completed } = item;

        let classNames = '';
        if (item.completed) {
            classNames += ' completed';
        }

        if (item.edited) {
            classNames += ' editing';
        }
        return (
            <li key= {item.id} className= {classNames}>
                <Task description= {item.description}
                      onToggleDone = {() => onToggleDone(id)}
                      onEditClick = {() => onEditClick(id)}
                      onCloseClick = {() => onCloseClick(id)}
                />
                <EditTask id= {id}
                          description= {item.description}
                          onChangeDescription= {onChangeDescription}/>
            </li>
        )
    })

    return (
        <ul className="todo-list">{ elements }</ul>
    )
}
