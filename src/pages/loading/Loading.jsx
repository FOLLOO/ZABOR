import React from 'react'

import styles from './loading.module.css'
import global from '../../global.module.css'

import loading from '../../asserts/loading/Loading.gif'

function Loading (props) {
  return (
    <div className={styles.main}>
      <img src={loading} alt={'loading..'} className={styles.img}/>
      <div className={global.d2}> Идет загрузка. Не отключайтесь... </div>
    </div>
  )
}

export default Loading