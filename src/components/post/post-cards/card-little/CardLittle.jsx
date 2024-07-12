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
import { Link } from 'react-router-dom'
function CardLittle ({
  image = false,
  title,
  views,
  price,
  user_id,
  time ,
  blur = false
}) {
  return (
    <div className={`${styles.main} ${global.shadowBliz}`}>
      <div className={image ? styles.temp : null}>

      <div className={`${styles.actions} ${global.flex} ${global.f_dir_column}`} >
          <div className={`${styles.profile} ${global.flex} ${global.f_end}`}>
            <Link to={`/user/${user_id}`}>
            <ProfileCircle size={30}/>
            </Link>
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

            <button className={styles.button} >
              <div  className={`${global.flex} ${global.f_a_center} ${global.f_center} ${styles.buttonCon}`}>
                  <img src={basket} alt={'button img'}/>
                  <img src={plus} alt={'button img'}/>
              </div>
            </button>
          </div>
      </div>


      <div className={`${styles.content} ${global.flex} ${global.f_dir_column}`}>
        <div className={`${styles.epigraph} ${global.flex} ${global.f_s_between}`}>
          <div className={`${global.t1} ${styles.title}`}>
            {/*{title ? title : 'Пришла и оторвало голову нам сумасшедшая весна'}*/}
            {/*Пришла и оторвало голову нам сумасшедшая весна*/}
            {title ? title :
              <div className={global.skeleton}>
                Пришла и оторвало голову нам сумасшедшая весна
              </div>
            }
          </div>
          <div className={`${global.t1} ${styles.title}`}>
            {price ?  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price) :
              <div className={global.skeleton}>
              015₽
              </div>

            }
          </div>
        </div>
        <div className={`${styles.analytych} ${global.flex} ${global.f_s_between}`}>
          <div className={`${global.d3} ${styles.views}`}>
            {views ? views + ' просмотров' :
              <div className={global.skeleton}>
              1000 просмотров
              </div>
              }
          </div>

          <div className={global.d3}>
            {time ? new Intl.DateTimeFormat('ru-RU').format(new Date(time)) :
              <div className={global.skeleton}>
              '2 часа назад'
              </div>
            }
          </div>
        </div>
      </div>
      </div>
      {image ?
        <img className={`${styles.cardImage}  ${blur ? global.blur : null}`} src={temp} alt={'temp'}/>
      :
        <div className={`${global.skeleton} ${styles.noImage}`}>

        </div>
      }
    </div>
  )
}

export default CardLittle