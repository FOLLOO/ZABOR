import React from 'react'

// css
import styles from './header.module.css'
import global from '../../../global.module.css'

import TransprantButton from '../../ui/buttons/transprant-button/TransprantButton'


function Header (props) {
  return (
    <header>
      <nav className={`${styles.nav} ${global.flex} ${global.f_s_between} ${global.f_ji_center} ${global.pad}`}>
        <button className={styles.logo}>
          {/*<img src={''} alt={'logo'}/>*/}
          <h3>LOGO</h3>
        </button>

        <span className={styles.search}/>

        {/*<button >*/}
        {/*  <img src={''} alt={'ring'}/>*/}
        {/*</button>*/}

        <span className={styles.profile}/>

        <div className={`${ global.flex } ${global.f_s_around} ${global.f_ji_center}`} style={{gap: 66.66}}>
          <TransprantButton text={'Регистрация'} stylee={{fontWeight: 300, fontSize: 24, fontFamily: 'Inter'}} unique={true}/>
          <TransprantButton text={'Войти'} stylee={{fontWeight: 600, fontSize: 24, fontFamily: 'Inter'}} unique={true}/>
        </div>

      </nav>
    </header>
  )
}

export default Header