import React, {useEffect} from 'react'

import {Link, useNavigate} from "react-router-dom";

import {useAuth} from "../../../provider/AuthProvider";
import {IMAGE_URL} from "../../../utils";

//Components
import Button from "../../ui/buttons/button/Button";
import Search from "../search/Search";
import ProfileNickname from "../../profile/profile-nickname/ProfileNickname";
import ContextDrop from "../../context-drop/ContextDrop";
import ContextGroup from "../../context-drop/context-group/ContextGroup";
import Notification from "../../notifications/Notification";

// css
import styles from './header.module.css'
import global from '../../../global.module.css'

//img
import arrow from '../../../asserts/icons/update/chevron-down.svg'
import market from '../../../asserts/icons/update/shopping-cart.svg'
import bell from '../../../asserts/icons/update/bell.svg'
import settings from '../../../asserts/icons/update/settings.svg'
import logout  from '../../../asserts/icons/update/log-out.svg'
import creative from '../../../asserts/icons/update/youtube.svg'
import create from '../../../asserts/icons/update/plus.svg'


export default function Header ({type = 'unauthorized'}) {

    const navigate = useNavigate()
    const {isAuth, user} = useAuth()
    const [notification, setNotification] = React.useState(false)
    const [profile, setProfile] = React.useState(false)
    const profileRef = React.useRef(null);
    function handleClickOutside(event){

        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setNotification(false);
            setProfile(false);
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

  const Unauthorized = () => {
    return (
        <div className={`${global.flex} ${styles.buttons}`}>
          <Button variant={'default'} size={'base'} click={() => navigate('/registration')}>
            Регистрация
          </Button>
          <Button variant={'default'} size={'base'} click={() => navigate('/login')}>
            Войти
          </Button>
        </div>
    )
  }

    const Authorized = () => {
        return (
            <div className={`${global.flex} ${styles.auth_buttons}`}>
                <div className={styles.search}>
                    <Search/>
                </div>
                <div className={`${global.flex} ${styles.buttons}`}>
                    <Button img_size={'h-5'} img={market} click={() => navigate('/basket')}/>
                    <Button img_size={'h-5'} img={bell} name={'noti'} click={() => setNotification(true)}/>
                    <div
                        className={notification ? `${styles.active} ${styles.dropdown_menu}` : `${styles.dropdown_menu} ${styles.default}`}>
                        <ContextDrop title={'Уведомления'}>
                            <ContextGroup>
                                <Notification type={'new-post'} nickname={'Hrel'} postName={'Патрики на кол'}/>
                            </ContextGroup>
                        </ContextDrop>
                    </div>
                    <Link to={`/profile/${user?.id}`}>
                        <ProfileNickname img={`${IMAGE_URL}${user?.avatar}`} type={'default'}
                                         nickname={user?.nickname ? user.nickname : null}/>
                    </Link>
                    <div ref={profileRef} className={profile ? `${styles.active} ${styles.menu}` : `${styles.menu} ${styles.default}`}>
                        <ContextDrop>
                            <ContextGroup>
                                <Link to={`/profile/${user?.id}`}>
                                    <div  className={styles.profile}>
                                        <ProfileNickname img={`${IMAGE_URL}${user?.avatar}`}
                                                         nickname={user?.nickname ? user?.nickname : null}
                                                         type={'default'}
                                                         desc/>
                                    </div>
                                </Link>
                            </ContextGroup>
                            <ContextGroup>
                                <div className={`${global.flex} ${global.f_dir_column }`}>

                                <Button img_size={'h-5'} img={creative}  click={() => navigate('/settings')}>
                                    Творческая студия
                                </Button>
                                { user?.roleId === 1 ?
                                        <Button img_size={'h-5'} img={create} click={() => navigate('/group')}>
                                            Создать публикацию
                                        </Button>
                                        :
                                        <Button img_size={'h-5'} img={create}
                                                click={() => navigate('/publications/create')}>
                                            Создать пост
                                        </Button>
                                    // <GreenButton text={'Создать публикацию'} unique click={() => navigate('/create/post')}/>
                                    }
                                </div>
                            </ContextGroup>
                            <ContextGroup noafter>
                                <div className={`${global.f_dir_column} ${global.flex}`}>
                                <Button img_size={'h-5'} img={settings} click={() => navigate('/settings/config')} className={global.f_start}>
                                    Настройки
                                </Button>
                                <Button img_size={'h-5'} img={logout} variant={'red-text'}
                                        // click={logOut}
                                >
                                    Выйти
                                </Button>
                                </div>
                            </ContextGroup>
                        </ContextDrop>
                    </div>
                    <Button img={arrow} img_size={'h-6'} size={'lg'} click={(e) => setProfile(true)}></Button>
                </div>
            </div>
        )
    }

    const renderSwitch = (param) => {
        switch (param) {
            case 'auth' :
                return <Authorized/>;
            default:
                return <Unauthorized/>;
        }
    }

    return (
        <nav className={`${global.flex} ${styles.header}`}>
            <Link to={type === 'unauthorized' ? '/' : '/publications'} className={styles.logo}>
                <h1 className={global.xl2}>zabor.inc</h1>
            </Link>
            {renderSwitch(type)}
        </nav>
    )
}

