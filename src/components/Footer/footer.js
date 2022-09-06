import React from 'react';
import TasksFilter from "../TasksFilter/task-filter";

import "./footer.css";

function Footer({tasksLeftCount, clearCompleted, onFilterChange}) {
    return (
        <footer className="footer">
            <span className="todo-count">{tasksLeftCount} items left</span>
            <TasksFilter onFilterChange= {onFilterChange}/>
            <button className="clear-completed" onClick= {clearCompleted}>Clear completed</button>
        </footer>
    );
}

export default Footer;