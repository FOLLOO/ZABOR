import React, {useEffect, useState, useRef, useCallback} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import {useAuth} from "../../../provider/AuthProvider";
import {IMAGE_URL, stop, TITLE} from "../../../utils";
import {getBasket} from "../../../redux/slices/basketAPI";

//Components
import Button from "../../ui/buttons/button/Button";
import Search from "../search/Search";
import LittleTag from "../../ui/input/little-tag/LittleTag";
import ProfileNickname from "../../profile/profile-nickname/ProfileNickname";
import ContextDrop from "../../context-drop/ContextDrop";
import ContextGroup from "../../context-drop/context-group/ContextGroup";
import Notification from "../../notifications/Notification";

// css
import styles from './header.module.css'
import global from '../../../global.module.css'

//img
import logo from '../../../logo.svg'
import arrow from '../../../asserts/icons/update/chevron-down.svg'
import market from '../../../asserts/icons/update/shopping-cart.svg'
import bell from '../../../asserts/icons/update/bell.svg'
import settings from '../../../asserts/icons/update/settings.svg'
import logout from '../../../asserts/icons/update/log-out.svg'
import creative from '../../../asserts/icons/update/youtube.svg'
import create from '../../../asserts/icons/update/plus.svg'
import menu_i from "../../../asserts/icons/update/menu.svg";
import searching from '../../../asserts/icons/update/search_black.svg'
import {getNotifications, readAll} from "../../../redux/slices/like";
import NothingYet from "../../../pages/nothing/nothing-yet/NothingYet";


export default function Header({type = 'unauthorized'}) {

    const {isAuth, user, logOut} = useAuth()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [notification, setNotification] = useState(false)
    const [profile, setProfile] = useState(false)

    const profileRef = useRef(null);
    const notiRef = useRef(null);

    // const cartItems = useSelector((state) => state.cart.items)

    const cartItems = useSelector((state) => state.cart.basket)
    const notificationsItems = useSelector((state) => state.noti.notification)
    const functionGetBasket = () => {
        try {
            dispatch(getBasket())
        } catch (e) {
            console.log(e)
        }
    }
    const functionGetNotifications = () => {
        try {
            dispatch(getNotifications())
        }catch (e) {
            console.log(e)
        }
    }

    const readAllnotifications = () => {
        try{
            dispatch(readAll())
        }catch (e) {
            console.log(e)
        }
    }

    function handleClickOutside(event) {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setProfile(false);
        }
        if (notiRef.current && !notiRef.current.contains(event.target)) {
            setNotification(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])


    function clickLogOut() {
        try {
            logOut()
            stop()
            navigate('/login')
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if(!isAuth) return;
        else{
            functionGetBasket();
        }
    }, []);

    const Unauthorized = () => {
        return (
            type === 'documentation' ? null :
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
//todo: UserInterestes RUD -> app.js and authorInterestes
    const Authorized = () => {
        return (
            <div className={`${global.flex} ${styles.auth_buttons}`}>
                <div className={styles.search}>
                    <Search main />
                </div>
                <div className={styles.search_mibil}>
                    <Button img={searching} img_size={'paddingNULL'}
                            click={() => navigate('/search')}>

                    </Button>
                </div>
                <div className={`${global.flex} ${styles.buttons}`}>
                    <div className={styles.desctopButtons}>
                        <div className={styles.button_abs}>
                            <Button img_size={'h-5'} img={market} click={() => navigate('/basket')}/>
                            {cartItems.items.length === 0 ? null :
                                <span className={styles.basketCount}>{cartItems.items.length}</span>
                            }
                        </div>
                        <div className={styles.button_abs}>
                            <Button img_size={'h-5'} img={bell} name={'noti'} click={() => {
                                setNotification(true)
                                functionGetNotifications();
                            }}/>
                            {notificationsItems.items.filter(id => id.read === false).length === 0  ? null :
                                <span className={styles.basketCount}>{notificationsItems.items.filter(id => id.read === false).length}</span>
                            }
                        </div>
                    </div>

                    <div ref={notiRef} className={notification ?
                        `${styles.active} ${styles.dropdown_menu}` :
                        `${styles.dropdown_menu} ${styles.default}`}>
                        <ContextDrop title={'Уведомления'}>
                            <Button variant={'outlet'} type={'button'} click={() => readAllnotifications()}>Пометить прочитанным</Button>
                            <ContextGroup noafter>
                                <div className={styles.notificationsList}>
                                {notificationsItems.items.length > 0 ?
                                    notificationsItems.items.map((noti, i) => (
                                        <Notification type={'new-post'} read={noti.read} postName={noti.notification_text} date={noti.createdAt} key={'Not' + i + Math.floor(Math.random() * 10) +  i}/>
                                    ))
                                : <NothingYet text={'Уведомлений нет'}/> }
                                </div>
                            </ContextGroup>
                        </ContextDrop>
                    </div>
                    <Link to={`/profile/${user?.id}`}>
                        <ProfileNickname img={user?.avatar ? `${IMAGE_URL}${user.avatar}` : null} type={'default'}
                                         nickname={user?.nickname ? user.nickname : null}/>
                    </Link>
                    <div ref={profileRef}
                         className={profile ? `${styles.active} ${styles.menu}` : `${styles.menu} ${styles.default}`}>
                        <ContextDrop>
                            <ContextGroup>
                                <Link to={`/profile/${user?.id}`}>
                                    <div className={styles.profile}>
                                        <ProfileNickname img={user?.avatar ? `${IMAGE_URL}${user.avatar}` : null}
                                                         nickname={user?.nickname ? user?.nickname : null}
                                                         type={'default'}
                                                         desc/>
                                    </div>
                                </Link>
                            </ContextGroup>
                            <ContextGroup>
                                <div className={`${global.flex} ${global.f_dir_column}`}>

                                    <Button img_size={'h-5'} img={creative} click={() => navigate('/settings')} disabled>
                                        Творческая студия
                                    </Button>
                                    {user?.roleId === 1 ?
                                        <Button img_size={'h-5'} img={create} click={() => navigate('/select/author/group_tags')}>
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
                            <div className={styles.mobileButtons}>
                                <ContextGroup>
                                    <div className={`${global.f_dir_column} ${global.flex}`}>
                                        <Button img_size={'h-5'} img={market} click={() => navigate('/basket')}
                                                className={global.f_start}>
                                            Корзина
                                        </Button>
                                        <Button img_size={'h-5'} img={bell} name={'noti'}
                                                click={() => {
                                                    setProfile(false)
                                                    setNotification(true)
                                                    functionGetNotifications();

                                                }}>
                                            Уведомления
                                        </Button>
                                    </div>
                                </ContextGroup>
                            </div>
                            <ContextGroup noafter>
                                <div className={`${global.f_dir_column} ${global.flex}`}>
                                    <Button img_size={'h-5'} img={settings} click={() => navigate('/settings/config')}
                                            className={global.f_start}>
                                        Настройки
                                    </Button>
                                    <Button img_size={'h-5'} img={logout} variant={'red-text'}
                                            click={clickLogOut}>
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
        <nav className={`${global.flex} ${type === 'unauthorized' ? styles.headerPadding : styles.header}`}>
            <div className={`${global.flex} ${styles.headerChild}`}>
                <label className={`${styles.b_width} ${styles.openMenu}`} htmlFor={'leftMenu'}>
                    <img src={menu_i}/>
                </label>
                <Link to={type === 'unauthorized' ? '/' : '/publications'} className={styles.logo}>
                    <img src={logo} alt={''} className={styles.logoImage}/>
                    <h1 className={`${global.xl} ${styles.logo_text} ${global.bold}`}>{TITLE}</h1>
                </Link>
            </div>
            {renderSwitch(type)}
        </nav>
    )
}

