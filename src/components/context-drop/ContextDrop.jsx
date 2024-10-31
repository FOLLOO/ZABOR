import React from 'react'
import styles from './context-drop.module.css'
import global from '../../global.module.css'
function ContextDrop ({children, title, width, }) {

  return (
    <div className={`${styles.mainDrop}  ${global.f_dir_column}`} style={{width: width ? width : null}}>
      {title ?
        <h1 >
          {title}
        </h1>
          : null}
      {children}
    </div>
  )
}

export default ContextDrop