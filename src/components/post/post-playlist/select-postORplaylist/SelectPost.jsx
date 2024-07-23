import React, { useEffect, useState } from 'react'

import styles from './select-post.module.css'
import global from '../../../../global.module.css'

function SelectPost ({ title, img, description, onChange, id }) {
  const [checked, setChecked] = useState(false)

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div className={`${styles.main} ${checked ? styles.checked : styles.unchecked}`}   onClick={handleToggle}>
      <label htmlFor={id}>
        <div className={`${styles.content}`}>
          <div className={`${styles.image}`}>
            {img ?
            <img src={img} className={styles.img} alt={'img'}/>
              :
              <div className={global.skeleton}>
                asdfsadf
              </div> }
          </div>
          <div className={`${styles.text_content}`}>
            <div className={`${styles.title} ${global.t1}`}>
              {title ? title : null}
            </div>
            <div className={`${styles.description} ${global.d2}`}>
              {title ? title : null}
            </div>
          </div>
        </div>
      </label>
      <div className={`${styles.action}`} >
        <input type="checkbox" id={id} checked={checked} onChange={onChange} className={styles.checkbox}/>
      </div>
    </div>
  )
}

export default SelectPost