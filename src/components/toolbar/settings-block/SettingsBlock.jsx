import React from 'react'

import styles from './settings-block.module.css'
import global from '../../../global.module.css'

function SettingsBlock ({ children,
  title,
  descripton,
  red,
  }) {
  return (
    <div className={`${styles.main} ${global.flex}`}>
      <div className={`${styles.title} ${global.flex} ${global.f_dir_column}`}>
        <div className={`${global.t3}`}>
          {title ? title : null}
        </div>
        <div className={red ? `${global.d3} ${styles.red}` : global.d3}>
          {descripton ? descripton : null}
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default SettingsBlock