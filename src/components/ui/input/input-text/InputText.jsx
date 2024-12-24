import React from 'react'

// css
import styles from './inputText.module.css'
import global from '../../../../global.module.css'
function InputText ({place, type, value, onChange, required, autocomplete, minValue, maxValue, disabled}) {
  return (
    <div className={styles.main} >
      <input className={`${styles.input} ${global.text}`}
             value={value} autoComplete={autocomplete}
             onChange={onChange}
             required={required}
             type={type}
             disabled={disabled}
             max={maxValue}
             min={minValue}
             placeholder={place} />
    </div>
  )
}

export default InputText