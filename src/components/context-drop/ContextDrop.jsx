import React from 'react'
import styles from './context-drop.module.css'
import global from '../../global.module.css'
function ContextDrop ({children, title}) {
  return (
    <div className={`${styles.mainDrop}  ${global.f_dir_column}`}>
      <h3>{title ? title : null}</h3>
      {children}
    </div>
  )
}

export default ContextDrop