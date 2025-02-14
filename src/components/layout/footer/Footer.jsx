import React from 'react'

import styles from './footer.module.css'
import global from '../../../global.module.css'

import logo from '../../../asserts/logo2.svg'
import hello_emoji from '../../../asserts/emoji/hello.png'
import eye_emoji from '../../../asserts/emoji/eye.png'
import whatsapp from '../../../asserts/icons/update/whatsapp.svg'
import email from '../../../asserts/icons/update/email.svg'

import {Link} from "react-router-dom";

function Footer ({noStick}) {
  return (
    <footer className={noStick ? styles.frodo : styles.footer}>
      <div className={styles.content}>
        <h2>Заработок · Посты · Поддержка</h2>
        <div className={`${global.d2} ${styles.description}`}>
          Мы — платформа, где авторы и творческие проекты встречают своих поддерживающих.
          Здесь каждый может создать кампанию, делиться своими идеями и получать поддержку от сообщества.
        </div>
        <div className={styles.buttons}>
          <button className={styles.whiteButton}>
            <div className={styles.b_content}>
              <img alt={'eye'} src={eye_emoji} width={22}/>
              <div className={`${global.t1} ${global.medium}`}>
                Документы
              </div>
            </div>
          </button>
          <button className={styles.whiteButton}>
            <div className={styles.b_content}>
              <img alt={'eye'} src={hello_emoji} width={22}/>
              <div className={`${global.t1} ${global.medium}`}>
                Контакты
              </div>
            </div>
          </button>
        </div>
        <hr className={styles.hr}/>
        <div className={styles.coopiryte}>
          <div className={`${styles.block} ${global.flex}`}>
            <img className={styles.logo} src={logo} alt={'logo'}/>
          </div>
          <div className={styles.block}>
            <div className={`${global.d3} ${styles.c_text}`}>
              © 2024 АЙМАНИ. Все права защищены.
            </div>
          </div>
          <div className={`${styles.block} ${global.flex} ${global.f_end} ${global.f_a_center}`}>
            <div className={styles.buttons}>
              <Link to={'tel: +79534911711'} className={styles.button}>
                <img alt={'eye'} src={whatsapp} width={24}/>
              </Link>
              <Link to={'tel: +79534911711'} className={styles.button}>
                <img alt={'eye'} src={email} width={24}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer