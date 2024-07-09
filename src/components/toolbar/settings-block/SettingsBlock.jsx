import React from 'react'

import styles from './settings-block.module.css'
import global from '../../../global.module.css'

function SettingsBlock ({ children, title, descripton, red , mainWidth, titleWidth, noMargin = false}) {
  return (
    <div className={noMargin ? `${styles.Nomain} ${global.flex}` : `${styles.main} ${global.flex}`}
         style={{width: mainWidth ? mainWidth : 'auto'}}>
      <div className={`${styles.title} ${global.flex} ${global.f_dir_column}`}
           style={{width: titleWidth ? titleWidth : '500px'}}>
        <div className={global.t5}>
          {title ? title : null}
        </div>
        <div className={red ? `${global.d2} ${styles.red}` : global.d2}>
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