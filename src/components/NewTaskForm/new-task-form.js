import React from 'react';
import PropTypes from 'prop-types';
import "./new-task-form.css";

export default class NewTaskForm extends React.Component {
    state = {
        description: '',
    };

    static defaultProps = {
        addTask: () => {},
    };

    static propTypes = {
        addTask: PropTypes.func,
    };

    onSubmitForm = (event) => {
        const { addTask } = this.props;
        const { description } = this.state;

        if (event.keyCode === 13) {
            const trimDescription = description.replace(/ +/g, ' ').trim();
            event.preventDefault();

            if (trimDescription === '') {
                addTask('Task isn`t set');
            } else {
                addTask(trimDescription);
            }

            this.setState({
                description: ''
            });
        }
    }

    onDescriptionChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        const { description } = this.state

        return (
            <form  onKeyDown= {this.onSubmitForm}>
                <input className="new-todo"
                       name="description"
                       placeholder= 'What needs to be done?'
                       autoFocus
                       onChange= {this.onDescriptionChange}
                       value= {description}
                />
            </form>
        )
    }
}