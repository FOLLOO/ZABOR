import React from 'react'

// css
import styles from './glassCard.module.css'
import global from  '../../../global.module.css'
function GlassCard ({width = false, height = false, children}) {
  return (
    <div className={`${styles.glass} ${global.f_dir_column} 
    ${width ? styles.fit  : styles.w100} 
    ${height ? styles.fitH : styles.h100}
    `}>
      {children}
    </div>
  )
}

export default GlassCard