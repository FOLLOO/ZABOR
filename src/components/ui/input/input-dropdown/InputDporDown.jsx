import React from 'react'
import './input-dropdown.css'


function InputDporDown ({data = [], required, value, onChange}) {
  return (
    <div>
      <label className="select" htmlFor="slct">
        <select id="slct" required={required} value={value} onChange={onChange}>
          {/*<option value="" disabled="" selected="" className="pol">Ваш пол</option>*/}
          <option value="" hidden>Ваш пол</option>
          {data.length > 0 ?  data.map((item =>
            <option value={item.value} key={item.value} defaultChecked={value === item.title}>{item.title}</option>
          )) : null }
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