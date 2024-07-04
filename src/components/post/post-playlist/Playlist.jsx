import React from 'react'

import styles from './playlist.module.css'
import global from '../../../global.module.css'

import temp from '../../../asserts/temp/temp.jpg'

function Playlist (props) {
  return (
    <div className={`${styles.main} ${global.shadowBliz} ${global.flex} ${global.f_dir_column} `}>
      <div className={styles.image}>
        <img src={temp} alt={'playlist-img'} className={styles.img}/>
      </div>
      <div className={`${styles.text} ${global.flex} ${global.f_dir_column}`}>
        <div className={styles.title}>
          <h4> Временное сообщение </h4>
        </div>
        <div className={`${global.d2} ${styles.description}`}>
          Временное сообщение
          Временное сообщение
          Временное сообщение
          Временное сообщение
          Временное сообщение
        </div>
      </div>
    </div>
  )
}

export default Playlist