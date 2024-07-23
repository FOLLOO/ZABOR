import React from 'react'

// css
import global from '../../../../global.module.css'
import styles from './greenButton.module.css'

function GreenButton ({text, stylee, img, unique, click, type, form}) {
  return (
    <button
      form={form}
      className={styles.button}
      type={type ? type : null }
      onClick={click ? click : null}>
      <div className={styles.content} style={stylee? stylee : null}>
        { img ?
          <img src={img} alt={'button img'}/>
          : null
        }
        {text ?
          <div className={unique ? global.t1 : global.t1}>
            {text}
          </div>
          : null
        }
      </div>
    </button>
  )
}

export default GreenButton