import React from 'react'

// css
import styles from './header.module.css'
import global from '../../../global.module.css'

import TransprantButton from '../../ui/buttons/transprant-button/TransprantButton'
import { Link, useNavigate } from 'react-router-dom'
import Search from '../search/Search'
import ProfileNickname from '../../profile/profile-nickname/ProfileNickname'


function Header (props) {

  const navigate = useNavigate()

  return (
    <header className={props.pad ? global.pad : null}>
      <nav className={`${styles.nav} ${global.flex} ${global.f_s_between} ${global.f_ji_center} ${global.f_a_center} ${props.loginn ? global.pad : global.padRight}`}>
        <div className={styles.trap}>

        <button className={styles.logo} onClick={() => navigate('/')}>
          {/*<img src={''} alt={'logo'}/>*/}
          <h3>Z A B O R</h3>
        </button>

          {props.auth ?
          <div className={styles.search}>
            <Search/>
          </div>
          : null }
        </div>
        <div className={styles.trap2}>
          {props.auth ?
          <ProfileNickname type={'default'} nickname={'Нафис'}/>
          : null }
        </div>

        {props.loginn ?
        <div className={`${ global.flex } ${global.f_s_around} ${global.f_ji_center}`} style={{gap: 66.66}}>
          <TransprantButton
            click={() => navigate('/registration')}
            text={'Регистрация'}
            stylee={{fontWeight: 300, fontSize: 24, fontFamily: 'Inter'}}
            />
          <TransprantButton
            click={() => navigate('/login')}
            text={'Войти'}
            stylee={{fontWeight: 600, fontSize: 24, fontFamily: 'Inter'}}
            />
        </div>
          : null }
      </nav>
    </header>
  )
}

export default Header