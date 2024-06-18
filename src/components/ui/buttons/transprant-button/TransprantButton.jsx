import React from 'react'

// css
import styles from './transprantButton.module.css'
import global from '../../../../global.module.css'
function TransprantButton ({text, stylee, img, unique}) {
  return (
    <button>
      <div className={styles.content} style={stylee}>
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

export default TransprantButton