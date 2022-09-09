import React from 'react'
import PropTypes from 'prop-types'

import './task-filter.css'

export default class TasksFilter extends React.Component {
  state = {
    allBtn: true,
    activeBtn: false,
    completedBtn: false,
  }

  static defaultProps = {
    onFilterChange: () => {},
  }

  static propTypes = {
    onFilterChange: PropTypes.func,
  }

  onClickButton = (event) => {
    const buttonClicked = event.target.innerText.toLowerCase()

    if (buttonClicked === 'all') {
      this.setState({
        allBtn: true,
        activeBtn: false,
        completedBtn: false,
      })
    } else if (buttonClicked === 'active') {
      this.setState({
        allBtn: false,
        activeBtn: true,
        completedBtn: false,
      })
    } else {
      this.setState({
        allBtn: false,
        activeBtn: false,
        completedBtn: true,
      })
    }
  }

  render() {
    const { onFilterChange } = this.props
    const { allBtn, activeBtn, completedBtn } = this.state

    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={allBtn ? 'selected' : ''}
            onClick={(event) => {
              onFilterChange(event)
              this.onClickButton(event)
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={activeBtn ? 'selected' : ''}
            onClick={(event) => {
              onFilterChange(event)
              this.onClickButton(event)
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={completedBtn ? 'selected' : ''}
            onClick={(event) => {
              onFilterChange(event)
              this.onClickButton(event)
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
