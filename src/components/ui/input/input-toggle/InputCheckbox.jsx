import React from 'react'
import './input_toggle.css'
function InputToggle ({id}) {
  return (
    <div className="checkbox-wrapper-22">
      <label className="switch" >
        <input type="checkbox" id={id}/>
        <div className="slider round"></div>
      </label>
    </div>
)
}

export default InputToggle