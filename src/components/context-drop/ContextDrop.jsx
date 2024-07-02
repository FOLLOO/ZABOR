import React from 'react'
import styles from './context-drop.module.css'
import global from '../../global.module.css'
function ContextDrop (props) {
  return (
    <div className={`${styles.mainDrop}  ${global.f_dir_column}`}>
      {props.children}
    </div>
  )
}

export default ContextDrop