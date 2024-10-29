import React, { useState } from 'react'

import styles from './little-tag.module.css'
import global from '../../../../global.module.css'
import close from '../../../../asserts/icons/close.svg'
function LittleTag ({text, click, onChange, name, id}) {

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
        <span className={`${styles.checkbox_text} ${global.text}`}>{text ? text : null}</span>
        {checkedd ? <img src={close} className={styles.check_img} alt={''} />
          : null}
      </label>
    </div>
  )
}

export default LittleTag