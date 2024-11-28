import React from 'react'

import styles from './profile-card.module.css'
import global from '../../../global.module.css'
import { IMAGE_URL } from '../../../utils'
import Button from "../../ui/buttons/button/Button";

function ProfileCard ({ image, nickname, description, id }) {



  return (
    <div className={`${styles.main}`}>
      <div className={styles.userPreview}>
        {image ?
          <img src={`${IMAGE_URL}${image}`} alt={'userPreview'}/>
          :
          <div className={global.skeleton}>
            Какая то не нужная информация для того чтобы скелетон работал, а скелеты любят бегать прыгать и танцевать.
          </div>}
      </div>
      <div className={styles.content}>
        <div className={styles.userNickname}>
          {nickname ?
          <a href={`/profile/${id}`} className={`${global.t3} ${global.medium}`}>
            {nickname}
          </a>
            :
          <div className={global.skeleton}>
            User Nickname
          </div>
          }
        </div>
        <div className={styles.userDescription}>
          {description ?
            <div className={global.d3}>
              {description}
            </div>
            :
              <div className={global.d2}>
                Автор не добавил описание
              </div>
          }
        </div>
        <div className={styles.buttons}>
          {nickname ?
              <Button variant={'outlet'} className={global.f_center} >
                  Отписаться
              </Button>
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