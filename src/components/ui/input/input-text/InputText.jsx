import React from 'react'

// css
import styles from './inputText.module.css'
function InputText ({place, type, height, width, value, onChange, required}) {
  return (
    <div className={styles.main} style={{ width: `${width}`, height: `${height ? height : null}`}}>
      <input className={styles.input}
             value={value}
             onChange={onChange}
             required={required}
             type={type}
             placeholder={place} />
    </div>
  )
}

export default InputText