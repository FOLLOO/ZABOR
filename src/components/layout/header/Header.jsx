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
import bell from '../../../asserts/icons/contextMenu/BELL4.svg'
import tempIcon from '../../../asserts/icons/Файл.svg'
import settings from '../../../asserts/icons/Settings.svg'
import logout from '../../../asserts/icons/LogOut.svg'
import hole from '../../../asserts/icons/Творческая студия.svg'
import Notification from '../../notifications/Notification'
import UserService from '../../../services/UserService'
import { useAuth } from '../../../provider/AuthProvider'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGE_URL } from '../../../utils'
import { getNotifications } from '../../../redux/slices/notifications'
import Loading from '../../../pages/loading/Loading'
import Nothing from '../../../pages/nothing/Nothing'


function Header (props) {
  const { isAuth, user } = useAuth()
  const { notification } = useSelector(state => state.noti)

  const cartItems = useSelector((state) => state?.cart.items)
  const dispatch = useDispatch();

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

  const getNoti = () => {
    try{
      dispatch(getNotifications())
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    // Устанавливаем интервал в 10 минут (600000 миллисекунд)
    const interval = setInterval(getNoti, 600000);
    // const interval = setInterval(getNoti, 1000);
    // console.log(notification)

    // Возвращаем функцию очистки, чтобы остановить таймер при размонтировании компонента
    return () => clearInterval(interval);
  }, []);


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
              <div className={styles.btns}>
              <button className={styles.btn}  onClick={() => navigate('/market')}>
                <img  src={bascket} alt={'arrow'} className={styles.ima}/>
                {cartItems?.length > 0 ?
                <div className={styles.count_span}>{cartItems?.length}</div>
                  : null }
              </button>

              <button className={styles.btn}  onClick={() => {getNoti(); setNotifications(!notifications);}}>
                <img  src={bell} className={styles.ima} alt={'arrow'}/>
                {notifications.length > 0 ?
                <div className={styles.count_span}>{notifications.length}</div>
                : null}
              </button>
              </div>

              {
                notifications ?
                  <div className={`${styles.notifications} ${global.shadowBliz}`}  ref={ref}>
                    <ContextDrop title={'Уведомления'}>
                      {notifications.length > 0 ? notifications.map((item) => (
                          <ContextGroup>
                         <Notification type={'new-post'} nickname={'Hrel'} postName={'Патрики на кол'}/>
                          </ContextGroup>
                      )) :
                        <ContextGroup noafter >
                          <Nothing/>
                        </ContextGroup>
                      }

                     {/*<ContextGroup>*/}
                     {/* <Notification type={'new-post'} nickname={'Hrel'} postName={'Патрики на кол'}/>*/}
                     {/*</ContextGroup>*/}
                     {/* <ContextGroup>*/}
                     {/*   <Notification type={'new-post'} nickname={'Hrel'} postName={'Патрики на кол'}/>*/}
                     {/* </ContextGroup>*/}
                     {/* <ContextGroup>*/}
                     {/*   <Notification type={'new-post'} nickname={'Hrel'} postName={'Патрики на кол'}/>*/}
                     {/* </ContextGroup>*/}
                     {/* <ContextGroup>*/}
                     {/*   <Notification type={'new-post'} nickname={'Hrel'} postName={'Патрики на кол'}/>*/}
                     {/* </ContextGroup>*/}
                     {/* <ContextGroup>*/}
                     {/*   <Notification type={'new-post'} nickname={'Hrel'} postName={'Патрики на кол'}/>*/}
                     {/* </ContextGroup>*/}

                    </ContextDrop>
                  </div>
                  : null
              }
              <div className={`${global.flex} ${styles.gap}`}>
              <Link to={`/profile/${user?.id}`}>
                <ProfileNickname img={`${IMAGE_URL}${user?.avatar}`}  type={'default'} nickname={user?.nickname ? user.nickname : null}/>
              </Link>
              {/*<TransprantButton noPad img={arrowMenu} click={() => setMenu(!menu)}/>*/}
              <button  onClick={() => setMenu(!menu)}>
                <img  src={arrowMenu} alt={'arrow'}/>
              </button>
              </div>
                {
                menu ?
                    <div className={`${styles.contextMenu} ${global.shadowBliz}`} ref={ref}>
                      <ContextDrop>
                        <ContextGroup>
                          <Link to={`/profile/${user?.id}`}>
                            <div  className={styles.profile}>
                            <ProfileNickname img={`${IMAGE_URL}${user?.avatar}`} nickname={user?.nickname ? user?.nickname : null} type={'default'} desc/>
                            </div>
                          </Link>
                        </ContextGroup>
                        <ContextGroup>
                          <TransprantButton img={hole} text={'Творческая студия'} left click={() => navigate('/settings/creative_studio')} />
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