import React from 'react'
import PropTypes from 'prop-types'

export default class EditTask extends React.Component {
  state = {
    newDescription: '',
  }

  static propTypes = {
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    onChangeDescription: PropTypes.func,
  }

  static defaultProps = {
    description: '',
    onChangeDescription: () => {},
  }

  onEditTask = (event) => {
    this.setState({
      newDescription: event.target.value.replace(/ +/g, ' ').trim(),
    })
  }

  onEnterPress = (event) => {
    const { onChangeDescription, id, description } = this.props
    const { newDescription } = this.state
    if (event.keyCode === 13) {
      if (newDescription === '') {
        onChangeDescription(id, description)
      } else {
        onChangeDescription(id, newDescription)
      }
    }
  }

  render() {
    const { description } = this.props
    return (
      <input
        type="text"
        className="edit"
        placeholder={description}
        onChange={this.onEditTask}
        onKeyDown={this.onEnterPress}
      />
    )
  }
}
