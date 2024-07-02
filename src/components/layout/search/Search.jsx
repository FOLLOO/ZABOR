import React from 'react'
import styles from './search.module.css'
import global from '../../../global.module.css'
import search from '../../../asserts/icons/Search.svg'
function Search ({stylee}) {
  return (
    <div className={styles.main} style={stylee}>
      <div className={`${global.flex} ${global.f_a_center} ${styles.search}`}>
        <img src={search} alt={''}/>
        <input className={styles.input} type={'text'} placeholder={'Найти...'} />
      </div>
    </div>
  )
}

export default Search