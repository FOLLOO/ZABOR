import React from 'react'

import styles from './render-type.module.css'
import global from '../../../global.module.css'

import ProfileCircle from '../../profile/profile-circle/ProfileCircle'
import { IMAGE_URL } from '../../../utils'

import temp from '../../../asserts/temp/beautiful-mountain-lake-background-remix.jpg'

/** Компонент для рендеринга уведомлений */

function RenderType ({ avatar, views, postImage, text, date }) {
  return (
    <div className={`${styles.main} ${global.flex} ${global.f_s_between} ${global.f_a_center}`}>
      {avatar ?
        <div className={styles.image}>
          <ProfileCircle size={40} img={avatar}/>
        </div>
        : null}
      <div className={`${styles.content} ${global.flex} ${global.f_dir_column} ${global.f_s_between}`}>
        <div className={`${styles.title} ${global.text} ${global.bold}`}>
          {text ? text : null}
        </div>
        <div className={`${styles.analytycs} ${global.flex} ${views ? global.f_s_between : null}`}>
          <div className={global.d3}>
            {views ? views + ' Просмотров' : null}
          </div>
          <div className={global.d3}>
            {date ? date : null}
          </div>
        </div>
      </div>
      {postImage ?
      <div className={styles.postImage}>
        <img src={`${IMAGE_URL}${postImage}`} alt={'post-image'}/>
      </div>
        : null}
    </div>
  )
}

export default RenderType