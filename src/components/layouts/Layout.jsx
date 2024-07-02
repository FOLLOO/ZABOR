import React, { useState } from 'react'
import Header from '../layout/header/Header'
import Footer from '../layout/footer/Footer'
import { Outlet } from 'react-router-dom'

import global from '../../global.module.css'
import styles from './layouts.module.css'
import TransprantButton from '../ui/buttons/transprant-button/TransprantButton'
const Layout = ({type,
  // login = false,
  // isAuth = false
}) => {

  const [open, setOpen] = useState(false)
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
        <Footer/>
      </>
    )
  }
  const Auth = () => {
    return (
      <>
        <div className={open ? styles.grid : styles.grid2}>
          <div className={styles.leftHand}>
            <div className={`${global.flex} ${global.f_dir_column}`}>
              <TransprantButton text={'Some'} click={() => setOpen(!open)}/>
              <TransprantButton text={'Some'}/>
              <TransprantButton text={'Some'}/>
              <TransprantButton text={'Some'}/>
              <TransprantButton text={'Some'}/>
              <TransprantButton text={'Some'}/>
              <TransprantButton text={'Some'}/>
              <TransprantButton text={'Some'}/>
              <TransprantButton text={'Some'}/>
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
            <TransprantButton text={'Some'} click={() => setOpen(!open)}/>
            <TransprantButton text={'Some'}/>
            <TransprantButton text={'Some'}/>
            <TransprantButton text={'Some'}/>
            <TransprantButton text={'Some'}/>
            <TransprantButton text={'Some'}/>
            <TransprantButton text={'Some'}/>
            <TransprantButton text={'Some'}/>
            <TransprantButton text={'Some'}/>
          </div>
        </div>
        <div className={styles.header}>
        <Header auth/>
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
    <div>
      {renderSwitch(type)}
    </div>
  )
}

export default Layout