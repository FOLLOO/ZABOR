import React from 'react'
import './input_toggle.css'
function InputToggle (props) {
  return (
    <div className="checkbox-wrapper-22">
      <label className="switch" htmlFor="checkbox">
        <input type="checkbox" id="checkbox"/>
        <div className="slider round"></div>
      </label>
    </div>
)
}

export default InputToggle