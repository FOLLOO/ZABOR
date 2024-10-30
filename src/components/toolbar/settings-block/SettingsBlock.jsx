import React from 'react'

import styles from './settings-block.module.css'
import global from '../../../global.module.css'
import GreenButton from '../../ui/buttons/green-button/GreenButton'

function SettingsBlock ({ children,
  title,
  descripton,
  red, button, b_text, b_type,
  }) {
  return (
    <div className={`${styles.main} ${global.flex}`}>
      <div className={`${styles.title} ${global.flex} ${global.f_dir_column}`}>
        <div className={`${global.t3}`}>
          {title ? title : null}
        </div>
        {button ? <GreenButton text={b_text} type={b_type}  /> : null }
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