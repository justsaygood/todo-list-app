import React from 'react';

import "./task.css";

export default class Task extends React.Component {

    state = {
        id: this.props.id,
    };


    render () {

        const { description, onToggleDone, onCloseClick, onEditClick} = this.props;

        return (
                <div className="view">
                    <input className="toggle" type="checkbox"
                           onClick= { onToggleDone } />
                        <label>
                            <span className="description">{ description }</span>
                            <span className="created">created 5 minutes ago</span>
                        </label>
                        <button className="icon icon-edit"
                                type="button"
                                aria-label="Icon input edit"
                                onClick= { onEditClick } >
                        </button>
                        <button className="icon icon-destroy"
                                type="button"
                                aria-label="Icon input deleted"
                                onClick= { onCloseClick }>
                        </button>
                </div>
        )
    }
}

