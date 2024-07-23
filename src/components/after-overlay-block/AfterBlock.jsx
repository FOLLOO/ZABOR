import React from 'react'

import styles from './after-block.module.css'
import global from '../../global.module.css'

function AfterBlock ({children}) {
  return (
    <div className={styles.main}>
      {children}
    </div>
  )
}

export default AfterBlock