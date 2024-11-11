import React from 'react'

import styles from './tag-checkbox.module.css'
import global from '../../../../global.module.css'

import t1 from '../../../../asserts/temp/stir-fried-pork-with-korean-sauce-on-dark-background.jpg'
import t2 from '../../../../asserts/temp/people-doing-outdoor-training.jpg'
import t3 from '../../../../asserts/temp/2.jpg'
import t4 from '../../../../asserts/temp/temp1.png'
import t5 from '../../../../asserts/temp/temp2.jpg'
import t6 from '../../../../asserts/background/abstract resin.png'
import t7 from '../../../../asserts/background/abstract resin blur.png'
import t8 from '../../../../asserts/background/purple blue zabor.png'

function TagCheckBox ({image, text, click, img, id}) {

  // const [checked, setChecked] = useState(false)

    const images = [t1, t2, t3, t4, t5, t6, t7, t8];

    function random() {
        return Math.floor(Math.random() * images.length);
    }


    return (
    <div className={styles.checkbox_container} >
      <input type="checkbox" className={styles.checkbox} id={id} />
      <label  className={styles.checkbox_label} onClick={click} htmlFor={id}>
        <img src={images[random()]} alt="Description" className={styles.checkbox_image}/>
        <span className={`${styles.checkbox_text} ${global.t3}`}>{text ? text : null}</span>
      </label>
    </div>
  )
}

export default TagCheckBox