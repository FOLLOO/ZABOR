import React, {useEffect, useRef} from 'react';

import {Outlet,  useLocation, useNavigate} from "react-router-dom";


import styles from './layouts.module.css'

//images
import menu_i from '../../asserts/icons/update/menu.svg';
//main
import home_i from '../../asserts/icons/update/home.svg';
import star_i from '../../asserts/icons/update/star.svg';
import subs_i from '../../asserts/icons/update/youtube.svg';
import heart_i from '../../asserts/icons/update/heart.svg';
import message_i from '../../asserts/icons/update/message-circle.svg';
import ruble_i from '../../asserts/icons/update/russian-ruble.svg';
//settings
import bell_i from '../../asserts/icons/update/bell.svg';
import stat_i from '../../asserts/icons/update/trending-up.svg';
import user_cog_i from '../../asserts/icons/update/user-cog.svg';
import tags_i from '../../asserts/icons/update/tags.svg';

//my components
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import Button from "../ui/buttons/button/Button";
import global from "../../global.module.css";
import {handleDialogClick, TITLE, toggleOverlay} from "../../utils";
import {Helmet} from "react-helmet";
import {useAuth} from "../../provider/AuthProvider";


/**
 *
 * @param type - значения 'settings' : для настроек 'base': для ЛК и т.д
 * @returns {Element}
 * @constructor
 */
const Layout = ({type}) => {
    const { isAuth } = useAuth();
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const leftMenuRef = useRef(null);

    function handleClickOutside(event){
        if (leftMenuRef.current && !leftMenuRef.current.contains(event.target)) {
            const leftMeny = document.getElementById('leftMenu');
            leftMeny.checked = false;
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])


    useEffect(() => {
        // Сохраняем идентификатор таймера
        const timeoutId = setTimeout(() => {
            if (!isAuth && !(pathname !== '/' || pathname !== '/login' || pathname !== '/register')) {
                navigate('/login');
            }
        }, 5000);

        // Очищаем таймер при изменении isAuth или при размонтировании компонента
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isAuth]);

    const menu = [
        {
            title: 'base',
            navigation: [
                {
                    title: 'Главная',
                    disabled: false,
                    ico: home_i,
                    function: () => navigate('/publications'),
                },
                {
                    title: 'Популярное',
                    disabled: false,
                    ico: star_i,
                    function: () => navigate(`/publications/popular`),
                },
                {
                    title: 'Подписки',
                    disabled: false,
                    ico: subs_i,
                    function: () => navigate(`/publications/subscriptions`),
                },
                {
                    title: 'Понравилось',
                    disabled: false,
                    ico: heart_i,
                    function: () => navigate(`/publications/likes`),
                },
                {
                    title: 'Обсуждаемое',
                    disabled: false,
                    ico: message_i,
                    function: () => navigate('/publications/discussed'),
                },
                {
                    title: 'Купленное',
                    disabled: false,
                    ico: ruble_i,
                    function: () => navigate('/publications/available'),
                },
            ]
        },
        {
            title: 'settings',
            navigation: [
                {
                    title: 'Главная',
                    disabled: false,
                    ico: home_i,
                    function: () => navigate('/settings/config'),
                },
                {
                    title: 'Мои интересы',
                    disabled: false,
                    ico: tags_i,
                    function: () => navigate('/settings/group'),
                },
                {
                    title: 'Рекомендации автора',
                    disabled: false,
                    ico: tags_i,
                    function: () => navigate('/settings/author/group'),
                },
                {
                    title: 'Подписки',
                    disabled: false,
                    ico: subs_i,
                    function: () => navigate('/settings/subscribes'),
                },
                {
                    title: 'Уведомления',
                    disabled: false,
                    ico: bell_i,
                    function: () => navigate('/settings/notifications'),
                },
                {
                    title: 'Аналитика',
                    disabled: true,
                    ico: stat_i,
                    function: () => navigate('/settings'),
                },
                {
                    title: 'Личный кабинет',
                    disabled: false,
                    ico: user_cog_i,
                    function: () => navigate('/settings/config'),
                },
            ]
        }
    ]
    /**
     * Возвращает шаблон SideBara необходимые условия для работы // type // menu //
     * @returns {Element}
     * @constructor
     */
    const LeftMenu = () => {
        return (
            <div className={styles.navbar} ref={leftMenuRef}>
                <div className={styles.menu_buttons}>
                    <label htmlFor="leftMenu"
                           className={styles.menu}>
                        <img src={menu_i} height={20} width={20} alt="menu" />
                        <span>МенюМеню</span>
                        {/*<Button img={menu_i} size={'2xl'} variant={'nt'} />*/}
                    </label>
                    {menu
                        .find(item => item.title === type)
                        ?.navigation.map((item, i) => (
                            <Button img={item.ico} key={'LeftMenuButton' + i} img_size={'h-5'} disabled={item.disabled} variant={'default'} text_id={'span'} className={styles.flex}
                                    click={item.function}>{item.title}</Button>
                        )) || null
                    }
                </div>
            </div>
        )
    }
    /**
     * Возвращает классический шаблон
     * @returns {Element}
     * @constructor
     */
    const Base = () => {
        return (
            <div className={styles.column_flex} id={'column'}>
                <div className={styles.row_flex}>
                    <input className={styles.sidebar_input} type="checkbox" name="leftMenu" id="leftMenu" />
                    <LeftMenu/>
                    <div className={`${styles.column_flex} ${styles.zIndex}`}>
                        <Header type={'auth'}/>
                        <Outlet/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
    /**
     * Возвращает шаблон для неавторизованных пользователей
     * @returns {Element}
     * @constructor
     */
    const NotAuth = () => {
        return (
            <>
                <div className={styles.header}>
                    <Header type={'unauthorized'}/>
                </div>
                <Outlet/>
                {/*<Footer noStick/>*/}
            </>
        )
    }
    /**
     *
     * @param param - принимает значения из type
     * @returns {Element}
     * @example
     * { renderSwitch(type) } // type: settings, base, default(NotAuth)
     */
    const renderSwitch = (param) => {
        switch (param) {
            case 'settings' :
                return <Base/>;
            case 'base' :
                return <Base/>
            default:
                return <NotAuth/>;
        }
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{TITLE} | Настройки</title>
                <meta name="description" content="Натсрйки"/>
                <meta name="keywords" content="HTML, CSS, JavaScript"/>
                <meta name="author" content="Sairommef"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>
            {renderSwitch(type)}
            <dialog id={'addToBasket'} className={styles.dialog} onClick={(e) => handleDialogClick(e, 'addToBasket')} >
                <div className={`${styles.message} ${global.flex} ${global.f_dir_column}`}>
                    <div className={styles.support}>
                        <h1 className={global.xl3}>Добавлено в корзину!</h1>
                        <p className={global.d3}>Удалить пост можно будет в корзине</p>
                    </div>
                    <div className={`${global.flex} ${global.f_dir_column}`} style={{gap: '1rem'}}>
                        <Button variant={'outlet'} click={() => toggleOverlay('addToBasket')}
                                className={`${global.w100} ${global.f_center}`}>
                            Продолжить покупки
                        </Button>
                        <Button variant={'color'} type={'submit'}
                                className={`${global.w100} ${global.f_center}`}
                                click={() => {
                                    navigate('/basket')
                                    toggleOverlay('addToBasket')
                                }}>
                            Перейти в корзину
                        </Button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Layout
