import React from 'react'

// css
import styles from './inputText.module.css'
function InputText ({place, type, height, width}) {
  return (
    <div className={styles.main} style={{ width: `${width}` }}>
      <input className={styles.input} type={type} placeholder={place} style={{height: `${height ? height : null}`}}/>
    </div>
  )
}

export default InputText