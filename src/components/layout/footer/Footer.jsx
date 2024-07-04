import React from 'react'

import styles from './footer.module.css'
import global from '../../../global.module.css'

import logo from '../../../asserts/logo.svg'
import hello_emoji from '../../../asserts/emoji/hello.png'
import eye_emoji from '../../../asserts/emoji/eye.png'

import WhiteButton from '../../ui/buttons/white-button/WhiteButton'
import whiteButton from '../../ui/buttons/white-button/WhiteButton'

function Footer (props) {
  return (
    // <footer className={styles.footer}>
    //   <div className={`${styles.filter} ${global.flex} ${global.f_dir_column}`}>
    //
    //   <div className={styles.title}>
    //     <h2>Z A B O R</h2>
    //   </div>
    //
    //   <div className={`${global.flex} ${styles.grid} ${global.f_ji_center}`}>
    //     <div className={styles.content}>
    //       <h6>TEXT</h6>
    //       <ul>
    //         <li>information base</li>
    //         <li>information base</li>
    //         <li>information base</li>
    //         <li>information base</li>
    //       </ul>
    //     </div>
    //     <div className={styles.content}>
    //       <h6>TEXT</h6>
    //       <ul>
    //         <li>information base</li>
    //         <li>information base</li>
    //         <li>information base</li>
    //         <li>information base</li>
    //       </ul>
    //     </div>
    //     <div className={styles.content}>
    //       <h6>TEXT</h6>
    //       <ul>
    //         <li>information base</li>
    //         <li>information base</li>
    //         <li>information base</li>
    //       </ul>
    //     </div>
    //     <div className={styles.content}>
    //       <h6>TEXT</h6>
    //       <ul>
    //         <li>information base</li>
    //         <li>information base</li>
    //         <li>information base</li>
    //         <li>information base</li>
    //       </ul>
    //     </div>
    //   </div>
    //
    //   <div className={styles.links}>
    //     <img alt={'link1'}/>
    //     <img alt={'link2'}/>
    //     <img alt={'link3'}/>
    //   </div>
    //
    //   <div className={styles.chick}>
    //     <div className={`${styles.row} ${global.d3}`}>
    //       ©  2019 Lift media Online S.L.
    //     </div>
    //     <div className={`${styles.row} ${global.d3}`}>
    //       Ronda Sant Pere 52, 08010 Barcelona,
    //     </div>
    //     <div className={`${styles.row} ${global.d3}`}>
    //       Inscripción en el Registro Mercantil de Barcelona. Tomo 46606, Folio 37, Hoja 525271.
    //     </div>
    //
    //     <div className={global.flex}>
    //
    //       <div className={`${styles.column} ${global.d3}`}>
    //         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it t
    //         El funcionamiento de la plataforma es muy sencillo. Se debe completar la solicitud, ésta información se envía a las entidades financieras a tiempo real con el fin de que la herramienta compare, negocie y escanee las mejores ofertas. Una vez aceptada la propuesta, se ingresa el dinero directamente en la cuenta del cliente.
    //
    //       </div>
    //       <div className={`${styles.column} ${global.d3}`}>
    //         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it t
    //         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it tLorem Ipsum is simply dummy text of the printin
    //       </div>
    //
    //     </div>
    //
    //   </div>
    //
    //   <div className={`${styles.row} ${global.d3}`}>
    //     Lift no cobra comisiones de ningún tipo
    //   </div>
    //   </div>
    // </footer>

    <footer className={styles.footer}>
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
              <div className={global.t4}>
                Документы
              </div>
            </div>
          </button>
          <button className={styles.whiteButton}>
            <div className={styles.b_content}>
              <img src={hello_emoji} width={22}/>
              <div className={global.t4}>
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
            <div className={`${global.t3} ${styles.c_text}`}>
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