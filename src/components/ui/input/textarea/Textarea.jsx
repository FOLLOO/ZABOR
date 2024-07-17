import React from 'react'

import styles from './textarea.module.css'
import global from '../../../../global.module.css'

function Textarea ({place, rows, value, onChange}) {
  return (
    <div className={styles.main}>
      <textarea
        onChange={onChange}
        value={value}
        className={styles.input}
        rows={rows}
        placeholder={place ? place : null}/>

    </div>
  )
}

export default Textarea