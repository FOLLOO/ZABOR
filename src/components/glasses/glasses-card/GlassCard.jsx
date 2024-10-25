import React from 'react'

// css
import styles from './glassCard.module.css'
import global from  '../../../global.module.css'
/**Стекло на бек border-radius: 5px
 * height - fit content
 * width - fit content */

function GlassCard ({width = false, height = false, children}) {
  return (
    <div className={`${styles.glass} ${global.f_dir_column} 
    ${width ? styles.fit  : global.w100} 
    ${height ? styles.fitH : global.h100}
    `}>
      {children}
    </div>
  )
}

export default GlassCard