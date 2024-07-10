import React from 'react'
import styles from './context-group.module.css'
import global from '../../../global.module.css'

function ContextGroup ({children, noafter = false}) {
  return (
    <div className={noafter ? `${styles.noafter} ${global.f_dir_column}` : `${styles.group} ${global.f_dir_column}`}>
      {children}
    </div>
  )
}

export default ContextGroup