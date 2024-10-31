import React from 'react'

import styles from './profile-card.module.css'
import global from '../../../global.module.css'
import SubscribeButton from '../../ui/buttons/subscribe-button/SubscribeButton'
import WhiteButton from '../../ui/buttons/white-button/WhiteButton'
import GreenButton from '../../ui/buttons/green-button/GreenButton'
import { IMAGE_URL } from '../../../utils'
import { useNavigate } from 'react-router-dom'
import Button from "../../ui/buttons/button/Button";

function ProfileCard ({ image, nickname, description, id }) {
  const navigate = useNavigate()
  return (
    <div className={`${styles.main} `}>
      <div className={styles.title}>
        <div className={`${global.t4} ${global.bold}`}>
          Об авторе
        </div>
      </div>
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
          <div className={`${global.t4} ${global.bold}`}>
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
            <div className={global.d3}>
              {description}
            </div>
            :
              <div className={global.d2}>
                Автор не добавил описание
              </div>
            // <div className={global.skeleton}>
            //   Какое то поисание очень интерсеное и так далее алва фыдвлоа лыдвоа оывадл оыдао ыдлво
            // </div>
          }
        </div>
        <div className={styles.buttons}>
          {nickname ?
            <>
            {/*<GreenButton text={'Вы подписаны'} />*/}
                <Button variant={'color'} className={global.f_center} >
                    Вы подписаны
                </Button>
            {/*<WhiteButton text={'К автору'} click={() => navigate(`/profile/${id}`)} />*/}
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