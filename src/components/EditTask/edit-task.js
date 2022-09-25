import React from 'react'
import PropTypes from 'prop-types'

export default class EditTask extends React.Component {
  static propTypes = {
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    onChangeDescription: PropTypes.func,
  }

  static defaultProps = {
    description: '',
    onChangeDescription: () => {},
  }

  blurEvent = true

  constructor(props) {
    super(props)
    this.state = {
      description: props.description,
    }
  }

  onEnterPress = (event) => {
    const { onChangeDescription, id } = this.props
    const { description } = this.state
    if (event.keyCode === 13) {
      onChangeDescription(id, description)
    }
  }

  changeHandler = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  onBlur = () => {
    const { onChangeDescription, id } = this.props
    const { description } = this.state
    if (this.blurEvent) {
      onChangeDescription(id, description)
    }
  }

  render() {
    const { description } = this.state
    return (
      <input
        type="text"
        className="edit"
        value={description}
        onChange={this.changeHandler}
        onKeyDown={this.onEnterPress}
        onBlur={this.onBlur}
      />
    )
  }
}
