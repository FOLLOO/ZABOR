import React from 'react'

import styles from './textarea.module.css'

function Textarea ({place, rows, value, onChange, req = false, maxLength}) {
  return (
    <div className={styles.main}>
      <textarea
        onChange={onChange}
        value={value}
        lang={'ru'}
        maxLength={maxLength || 3000}
        spellCheck
        className={styles.input}
        rows={rows}
        required={req}
        placeholder={place ? place : null}/>
    </div>
  )
}

export default Textarea