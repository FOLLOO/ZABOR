import React from 'react'
import './input-dropdown.css'

function InputDporDown (props) {
  return (
    <div>
      <label className="select" htmlFor="slct">
        <select id="slct" required>
          <option value="" disabled="" selected="">Select option</option>
          <option className="custom-option" value="#">One</option>
          <option className="custom-option" value="#">Two</option>
          <option className="custom-option" value="#">Three</option>
          <option className="custom-option" value="#">Four</option>
          <option value="#">Five</option>
          <option value="#">Six</option>
          <option value="#">Seven</option>
        </select>
        <svg>
          <use xlinkHref="#select-arrow-down"></use>
        </svg>
      </label>
      <svg className="sprites">
        <symbol id="select-arrow-down" viewBox="0 0 10 6">
          <polyline points="1 1 5 5 9 1"></polyline>
        </symbol>
      </svg>

    </div>
  )
}

export default InputDporDown