import React from 'react';
import PropTypes from 'prop-types';

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

Footer.defaultProps = {
    tasksLeftCount: 0,
    clearCompleted: () => {},
    onFilterChange: () => {},
};
Footer.propTypes = {
    tasksLeftCount: PropTypes.number,
    clearCompleted: () => {},
    onFilterChange: () => {},
};

export default Footer;