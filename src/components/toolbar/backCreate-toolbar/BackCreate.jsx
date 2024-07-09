import React from 'react'

import global from '../../../global.module.css'
import styles from './back-create.module.css'

import arrowBack from '../../../asserts/icons/Arrow back.svg'

import TransprantButton from '../../ui/buttons/transprant-button/TransprantButton'
import GreenButton from '../../ui/buttons/green-button/GreenButton'
function BackCreate ({description, greenText, button}) {
  //todo: лучше опрделять или props-ами прописывать?
  return (
    <div className={styles.main}>
      <div className={`${global.flex} ${global.f_a_center} ${global.f_s_between}`}>
        <div className={styles.back}>
          <TransprantButton text={'Назад'} img={arrowBack} noPad/>
        </div>
        {button ?
          <div className={`${styles.create} ${global.flex} ${global.f_a_center}`}>
            <div className={`${styles.desc} ${global.d3} `}>
              {description}
            </div>
            <GreenButton text={greenText} unique/>
          </div>
          : null }
      </div>
    </div>
  )
}

export default BackCreate