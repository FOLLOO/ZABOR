import React from 'react'
import styles from './white-button.module.css'
import global from '../../../../global.module.css'

function WhiteButton ({click, img, text, stylee, unique= false}) {
  return (
    <button
      className={styles.button}
      onClick={click ? click : null} >
      <div className={`${styles.content} ${global.flex} ${global.f_a_center} ${img ? '' : global.f_center }`}  style={stylee ? stylee : null}>
        { img ?
          <img src={img} alt={'button img'}/>
          : null
        }
        {text ?
          <div className={unique ? global.t1 : null}>
            {text}
          </div>
          : null
        }
      </div>

    </button>
  )
}

export default WhiteButton