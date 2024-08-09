import React from 'react'

import styles from './textarea.module.css'
import global from '../../../../global.module.css'

function Textarea ({place, rows, value, onChange, back = true, req = false}) {
  return (
    <div className={styles.main}>
      <textarea
        onChange={onChange}
        value={value}
        lang={'ru'}
        maxLength={3000}
        className={back ? `${styles.input} ${styles.back}` : `${styles.input} ${styles.anotherBack}` }
        rows={rows}
        required={req}
        placeholder={place ? place : null}/>
    </div>
  )
}

export default Textarea