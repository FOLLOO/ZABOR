import React from 'react'

import styles from './aboutMe.module.css'
import global from '../../../../global.module.css'
import GlassCard from '../../../glasses/glasses-card/GlassCard'
import GreenButton from '../../../ui/buttons/green-button/GreenButton'
import { useNavigate } from 'react-router-dom'

function AboutMe ({data, text, social}) {

  const navigate = useNavigate()

  return (
    // margin потому что там ток один атрибут
    <div className={styles.margin}>
      <GlassCard>
        <div className={`${global.flex} ${global.f_center} ${global.f_dir_column} 
        ${global.f_a_center} ${styles.main}`}>
          <h3>Обо мне</h3>
          <div className={global.d2}>
            {data?.aboutMe ? data?.aboutMe : 'Пока что ничего нет 🤔'}
          </div>
          {data?.aboutMe ? null :
            <div className={styles.addButton}>
            <GreenButton text={'Добавить'} unique click={() => navigate('/settings/myprofile')}/>
            </div>
          }
        </div>
      </GlassCard>
      <div className={`${styles.infCards} `}>
        <GlassCard>
          <div className={`${global.flex} ${global.f_center} ${global.f_dir_column} 
        ${global.f_a_center} ${styles.main}`}>
            <h3>Достижения</h3>
            <div className={global.d2}>
              {text ? text : 'Пока что ничего нет 🤔'}
            </div>
            {text ? null :
              <div className={styles.addButton}>
                <GreenButton text={'Посмотреть'} unique/>
              </div>
            }
          </div>
        </GlassCard>
        <GlassCard>
          <div className={`${global.flex} ${global.f_center} ${global.f_dir_column} 
        ${global.f_a_center} ${styles.main}`}>
            <h3>Социальные сети</h3>
            <div className={global.d2}>
              {text ? text : 'Пока что ничего нет 🤔'}
            </div>
            {text ? null :
              <div className={styles.addButton}>
                <GreenButton text={'Добавить соц.сеть'} click={() => navigate('/settings/myprofile')} unique/>
              </div>
            }
          </div>
        </GlassCard>
        <GlassCard>
          <div className={`${global.flex} ${global.f_center} ${global.f_dir_column} 
        ${global.f_a_center} ${styles.main}`}>
            <h3>Цели</h3>
            <div className={global.d2}>
              {text ? text : 'Пока что ничего нет 🤔'}
            </div>
            {text ? null :
              <div className={styles.addButton}>
                <GreenButton text={'Добавить цели'} unique/>
              </div>
            }
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default AboutMe