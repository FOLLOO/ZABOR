import React from 'react'

// css
import styles from './inputText.module.css'
function InputText ({place, type, height, width}) {
  return (
    <div className={styles.main} style={{ width: `${width}`, height: `${height ? height : null}`}}>
      <input className={styles.input} type={type} placeholder={place} />
    </div>
  )
}

export default InputText