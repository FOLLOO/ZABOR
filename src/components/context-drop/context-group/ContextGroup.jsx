import React from 'react'
import styles from './context-group.module.css'
import global from '../../../global.module.css'

function ContextGroup (props) {
  return (
    <div className={`${styles.group} ${global.f_dir_column}`}>
      {props.children}
    </div>
  )
}

export default ContextGroup