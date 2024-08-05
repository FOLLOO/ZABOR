import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../layout/header/Header'
import Footer from '../layout/footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'

import global from '../../global.module.css'
import styles from './layouts.module.css'
import TransprantButton from '../ui/buttons/transprant-button/TransprantButton'
import { OverlayContext, OverlayContextProvider } from '../../context/OverlayContext'


import  analytychs from '../../asserts/icons/settingsMenu/Analytics.svg'
import  bar from '../../asserts/icons/settingsMenu/BarMenu.svg'
import  outlet_bell from '../../asserts/icons/settingsMenu/outlet-bell.svg'
import  outlet_bell1 from '../../asserts/icons/settingsMenu/outlet-bell2.svg'
import  profile from '../../asserts/icons/settingsMenu/Profile.svg'
import  subes from '../../asserts/icons/settingsMenu/Subes.svg'
import  tag from '../../asserts/icons/settingsMenu/tags1.svg'

import  main from '../../asserts/icons/mainMenu/Главная.svg'
import  buyed from '../../asserts/icons/mainMenu/Кулпенное.svg'
import  comments from '../../asserts/icons/mainMenu/Обсуждаемое.svg'
import  liked from '../../asserts/icons/mainMenu/Понравилось.svg'
import  popular from '../../asserts/icons/mainMenu/Популярное.svg'


const Layout = ({type,
  // login = false,
  // isAuth = false
}) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { overlay, setOverlay } = useContext(OverlayContext)

  const openRef = useRef(false);

  const toggleMenu = () => {
    openRef.current = !openRef.current;
    const gridClass = openRef.current ? styles.grid : styles.grid2;
    document.querySelector("#menuContainer").className = gridClass;
  };

  const Login = () => {
    return (
      <>
        <Header pad/>
        <Outlet/>
      </>
    )
  }
  const NotAuth = () => {
    return (
      <>
        <div className={styles.header}>
        <Header loginn/>
        </div>
        <Outlet/>
        <Footer noStick/>
      </>
    )
  }
  const Auth = () => {
    return (
      <>
        <div className={`${styles.grid2}`} id={'menuContainer'}>
          <div className={styles.leftHand}>
            <div className={`${global.flex} ${global.f_dir_column} ${styles.buttons}`}>
              <TransprantButton left img={bar} click={toggleMenu} />
              <TransprantButton left img={main} text={'Главная'}/>
              <TransprantButton left img={popular} text={'Популярное'} />
              <TransprantButton left img={comments} text={'Обсуждаемое'} />
              <TransprantButton left img={subes} click={() => setOverlay(!overlay)} text={'Подписки'} />
              <TransprantButton left img={liked} text={'Понравилось' } />
              <TransprantButton left img={buyed} text={'Купленное' } />
            </div>
          </div>
          <div className={styles.header}>
            <Header auth/>
          </div>
          <div className={styles.content}>
            <Outlet/>
          </div>
          <div className={styles.footer}>
            <Footer/>
          </div>

        </div>
      </>
    )
  }
  const Settings = () => {
    return (
      <div className={open ? styles.grid : styles.grid2}>
        <div className={styles.leftHand}>
          <div className={`${global.flex} ${global.f_dir_column}`}>
            {/*<span style={{height: '1vh'}}/>*/}
            <TransprantButton left img={bar}
                              text={open ? 'Меню' : null}
                              click={() => setOpen(!open)}/>
            <span style={{height: '1vh'}}/>
            <TransprantButton left img={analytychs}
                              text={open ? 'Творческая студия' : null}
            click={() => navigate('/anal')}
            />
            <TransprantButton left img={profile}
                              text={open ? 'Личная информация' : null}
            click={() => navigate('/settings/myprofile')}
            />
            <TransprantButton left img={subes}
                              text={open ? 'Подписки' : null}
            click={() => navigate('/settings/mysubs')}
            />
            <TransprantButton left img={outlet_bell1}
                              text={open ? 'Уведомления' : null}
            click={() => navigate('/settings/mynoti')}
            />
            <TransprantButton left img={tag}
                              text={open ? 'Теги' : null}
            click={() => navigate('/group')}
            />
          </div>
        </div>
        <div className={styles.header}>
        <Header auth settings/>
        </div>
        <div className={styles.content}>
          <Outlet/>
        </div>
        <div className={styles.footer}>
          {/*<Footer/>*/}
        </div>

      </div>
    )
  }
  const Form = () => {
    return (
      <>
        <Header auth pad/>
        <Outlet/>
      </>
    )
  }
  const renderSwitch = (param) => {
    switch (param){
      case 'settings' :
        return <Settings/>;
      case 'login' :
        return <Login/>
      case 'notAuth' :
        return <NotAuth/>
      case 'auth' :
        return <Auth/>
      case 'form' :
        return <Form/>
      default:
        return <h1> Ой!<br/> Ничего нет.</h1>;
    }
  }

  return (
    <>
      { overlay ?
        <>
        <div className={styles.overlay}>
          {/*FICHA*/}
          <h5 onClick={() => setOverlay(!overlay)}> close </h5>
        </div>
        <div className={styles.overlayActive}>
          {renderSwitch(type)}
        </div>
        </>
      :
        <>
          {renderSwitch(type)}
        </>
      }

    </>
  )
}

export default Layout