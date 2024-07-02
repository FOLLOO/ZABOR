import React from 'react'

// css
import global from '../../../../global.module.css'
import styles from './greenButton.module.css'

function GreenButton ({text, stylee, img, unique, click}) {
  return (
    <button
      className={styles.button}
      onClick={click ? click : null}>
      <div className={styles.content} style={stylee? stylee : null}>
        { img ?
          <img src={img} alt={'button img'}/>
          : null
        }
        {text ?
          <div className={unique ? null : global.t1}>
            {text}
          </div>
          : null
        }
      </div>
    </button>
  )
}

export default GreenButton