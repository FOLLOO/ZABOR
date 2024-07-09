import React from 'react'

import styles from './playlists-post.module.css'
import global from '../../../../global.module.css'

import temp from '../../../../asserts/temp/people-doing-outdoor-training.jpg'
/** Отображение карточки поста использоуется в плейлисте*/
function PlaylistsPost ({title, description, cost, views, image}) {
  return (
    <div className={`${styles.main} ${global.flex}`}>
      <div className={ image ? styles.image : null}>
        {image ?
        <img src={temp} className={styles.img} alt={'laylist-post'}/>
        :
        <div className={`${global.skeleton} ${styles.img}`}>

        </div> }

      </div>
      <div className={`${styles.content} ${global.flex} ${global.f_dir_column}`}>
        <div className={`${global.flex} ${global.f_s_between} ${global.f_a_center}`}>
          {title ?
            <h3>{title}</h3>
          :
            // eslint-disable-next-line jsx-a11y/heading-has-content
            <h3 className={global.skeleton}>.</h3>
          }
            {cost ?
              <div className={global.text}>
                {cost}
              </div>
              :
              null
            }
        </div>
        {description ?
        <div className={`${global.d2} ${styles.description}`}>
          {description}
        </div>
          :
          // eslint-disable-next-line jsx-a11y/heading-has-content
          <h5 className={global.skeleton}>В этом ролике расскажу как играть на
            Опишу </h5>
        }
        {views ?
        <div className={global.t3}>
          {views.toLocaleString('ru-RU') + ' Просмотров'}
        </div>
          :
          <div className={`${global.t3} ${global.skeleton}`}>
            1 000 Просмотров
          </div>
        }
      </div>
    </div>
  )
}

export default PlaylistsPost