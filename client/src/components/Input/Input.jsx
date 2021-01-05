import React from 'react'
import './Input.scss'

const Input = (props) => {
  return (
    <input
      onChange={(e) => props.setValue(e.target.value)}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  )
}

export default Input
