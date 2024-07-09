import React, { useState } from 'react'

import styles from './subscribe-button.module.css'
import global from '../../../../global.module.css'

function SubscribeButton ({click, stylee, img}) {

  const [color , setColor ] = useState(false)

  const Click = () => {
    setColor(!color)
  }


  return (
    <button
      className={color ? `${styles.button} ${styles.gray}` : `${styles.button} ${styles.red}`}
      onClick={() => click ? Click() && click : Click()}>
      <div className={styles.content} style={stylee? stylee : null}>
        { img ?
          <img src={img} alt={'button img'}/>
          : null
        }
          <div className={global.t5}>
            {color ? 'Вы подписаны' : 'Подписаться'}
          </div>
      </div>
    </button>
  )
}

export default SubscribeButton