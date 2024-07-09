import React from 'react'

import styles from './userPosts.module.css'
import global from '../../../../global.module.css'

import GlassCard from '../../../glasses/glasses-card/GlassCard'
import GreenButton from '../../../ui/buttons/green-button/GreenButton'
import CardDefault from '../../../post/post-cards/card-default/CardDefault'

import temp
  from '../../../../asserts/temp/smiling-handsome-young-man-city-street-taking-picture-from-vintage-camera.jpg'

/** Посты пользователя */


function UserPosts ({ data = 'asdfasd' }) {

  /** Нет постов*/
  const NothingYeat = () => {
    return (
      <GlassCard>
        <div className={`${global.flex} ${global.f_center} ${global.f_dir_column} 
        ${global.f_a_center} ${styles.main}`}>
          <h3>Публикации</h3>
          <div className={global.d2}>
            {/*Какое то говно пределать нужно*/}
            Пока что ничего нет 🤔
          </div>
          <div className={styles.addButton}>
            <GreenButton text={'Создать публикацию'} unique/>
          </div>
        </div>
      </GlassCard>
    )
  }

  const UserPosts = () => {
    return (
      <>
        <div className={styles.title}>
          <h2>Публикации</h2>
        </div>
        <div className={styles.margin}>

          <div className={styles.grid}>
            <CardDefault/>
            <CardDefault/>
            <CardDefault/>
            <CardDefault/>
          </div>
        </div>
      </>
    )
  }

  return (
    // margin потому что там ток один атрибут
    <div className={styles.margin}>
      {data ?
        UserPosts()
        : NothingYeat()
      }

    </div>
  )
}

export default UserPosts