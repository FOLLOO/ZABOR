import React from 'react'

import styles from './tag-checkbox.module.css'
import global from '../../../../global.module.css'

import {IMAGE_URL} from "../../../../utils";

function TagCheckBox ({image, text, click, img, id, checked}) {

    return (
    <div className={styles.checkbox_container} >
      <input type="checkbox" className={styles.checkbox} onChange={click} id={id} checked={checked} />
      <label  className={styles.checkbox_label} htmlFor={id}>
        <img src={img ? `${IMAGE_URL}${img}` : null} alt="Description" className={styles.checkbox_image}/>
        <span className={`${styles.checkbox_text} ${global.t3}`}>{text ? text : null}</span>
      </label>
    </div>
  )
}

export default TagCheckBox