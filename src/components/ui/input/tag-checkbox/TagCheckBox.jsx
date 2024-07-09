import React, { useState } from 'react'

import styles from './tag-checkbox.module.css'
import global from '../../../../global.module.css'
import temp from '../../../../asserts/temp/stir-fried-pork-with-korean-sauce-on-dark-background.jpg'
function TagCheckBox ({image, text}) {

  const [checked, setChecked] = useState(false)

  return (
    <div className={styles.checkbox_container} onClick={() => setChecked(!checked)}>
      <input type="checkbox" id={styles.checkbox} className={styles.checkbox} checked={checked}/>
      <label htmlFor="checkbox" className={styles.checkbox_label}>
        <img src={temp} alt="Description" className={styles.checkbox_image}/>
        <span className={styles.checkbox_text}>Your Text Here</span>
      </label>
    </div>
  )
}

export default TagCheckBox