import React from 'react'

import styles from './playlist.module.css'
import global from '../../../global.module.css'

import temp from '../../../asserts/temp/temp.jpg'
import GreenButton from '../../ui/buttons/green-button/GreenButton'
import { useNavigate } from 'react-router-dom'
import { IMAGE_URL } from '../../../utils'

/** Карточка плейлиста используется на вкладке Плейлисты внутри профиля*/
function Playlist ({title, description, image, add}) {

  const navigate = useNavigate()

  return (
    <div className={`${styles.main} ${global.shadowBliz} ${global.flex} ${global.f_dir_column} `}>
      <div className={styles.image}>
        {image ?
        <img src={`${IMAGE_URL}${image}`} alt={'playlist-img'} className={styles.img}/>
          :
          <div className={global.skeleton}>
          </div> }
      </div>
      <div className={`${styles.text} ${global.flex} ${global.f_dir_column}`}>
        {
          add ?
            <GreenButton text={'Создать плелист'} unique click={() => navigate('/create/playlist')}/>
            : null
        }
        <div className={styles.title}>
          {title ?
            <h4> {title} </h4>
          :
            <h4 className={global.skeleton}> Временное сообщение </h4>
          }
        </div>

        <div className={`${global.d2} ${styles.description}`}>
          {
            description ? description :
              <div className={global.skeleton}>
                Временное сообщение
                Временное сообщение
                Временное сообщение
                Временное сообщение
                Временное сообщение
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Playlist