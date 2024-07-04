import React from 'react'

// css
import styles from './transprantButton.module.css'
import global from '../../../../global.module.css'
function TransprantButton ({text, stylee, img, unique, click, nonePad,
  left= false,
  noPad = false
}) {



  return (
    <button
      className={styles.button}
      style={stylee ? stylee : null}
      onClick={click ? click : null} >
      <div  className={
        left ? `${styles.content} ${global.flex} ${global.f_a_center}` :
        noPad ? `${styles.noPad} ${global.flex} ${global.f_a_center}` :
          nonePad ? `${styles.none} ${global.flex} ${global.f_a_center} ${global.f_end}`
          : `${styles.content} ${global.flex} ${global.f_a_center} ${global.f_center}` }>
        { img ?
          <img src={img} alt={'button img'}/>
          : null
        }
        {text ?
          <div className={unique ? global.t1 : `${global.text} ` }>
            {text}
          </div>
          : null
        }
      </div>

    </button>
  )
}

export default TransprantButton