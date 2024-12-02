import React, { useState } from 'react'

import styles from './select-post.module.css'
import global from '../../../../global.module.css'
import { IMAGE_URL } from '../../../../utils'

function SelectPost ({ title, img, description, onChange, check = false, id }) {
  const [checked, setChecked] = useState(check)

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <label htmlFor={id} className={`${styles.main} ${checked ? styles.checked : styles.unchecked}`}   >
      <div>
        <div className={`${styles.content}`}>
          <div className={`${styles.image}`}>
            {img ?
            <img src={`${IMAGE_URL}${img}`} className={styles.img} alt={'img'}/>
              :
              <div className={global.skeleton}>
                asdfsadf
              </div> }
          </div>
          <div className={`${styles.text_content}`}>
            <div className={`${styles.title} ${global.t3}`}>
              {title ? title : null}
            </div>
            <div className={`${styles.description} ${global.d3}`}>
              {description ? description : null}
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.action}`} onClick={handleToggle} >
        <input type="checkbox" id={id} checked={checked} onChange={onChange} className={styles.checkbox}/>
      </div>
    </label>
  )
}

export default SelectPost