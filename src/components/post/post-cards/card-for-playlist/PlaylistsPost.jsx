import React from 'react'

import styles from './playlists-post.module.css'
import global from '../../../../global.module.css'

import lock from '../../../../asserts/icons/Lock.svg'
import {IMAGE_URL} from "../../../../utils";

/** Отображение карточки поста использоуется в плейлисте*/
function PlaylistsPost ({ title, description, blur, cost, views, image}) {

  return (
    <div className={`${styles.main} ${global.flex}`}>
      <div className={image ? styles.image : null}>
        {image ?
          <>
            <img
                src={`${IMAGE_URL}${image}`}
                 // src={temp}
                 className={blur ? `${styles.img}` : `${styles.img}` } alt={'playlist-post'}/>
            <div className={`${styles.lock} ${global.flex} ${global.f_center}`}>
                <img src={lock} alt={'lock'} width={80} style={ blur ? null : { opacity: '1%' }}/>
            </div>
          </>
          :
          <div className={`${global.skeleton} ${styles.img}`}>

          </div>}
      </div>
      <div className={`${styles.content} ${global.flex} ${global.f_dir_column}`}>
        <div className={`${global.flex} ${global.f_s_between} ${global.f_a_center}`}>
          {title ?
            <h2 className={`${global.xl} ${global.medium} ${styles.title}`}>{title}</h2>
            :
            // eslint-disable-next-line jsx-a11y/heading-has-content
            <h3 className={global.skeleton}>.</h3>
          }
          {cost === 0 ? <div className={global.t2} style={{ marginLeft: '10px' }}> Бесплатно</div> :
            cost > 0 ?
              <div className={`${global.t3} `} style={{ marginLeft: '10px' }}>
                {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB'}).format(cost)}
              </div>
              :
              null
          }
        </div>
        {description ?
          <div className={`${global.d3} ${styles.description}`}>
            {description}
          </div>
          :
          // eslint-disable-next-line jsx-a11y/heading-has-content
          <h5 className={global.skeleton}>В этом ролике расскажу как играть на
            Опишу </h5>
        }
        {views ?
          <div className={global.d3}>
            {views.toLocaleString('ru-RU') + ' Просмотров'}
          </div>
          :
          <div className={`${global.d3} ${global.skeleton}`}>
            1 000 Просмотров
          </div>
        }
      </div>
    </div>
  )
}

export default PlaylistsPost