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
  notification = false
}) {

  return (
    <button
      form={form}
      className={styles.button}
      type={type ? type : null}
      style={stylee ? stylee : null}
      onClick={click ? click : null}>
      {/*че за хуйню я тут понаписал */}
      <div className={
        left ? `${styles.content} ${global.flex} ${global.f_a_center}` :
          noPad ? `${styles.noPad} ${global.flex} ${global.f_a_center}` :
            nonePad ? `${styles.none} ${global.flex} ${global.f_a_center} ${global.f_end}`
              : `${styles.content} ${global.flex} ${global.f_a_center} ${global.f_center}`}>
        {img ?
          <>
          <img src={img} alt={'button img'} className={styles.img}/>
          {notification ?
            <div className={styles.notification_count}>12</div> : null }
          </>
          : null
        }
        {text ?
          <div className={unique ? `${global.t1} ${styles.text}` : `${global.t1} ${styles.bold} ${styles.text}`} style={red ? { color: '#AD0000' } : null}>
            {text}
          </div>
          : null
        }
      </div>

    </button>
  )
}

export default TransprantButton