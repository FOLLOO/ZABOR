import React from 'react'

// css
import styles from './glassCard.module.css'
import global from  '../../../global.module.css'
function GlassCard (props) {
  return (
    <div className={`${styles.glass} ${global.f_dir_column}`}>
      {props.children}
    </div>
  )
}

export default GlassCard