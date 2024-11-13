import React, {useContext} from 'react';

import {Outlet, useNavigate} from "react-router-dom";


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
import {OverlayContext} from "../../context/OverlayContext";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import Button from "../ui/buttons/button/Button";
import global from "../../global.module.css";
import {toggleOverlay} from "../../utils";


/**
 *
 * @param type - значения 'settings' : для настроек 'base': для ЛК и т.д
 * @returns {Element}
 * @constructor
 */
const Layout = ({type}) => {

    //todo: исправить overlay
    const {overlay, setOverlay} = useContext(OverlayContext)
    const navigate = useNavigate()


    /**
     *
     * @example
     * const menu = {
     *             title: 'base',
     *             navigation: [
     *                 {
     *                     title: 'Главная',
     *                     ico: home_i,
     *                     function: () => navigate('/'),
     *                 },
     *            ]
     * },
     * {
     *             title: 'settings',
     *             navigation: [
     *                 {
     *                     title: 'Главная',
     *                     ico: home_i,
     *                     function: () => navigate('/'),
     *                 },
     *            ]
     * },
     */
    const menu = [
        {
            title: 'base',
            navigation: [
                {
                    title: 'Главная',
                    ico: home_i,
                    function: () => navigate('/'),
                },
                {
                    title: 'Популярное',
                    ico: star_i,
                    function: () => navigate('/popular'),
                },
                {
                    title: 'Подписки',
                    ico: subs_i,
                    function: () => navigate('/subscribed'),
                },
                {
                    title: 'Понравилось',
                    ico: heart_i,
                    function: () => navigate('/liked'),
                },
                {
                    title: 'Обсуждаемое',
                    ico: message_i,
                    function: () => navigate('/talk'),
                },
                {
                    title: 'Купленное',
                    ico: ruble_i,
                    function: () => navigate('/bought'),
                },
            ]
        },
        {
            title: 'settings',
            navigation: [
                {
                    title: 'Главная',
                    ico: home_i,
                    function: () => navigate('/settings'),
                },
                {
                    title: 'Теги',
                    ico: tags_i,
                    //todo: изменить роутинг в group
                    function: () => navigate('/settings/group'),
                },
                {
                    title: 'Подписки',
                    ico: subs_i,
                    //todo: изменить роутинг в subs
                    function: () => navigate('/settings/subscribes'),
                },
                {
                    title: 'Уведомления',
                    ico: bell_i,
                    function: () => navigate('/settings/notifications'),
                },
                {
                    title: 'Аналитика',
                    ico: stat_i,
                    function: () => navigate('/settings'),
                },
                {
                    title: 'Личный кабинет',
                    ico: user_cog_i,
                    function: () => navigate('/settings/config'),
                },
                {
                    title: 'overlay',
                    ico: null,
                    function:() => setOverlay(!overlay),
                }
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
            <div className={styles.navbar}>
                <div className={styles.menu_buttons}>
                    <label htmlFor="leftMenu"
                           className={styles.menu}>
                        <img src={menu_i} height={20} width={20} alt="menu" />
                        <span>МенюМеню</span>
                        {/*<Button img={menu_i} size={'2xl'} variant={'nt'} />*/}
                    </label>
                    {menu
                        .find(item => item.title === type)
                        ?.navigation.map((item) => (
                            <Button img={item.ico} img_size={'h-5'} size={'base'} variant={'default'} text_id={'span'} className={styles.flex}
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
            <div className={styles.column_flex}>
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
            {/*{overlay ?*/}
            {/*    <>*/}
            {/*        <div className={styles.overlay}>*/}
            {/*            /!*FICHA*!/*/}
            {/*            <h5 onClick={() => setOverlay(!overlay)}> close </h5>*/}
            {/*        </div>*/}
            {/*        <div className={styles.overlayActive}>*/}
            {/*            {renderSwitch(type)}*/}
            {/*        </div>*/}
            {/*    </>*/}
            {/*    :*/}
                <>
                    {renderSwitch(type)}

                    <dialog id={'addToBasket'} className={styles.dialog} onClick={() => toggleOverlay('addToBasket')}>
                        <div className={`${styles.message} ${global.flex} ${global.f_dir_column}`}>
                                <div className={styles.support}>
                                    <h1 className={global.xl3}>Добавлено  в  корзину!</h1>
                                    <p className={global.d3}>Удалить пост можно будет в корзине</p>
                                </div>
                            <div className={`${global.flex} ${global.f_dir_column}`} style={{gap: '1rem'}}>
                                <Button variant={'outlet'}
                                        className={`${global.w100} ${global.f_center}`}>
                                    Продолжить покупки
                                </Button>
                                <Button variant={'color'} type={'submit'}
                                        className={`${global.w100} ${global.f_center}`}
                                        onClick={() => navigate('/basket')}>
                                    Перейти в корзину
                                </Button>
                            </div>
                        </div>
                    </dialog>
                </>
            {/*}*/}
        </div>
    );
};

export default Layout
