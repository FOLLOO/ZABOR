import React from 'react'

// css
import styles from './transprantButton.module.css'
import global from '../../../../global.module.css'

function TransprantButton ({
  text, stylee, img, unique, click, nonePad,
  red = false,
  left = false,
  noPad = false,
  form,
  type,
    title,
  // notification_count,
  notification = false
}) {
  return (
    <button
      form={form}
      title={title}
      className={styles.button}
      type={type ? type : null}
      style={stylee ? stylee : null}
      onClick={click ? click : null}>
      {/*Какую-то хуйню я тут понаписал */}
      <div  className={
        left ? `${styles.content} ${global.flex} ${global.f_a_center}` :
          noPad ? `${styles.noPad} ${global.flex} ${global.f_a_center}` :
            nonePad ? `${styles.none} ${global.flex} ${global.f_a_center} ${global.f_end}`
              : `${styles.content} ${global.flex} ${global.f_a_center} ${global.f_center}`}>
        {img ?
          <>
          <img src={img} alt={'button img'} className={styles.img}/>
          {notification ?
            <div className={styles.notification_count}>{notification}</div> : null }
          </>
          : null
        }
        {text ?
          <div className={`
          ${unique ? `${global.text} ${global.bold}` : styles.text} 
          ${red ? styles.red : null}
        `}>
            {text}
          </div>
          : null
        }
      </div>

    </button>
  )
}

export default TransprantButton