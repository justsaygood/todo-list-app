import React from 'react';

export default class EditTask extends React.Component {
    state = {
        newDescription: '',
    };

    onEditTask = (event) => {
        this.setState({
            newDescription: event.target.value.replace(/ +/g, ' ').trim(),
        });
    };

    onEnterPress = (event) => {
        const { onChangeDescription, id, description } = this.props;
        const { newDescription } = this.state;
        if (event.keyCode === 13) {
            if (newDescription === '') {
                onChangeDescription(id, description);
            } else {
                onChangeDescription(id, newDescription);
            }
        }
    }
    render() {
        const { description } = this.props;
        return (
            <input type="text"
                   className="edit"
                   placeholder= {description}
                   onChange= {this.onEditTask}
                   onKeyDown= {this.onEnterPress}
            />
        );
    }
}