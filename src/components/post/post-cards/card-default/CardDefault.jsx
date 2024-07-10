import React, { useEffect, useState } from 'react'

import styles from './card-default.module.css'
import global from '../../../../global.module.css'
import ProfileCircle from '../../../profile/profile-circle/ProfileCircle'
import lock from '../../../../asserts/icons/Lock.svg'
import basket from '../../../../asserts/icons/basket.svg'
import plus from '../../../../asserts/icons/plus.svg'
import temp from '../../../../asserts/temp/temp2.jpg'
import axios from 'axios'

function CardDefault ({
  image = false,
  img,
  avatar_img,
  title,
  views,
  price,
  time,
  description,
  blur = false
}) {

  return (
    <div className={`${styles.main} ${global.shadowBliz}`}>
      <div className={img ? styles.temp : null}>
        <div className={`${styles.actions} ${global.flex} ${global.f_dir_column}`} >
          <div className={`${styles.profile} ${global.flex} ${global.f_end}`}>
            <ProfileCircle img={avatar_img} size={40}/>
          </div>

          <div className={`${styles.lock} ${global.flex} ${global.f_center}`}>
            {blur ?
              <img src={lock} alt={'lock'} width={80}/>
              :
              <img src={lock} alt={'lock'} width={80} style={{opacity: "1%"}}/>
            }
          </div>

          <div className={`${styles.basket} ${global.flex} ${global.f_start}`}>
            {/*<TransprantButton text={'+'} img={basket} stylee={{background: 'white', width: '55px', padding: 0}}/>*/}

              {title ?
            <button className={styles.button}>
              <div  className={`${global.flex} ${global.f_a_center} ${global.f_center} ${styles.buttonCon}`}>
                <img src={basket} alt={'button img'}/>
                <img src={plus} alt={'button img'}/>
              </div>
            </button>
            :
                <div className={global.skeleton}>\

                </div> }


          </div>
        </div>
        <div className={`${styles.content} ${global.flex} ${global.f_dir_column}`}>
          <div className={`${styles.epigraph} ${global.flex} ${global.f_s_between}`}>
            <div className={`${global.h4} ${styles.title}`}>
              {/*{title ? title : 'Пришла и оторвало голову нам сумасшедшая весна'}*/}
              {/*Пришла и оторвало голову нам сумасшедшая весна*/}
              {title ? title :
                <div className={global.skeleton}>
                  Пришла и оторвало голову нам сумасшедшая весна
                </div>
              }
            </div>
            <div className={`${global.h4} ${styles.price}`}>
              {price ? price + ' ₽' :
                <div className={global.skeleton}>
                  015₽
                </div>

              }
            </div>
          </div>
          <div className={global.d1}>
            {description ? description :
              <div className={global.skeleton}>
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
              </div>
            }
          </div>
          <div className={`${styles.analytych} ${global.flex} ${global.f_s_between}`}>
            <div className={`${global.d2} ${styles.views}`}>
              {views ? views + ' просмотров' :
                <div className={global.skeleton}>
                  1000 просмотров
                </div>
              }
            </div>
            <div className={global.d2}>
              {time ? time :
                <div className={global.skeleton}>
                  '2 часа назад'
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      {img ?
        <img className={`${styles.cardImage}  ${blur ? global.blur : null}`} src={img} alt={'temp'}/>
        :
        <div className={`${global.skeleton} ${styles.noImage}`}>

        </div>
      }
    </div>
  )
}

export default CardDefault