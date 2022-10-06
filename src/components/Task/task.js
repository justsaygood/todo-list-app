import React, { useState, useContext, useEffect } from 'react'

import { AppContext } from '../../context/app-context'
import './task.css'

function Task({ minutes, seconds, id, checked, creationTime, description }) {
  const { completeTask, deleteTask, editTask } = useContext(AppContext)

  const [min, setMin] = useState(minutes)
  const [sec, setSec] = useState(seconds)
  const [isCounting, setIsCounting] = useState(false)
  const [time, setTime] = useState('')
  const [counterID, setCounterID] = useState(0)

  let updateMin = min
  let updateSec = sec

  const tickTimer = (newCounterID) => {
    if ((updateMin === 0 && updateSec === 0) || time === 'time is up') {
      completeTask(id)
      setIsCounting(false)
      clearInterval(newCounterID)
      setMin('')
      setSec('')
      setTime('time is up')
      return
    }
    if (updateSec > 0) {
      updateSec -= 1
      setIsCounting(true)
    } else {
      updateMin -= 1
      updateSec = 59
    }
    setMin(updateMin)
    setSec(updateSec)
    setTime('')
  }

  useEffect(() => {
    setMin(minutes)
    setSec(seconds)
    return () => {
      clearInterval(counterID)
    }
  }, [minutes, seconds, counterID])

  const handleStop = (e) => {
    e.stopPropagation()
    setIsCounting(false)
    clearInterval(counterID)
  }

  const handleStart = (e) => {
    e.stopPropagation()
    if (checked === true) return
    setIsCounting(true)
    const newCounterID = setInterval(() => {
      tickTimer(newCounterID)
    }, 1000)
    setCounterID(newCounterID)
  }

  const editHandler = (e) => {
    editTask(id)
    setTimeout(() => e.target.closest('li').querySelector('.edit').focus(), 50)
  }

  const timerButtons = !isCounting ? (
    /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
    <button className="icon icon-play" type="button" aria-label="Icon play" onClick={handleStart} />
  ) : (
    /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
    <button className="icon icon-pause" type="button" aria-label="Icon pause" onClick={handleStop} />
  )

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        readOnly
        onClick={(e) => {
          completeTask(id)
          handleStop(e)
        }}
        checked={checked}
      />
      <div className="label">
        <span className="description">{description}</span>
        <span className="timer">
          {timerButtons}
          <span className="timer__clock">
            {min}:{sec} {time}
          </span>
        </span>
        <span className="created">created {creationTime} ago</span>
      </div>
      <button
        className="icon icon-edit"
        type="button"
        aria-label="Icon input edit"
        onClick={(e) => {
          editHandler(e)
        }}
      />
      <button
        className="icon icon-destroy"
        type="button"
        aria-label="Icon input deleted"
        onClick={() => {
          deleteTask(id)
        }}
      />
    </div>
  )
}

export default Task
