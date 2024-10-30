import React from 'react'
import styles from './search.module.css'
import global from '../../../global.module.css'

import search from '../../../asserts/icons/update/search.svg'
function Search ({stylee}) {
  return (
    <div className={styles.main} style={stylee}>
      <div className={`${global.flex} ${global.f_a_center} ${styles.search}`}>
        <input className={`${styles.input} ${global.base} `} type={'text'} placeholder={'Найти...'} />
        <img src={search} width={20} height={20} alt={'search icons'}/>
      </div>
    </div>
  )
}

export default Search