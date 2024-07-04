import React from 'react'

import styles from './userPosts.module.css'
import global from '../../../../global.module.css'

import GlassCard from '../../../glasses/glasses-card/GlassCard'
import GreenButton from '../../../ui/buttons/green-button/GreenButton'

function UserPosts ({data}) {
  return (
    // margin потому что там ток один атрибут
    <div className={styles.margin}>
      <GlassCard>
        <div className={`${global.flex} ${global.f_center} ${global.f_dir_column} 
        ${global.f_a_center} ${styles.main}`}>
          <h3>Публикации</h3>
          <div className={global.d2}>
            {/*Какое то говно пределать нужно*/}
            {data ? data : 'Пока что ничего нет 🤔'}
          </div>
          {data ? null :
            <div className={styles.addButton}>
              <GreenButton text={'Создать публикацию'} unique/>
            </div>
          }
        </div>
      </GlassCard>
    </div>
  )
}

export default UserPosts