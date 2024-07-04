import React from 'react'

import styles from './card-little.module.css'
import global from '../../../../global.module.css'

import temp from '../../../../asserts/temp/temp2.jpg'
import basket from '../../../../asserts/icons/basket.svg'
import lock from '../../../../asserts/icons/Lock.svg'
import plus from '../../../../asserts/icons/plus.svg'

import ProfileCircle from '../../../profile/profile-circle/ProfileCircle'
import WhiteButton from '../../../ui/buttons/white-button/WhiteButton'
import TransprantButton from '../../../ui/buttons/transprant-button/TransprantButton'
import whiteButton from '../../../ui/buttons/white-button/WhiteButton'
function CardLittle ({
  title,
  views,
  price,
  time,
  blur = false
}) {
  return (
    <div className={`${styles.main} ${global.shadowBliz}`}>
      <div className={styles.temp}>

      <div className={`${styles.actions} ${global.flex} ${global.f_dir_column}`} >
          <div className={`${styles.profile} ${global.flex} ${global.f_end}`}>
            <ProfileCircle size={30}/>
          </div>

          <div className={`${styles.lock} ${global.flex} ${global.f_center}`}>
            {blur ?
              <img src={lock} alt={'lock'}/>
              :
              <img src={lock} alt={'lock'} style={{opacity: "1%"}}/>
            }
          </div>

          <div className={`${styles.basket} ${global.flex} ${global.f_start}`}>
            {/*<TransprantButton text={'+'} img={basket} stylee={{background: 'white', width: '55px', padding: 0}}/>*/}

            <button className={styles.button}>
              <div  className={`${global.flex} ${global.f_a_center} ${global.f_center} ${styles.buttonCon}`}>
                  <img src={basket} alt={'button img'}/>
                  <img src={plus} alt={'button img'}/>
              </div>
            </button>
          </div>
      </div>


      <div className={`${styles.content} ${global.flex} ${global.f_dir_column}`}>
        <div className={`${styles.epigraph} ${global.flex}`}>
          <div className={`${global.t5} ${styles.title}`}>
            {/*{title ? title : 'Пришла и оторвало голову нам сумасшедшая весна'}*/}
            Пришла и оторвало голову нам сумасшедшая весна
          </div>
          <div className={global.t5}>
            {price ? price + '₽' : '15₽'}
          </div>
        </div>
        <div className={`${styles.analytych} ${global.flex} ${global.f_s_between}`}>
          <div className={`${global.d3} ${styles.views}`}>
            {views ? views + ' просмотров' : 1000 + ' просмотров'}
          </div>
          <div className={global.d3}>
            {time ? time : '2 часа назад'}
          </div>
        </div>
      </div>
      </div>

      {blur ?
        <img className={`${styles.cardImage} ${global.blur}`} src={temp} alt={'temp'}/>
        :
        <img className={styles.cardImage} src={temp} alt={'temp'}/>
      }
    </div>
  )
}

export default CardLittle