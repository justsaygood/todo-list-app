import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { AppContext } from '../../context/app-context'

function EditTask({ id, description }) {
  const blurEvent = true

  const { changeDescription } = useContext(AppContext)
  const [newDescription, setNewDescription] = useState(description)

  const changeHandler = (e) => {
    setNewDescription(e.target.value)
  }

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      if (newDescription === description) {
        changeDescription(id, description)
      } else {
        changeDescription(id, newDescription)
      }
    }
    if (e.keyCode === 27) {
      changeDescription(id, description)
    }
  }

  const onBlur = () => {
    if (blurEvent) {
      changeDescription(id, description)
    }
  }

  return (
    <input
      type="text"
      className="edit"
      defaultValue={description}
      onChange={changeHandler}
      onKeyDown={onKeyPress}
      onBlur={onBlur}
    />
  )
}

export default EditTask

EditTask.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  description: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.number.isRequired,
}

EditTask.defaultProps = {
  description: '',
}
