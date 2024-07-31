import React, { useEffect, useRef, useState } from 'react'

// css
import styles from './header.module.css'
import global from '../../../global.module.css'

import TransprantButton from '../../ui/buttons/transprant-button/TransprantButton'
import { Link, useNavigate } from 'react-router-dom'
import Search from '../search/Search'
import ProfileNickname from '../../profile/profile-nickname/ProfileNickname'

import ContextGroup from '../../context-drop/context-group/ContextGroup'
import ContextDrop from '../../context-drop/ContextDrop'


import bascket from '../../../asserts/icons/basket.svg'
import arrowMenu from '../../../asserts/icons/arowMenu.svg'
import bell from '../../../asserts/icons/settingsMenu/outlet-bell2.svg'
import tempIcon from '../../../asserts/icons/Файл.svg'
import settings from '../../../asserts/icons/Settings.svg'
import logout from '../../../asserts/icons/LogOut.svg'
import hole from '../../../asserts/icons/Творческая студия.svg'
import Notification from '../../notifications/Notification'
import UserService from '../../../services/UserService'
import { useAuth } from '../../../provider/AuthProvider'
import { useSelector } from 'react-redux'


function Header (props) {
  const { isAuth, user } = useAuth()

  const cartItems = useSelector((state) => state.cart.items)

  const navigate = useNavigate()
  const [menu , setMenu] = useState(false)
  const [notifications , setNotifications] = useState(false)

  const ref = useRef(null);

  // const market_count = ;


  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target))
      setMenu(false)
    setNotifications(false)
  }

  const logOut = async () => {
    const response = await UserService.logout()

    if (response.status === 200){
      alert('вы вышли из своего аккаунта')
      navigate('/login')
      // console.log({ succses: true })
    }
  }

  const mainLink = (param) => {
   return param ? navigate('/main') : navigate('/')
  }


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


  return (
    <header className={props.pad ? global.pad : props.settings ? styles.settings : null}>
      <nav className={`${styles.nav} ${global.flex} ${global.f_s_between} ${global.f_ji_center} ${global.f_a_center} ${props.loginn ? global.pad : global.padRight}`}>
        <div className={styles.trap}>

        <button className={styles.logo} onClick={() => mainLink(isAuth)}>
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
            <>
              <TransprantButton notification={cartItems?.length} img={bascket} click={() => navigate('/market')}/>
              <TransprantButton notification={cartItems?.length} img={bell} click={() => setNotifications(!notifications)}/>
              {
                notifications ?
                  <div className={`${styles.notifications} ${global.shadowBliz}`}  ref={ref}>
                    <ContextDrop title={'Уведомления'}>
                      {/*<ContextGroup noafter>*/}
                      {/*  <div className={global.h3}>*/}
                      {/*   <h3>Уведомления</h3>*/}
                      {/*  </div>*/}
                      {/*</ContextGroup>*/}
                     <ContextGroup>
                      <Notification type={'new-post'} nickname={'Hrel'} postName={'Патрики на кол'}/>
                     </ContextGroup>
                      <ContextGroup>
                        <Notification type={'new-post'} nickname={'Hrel'} postName={'Патрики на кол'}/>
                      </ContextGroup>
                      <ContextGroup>
                        <Notification type={'new-post'} nickname={'Hrel'} postName={'Патрики на кол'}/>
                      </ContextGroup>
                      <ContextGroup>
                        <Notification type={'new-post'} nickname={'Hrel'} postName={'Патрики на кол'}/>
                      </ContextGroup>
                      <ContextGroup>
                        <Notification type={'new-post'} nickname={'Hrel'} postName={'Патрики на кол'}/>
                      </ContextGroup>

                    </ContextDrop>
                  </div>
                  : null
              }
              <Link to={`/profile/${user?.id}`}>
              <ProfileNickname type={'default'} nickname={user?.nickname ? user.nickname : null}/>
              </Link>
              <TransprantButton img={arrowMenu} click={() => setMenu(!menu)}/>
              {
                menu ?
                    <div className={`${styles.contextMenu} ${global.shadowBliz}`} ref={ref}>
                      <ContextDrop>
                        <ContextGroup>
                          <Link to={`/profile/${user?.id}`}>
                            <ProfileNickname nickname={user?.nickname ? user?.nickname : null} type={'default'} desc/>
                          </Link>
                        </ContextGroup>
                        <ContextGroup>
                          <TransprantButton img={hole} text={'Творческая студия'} left />
                        </ContextGroup>
                        <ContextGroup noafter>
                          <TransprantButton img={settings} text={'Настройки'} left click={() => navigate('/settings/myprofile')}/>
                          <TransprantButton img={logout} text={'Выйти'} red left click={logOut}/>
                        </ContextGroup>
                      </ContextDrop>
                    </div>
                : null
              }

            </>
          : null }
        </div>

        {props.loginn ?
        <div className={`${ global.flex } ${global.f_s_around} ${global.f_ji_center}`} style={{gap: 66.66}}>
          <TransprantButton
            click={() => navigate('/registration')}
            text={'Регистрация'}
            />
          <TransprantButton
            click={() => navigate('/login')}
            text={'Войти'}
            />
        </div>
          : null }
      </nav>
    </header>
  )
}

export default Header