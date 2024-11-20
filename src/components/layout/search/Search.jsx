import React from 'react'
import styles from './search.module.css'
import global from '../../../global.module.css'

import search from '../../../asserts/icons/update/search.svg'
function Search ({placeholder = 'Найти...', value, onChange}) {
  return (
    <div className={styles.main} >
      <div className={`${global.flex} ${global.f_a_center} ${styles.search}`}>
        <input className={`${styles.input} ${global.base} `} type={'text'}
               placeholder={placeholder}
                value={value} onChange={onChange}
        />
        <img src={search} width={20} height={20} alt={'search icons'}/>
      </div>
    </div>
  )
}

export default Search