import React from 'react'
import styles from './white-button.module.css'
import global from '../../../../global.module.css'

function WhiteButton ({click, img,
  img_width,
  img_height,
  text, stylee, unique= false}) {
  return (
    <button
      className={styles.button}
      onClick={click ? click : null} >
      <div className={`${styles.content} ${global.flex} ${global.f_a_center} ${img ? '' : global.f_center }`}  style={stylee ? stylee : null}>
        { img ?
          <img src={img} width={img_width ? img_width : null} height={img_height ? img_height : null} alt={'button img'}/>
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