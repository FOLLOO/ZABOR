import React from 'react'

import styles from './playlists-post.module.css'
import global from '../../../../global.module.css'

import temp from '../../../../asserts/temp/people-doing-outdoor-training.jpg'

function PlaylistsPost (props) {
  return (
    <div className={`${styles.main} ${global.flex}`}>
      <div className={styles.image}>
        <img src={temp} className={styles.img} alt={'laylist-post'}/>
      </div>
      <div className={`${styles.content} ${global.flex} ${global.f_dir_column}`}>
        <div className={`${global.flex} ${global.f_s_between} ${global.f_a_center}`}>
            <h3>Загловок</h3>
          <div className={global.text}>
            Цена
          </div>
        </div>
        <div className={`${global.d2} ${styles.description}`}>
          В этом ролике расскажу как играть на скрипке без каких либо проблем.
          Опишу понятия и программу обучения. Я квалифицированные специолист.
          В этом ролике расскажу как играть на скрипке без каких либо проблем.
          Опишу понятия и программу обучения. Я квалифицированные специолись
        </div>
        <div className={global.t3}>
          1 000 Просмотров
        </div>
      </div>
    </div>
  )
}

export default PlaylistsPost