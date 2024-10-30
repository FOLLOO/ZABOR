import React from 'react'

// css
import styles from './inputText.module.css'
import global from '../../../../global.module.css'
function InputText ({place, type, value, onChange, required}) {
  return (
    <div className={styles.main} >
      <input className={`${styles.input} ${global.text}`}
             value={value}
             onChange={onChange}
             required={required}
             type={type}
             placeholder={place} />
    </div>
  )
}

export default InputText