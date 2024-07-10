import React, { useContext, useState } from 'react'
import Header from '../layout/header/Header'
import Footer from '../layout/footer/Footer'
import { Outlet } from 'react-router-dom'

import global from '../../global.module.css'
import styles from './layouts.module.css'
import TransprantButton from '../ui/buttons/transprant-button/TransprantButton'
import { OverlayContext, OverlayContextProvider } from '../../context/OverlayContext'


import  analytychs from '../../asserts/icons/settingsMenu/Analytics.svg'
import  bar from '../../asserts/icons/settingsMenu/BarMenu.svg'
import  outlet_bell from '../../asserts/icons/settingsMenu/outlet-bell.svg'
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

  const [open, setOpen] = useState(false)
  const { overlay } = useContext(OverlayContext)
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
        <div className={open ? styles.grid : styles.grid2}>
          <div className={styles.leftHand}>
            <div className={`${global.flex} ${global.f_dir_column}`}>
              <TransprantButton img={bar}  click={() => setOpen(!open)}/>
              <TransprantButton img={main} text={open ? 'Главная' : null}/>
              <TransprantButton img={subes} text={open ?'Подписки' : null}/>
              <TransprantButton img={liked} text={open ?'Понравилось' : null}/>
              <TransprantButton img={popular} text={open ?'Популярное': null}/>
              <TransprantButton img={comments} text={open ?'Обсуждаемое': null}/>
              <TransprantButton img={buyed} text={open ? 'Купленное': null}/>
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
            <TransprantButton img={bar} click={() => setOpen(!open)}/>
            <TransprantButton img={analytychs} text={open ? 'Творческая студия' : null}/>
            <TransprantButton img={profile} text={open ? 'Личная информация' : null}/>
            <TransprantButton img={subes} text={open ? 'Подписки' : null}/>
            <TransprantButton img={outlet_bell} text={open ? 'Уведомления' : null}/>
            <TransprantButton img={tag} text={open ? 'Теги' : null}/>
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