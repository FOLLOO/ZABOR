import React, { useState } from 'react'

import styles from './little-tag.module.css'
import global from '../../../../global.module.css'
// import close from '../../../../asserts/icons/close.svg'
import close from '../../../../asserts/icons/update/close-white.svg'
function LittleTag ({text, click, onChange, name, id, disabled}) {

  const [checkedd, setCheckedd] = useState(false)

  const handleChange = () => {
    setCheckedd(!checkedd);
  };
// Почему-то не работи
  return (
    <div className={checkedd ? styles.checkbox_checked : styles.checkbox_container} onClick={click}>
      <input type="checkbox" id={id} className={styles.checkbox}
            // checked={() => checked}
              checked={checkedd}
              name={name}
              onChange={onChange}
      />
      <label  className={styles.checkbox_label} onClick={handleChange} htmlFor={id} >
        <span className={`${styles.checkbox_text} ${global.sm}`}>{text ? text : null}</span>
        {checkedd ? <img src={close} alt={''}
                         height={20} width={20}
                         className={styles.check_img}
            />
          : null}
      </label>
    </div>
  )
}

export default LittleTag