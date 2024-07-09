import React from 'react'

import styles from './settings-title.module.css'
import global from '../../../global.module.css'

function SettingsTitle ({bigTitle, title, description}) {
  return (
    <div className={styles.main}>
        <h2 className={styles.h}>{bigTitle}</h2>
        <h3>{title}</h3>
      <div className={`${global.d2} ${styles.desc}`}>
        {description}
      </div>
    </div>
  )
}

export default SettingsTitle