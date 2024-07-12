import React from 'react'

import styles from './footer.module.css'
import global from '../../../global.module.css'

import logo from '../../../asserts/logo.svg'
import hello_emoji from '../../../asserts/emoji/hello.png'
import eye_emoji from '../../../asserts/emoji/eye.png'

import WhiteButton from '../../ui/buttons/white-button/WhiteButton'
import whiteButton from '../../ui/buttons/white-button/WhiteButton'

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
              <img src={eye_emoji} width={22}/>
              <div className={`${global.t1} ${global.medium}`}>
                Документы
              </div>
            </div>
          </button>
          <button className={styles.whiteButton}>
            <div className={styles.b_content}>
              <img src={hello_emoji} width={22}/>
              <div className={`${global.t1} ${global.medium}`}>
                Контакты
              </div>
            </div>
          </button>
          {/*<WhiteButton img={eye_emoji} img_width={22} text={'Документы'} stylee={{padding: "6px 20px", borderRadius: "20px"}}/>*/}
          {/*<WhiteButton img={hello_emoji} img_width={22} text={'Контакты'}/>*/}
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
          <div className={`${styles.block} ${global.flex} ${global.f_end}`}>
            <div className={styles.buttons}>
              <button className={styles.button}><img src={hello_emoji} width={15}/></button>
              <button className={styles.button}><img src={hello_emoji} width={15}/></button>
              <button className={styles.button}><img src={hello_emoji} width={15}/></button>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer