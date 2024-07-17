import React from 'react'

import styles from './settings-block.module.css'
import global from '../../../global.module.css'
import GreenButton from '../../ui/buttons/green-button/GreenButton'

function SettingsBlock ({ children,
  title,
  descripton,
  red, button, b_text, b_type,
  mainWidth,
  titleWidth,
  noMargin = false}) {
  return (
    <div className={noMargin ? `${styles.Nomain} ${global.flex}` : `${styles.main} ${global.flex}`}
         style={{width: mainWidth ? mainWidth : 'auto'}}>
      <div className={`${styles.title} ${global.flex} ${global.f_dir_column}`}
           style={{width: titleWidth ? titleWidth : '500px'}}>
        <div className={`${global.t2} ${global.medium}`}>
          {title ? title : null}
        </div>
        {button ? <GreenButton text={b_text} type={b_type}  /> : null }
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