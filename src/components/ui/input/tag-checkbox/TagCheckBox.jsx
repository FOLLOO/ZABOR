import React, { useState } from 'react'

import styles from './tag-checkbox.module.css'
import global from '../../../../global.module.css'
import temp from '../../../../asserts/temp/stir-fried-pork-with-korean-sauce-on-dark-background.jpg'
function TagCheckBox ({image, text, click, img}) {

  const [checked, setChecked] = useState(false)

  return (
    <div className={styles.checkbox_container} onClick={() => setChecked(!checked)}>
      <input type="checkbox" className={styles.checkbox} checked={checked}/>
      <label  className={styles.checkbox_label} onClick={click}>
        {/*{img ?*/}
        <img src={temp} alt="Description" className={styles.checkbox_image}/>
        {/*: null*/}
        {/*}*/}
        <span className={`${styles.checkbox_text} ${global.text}`}>{text ? text : null}</span>
      </label>
    </div>
  )
}

export default TagCheckBox