import React from 'react';

import "./task.css";

export default class Task extends React.Component {

    state = {
        id: this.props.id,
    };


    render () {

        const { description, onToggleDone, onCloseClick, onEditClick, checked, creationTime } = this.props;

        return (
                <div className="view">
                    <input className="toggle" type="checkbox" readOnly
                           onClick= { onToggleDone }
                           checked= {checked} />
                        <label>
                            <span className="description">{ description }</span>
                            <span className="created">created {creationTime} ago</span>
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

