import React from 'react'

import styles from './playlist.module.css'
import global from '../../../global.module.css'

import temp from '../../../asserts/temp/temp.jpg'
import GreenButton from '../../ui/buttons/green-button/GreenButton'

/** Карточка плейлиста используется на вкладке Плейлисты внутри профиля*/
function Playlist ({title, description, image, add}) {
  return (
    <div className={`${styles.main} ${global.shadowBliz} ${global.flex} ${global.f_dir_column} `}>
      <div className={styles.image}>
        {image ?
        <img src={temp} alt={'playlist-img'} className={styles.img}/>
          :
          <div className={global.skeleton}>
          </div> }
      </div>
      <div className={`${styles.text} ${global.flex} ${global.f_dir_column}`}>
        {
          add ?
            <GreenButton text={'Создать плелист'} unique/>
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