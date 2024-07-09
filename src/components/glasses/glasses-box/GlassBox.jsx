import React from 'react'

// css
import styles from './glassBox.module.css'
import global from  '../../../global.module.css'

/** Стекло на бек border-radius: 5px*/
function GlassBox (props) {
  return (
    <div className={`${styles.glass} ${global.f_dir_column}`}>
      {props.children}
    </div>
  )
}

export default GlassBox
