import React from 'react'

// css
import styles from './inputText.module.css'
function InputText ({place, type, height}) {
  return (
    <div className={styles.main}>
      <input className={styles.input} type={type} placeholder={place} style={{height: `${height}`}}/>
    </div>
  )
}

export default InputText