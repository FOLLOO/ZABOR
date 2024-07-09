import React from 'react'

import styles from './profile-card.module.css'
import global from '../../../global.module.css'
import SubscribeButton from '../../ui/buttons/subscribe-button/SubscribeButton'
import WhiteButton from '../../ui/buttons/white-button/WhiteButton'

function ProfileCard ({ image, nickname, description }) {
  return (
    <div className={`${styles.main} ${global.shadowBliz}`}>
      <div className={styles.title}>
        <div className={global.h4}>
          Об авторе
        </div>
      </div>
      <div className={styles.userPreview}>
        {image ?
          <img src={image} alt={'userPreview'}/>
          :
          <div className={global.skeleton}>
            Какая то не нужная информация для того чтобы скелетон работал, а скелеты любят бегать прыгать и танцевать.
          </div>}
      </div>
      <div className={styles.content}>
        <div className={styles.userNickname}>
          {nickname ?
          <div className={global.h4}>
            {nickname}
          </div>
            :
          <div className={global.skeleton}>
            User Nickname
          </div>
          }
        </div>
        <div className={styles.userDescription}>
          {description ?
            <div className={global.d2}>
              {description}
            </div>
            :
            <div className={global.skeleton}>
              Какое то поисание очень интерсеное и так далее алва фыдвлоа лыдвоа оывадл оыдао ыдлво
            </div>
          }
        </div>
        <div className={styles.buttons}>
          {nickname ?
            <>
            <SubscribeButton text={'Подписаться'} />
            <WhiteButton text={'К автору'} unique/>
            </>
            :
            <>
            <div className={global.skeleton}>
              User Nickname
            </div>
            <div className={global.skeleton}>
              User Nickname
            </div>
            </>
          }

        </div>
      </div>
    </div>
  )
}

export default ProfileCard