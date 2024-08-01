import React from 'react'

import styles from './nothing.module.css'
import global from '../../global.module.css'
import notFound from '../../asserts/loading/Nothing.png'

function Nothing (props) {
  return (
    <div className={styles.main}>
      <img src={notFound} alt={'not found'} className={styles.img}/>
      <div className={global.d2}> Ничего не найдено </div>
      {/*<div className={global.d3}> Перезагрузите страницу если ничего не происходит </div>*/}
    </div>
  )
}

export default Nothing