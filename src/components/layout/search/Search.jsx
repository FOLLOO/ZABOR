import React, {useEffect, useState} from 'react'
import styles from './search.module.css'
import global from '../../../global.module.css'

import search from '../../../asserts/icons/update/search.svg'
function Search ({placeholder = 'Найти...', value, onChange}) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if(value){
            setOpen(true)
        }
    }, [value]);

  return (
      <div className={styles.main}>
          <div className={`${global.flex} ${global.f_a_center} ${styles.search}`}>
              <input className={`${styles.input} ${global.base} `} type={'text'}
                     placeholder={placeholder}
                     value={value} onChange={onChange}
              />
              <img src={search} width={20} height={20} alt={'search icons'}/>
          </div>
          <div className={open ? styles.open : styles.close }>
              <ul id="colorList">
                  <li data-value="#5790E6"><b>eyes</b> by kersheys</li>
                  <li data-value="#8773EB"><b>status</b> by grandiloquent</li>
                  <li data-value="#B27CD9"><b>costume party</b> by lemonpaste</li>
                  <li data-value="#E884B0"><b>musk stix</b> by the rusty wench</li>
                  <li data-value="#EDA180"><b>cymbalic</b> by clairyfairy</li>
                  <li data-value="#EDA180"><b>cymbalic</b> by clairyfairy</li>
                  <li data-value="#EDA180"><b>cymbalic</b> by clairyfairy</li>
                  <li data-value="#EDA180">curva</li>
                  <li data-value="#EDA180">Text </li>
              </ul>
          </div>
      </div>
  )
}

export default Search