import React from 'react'
import styles from './profile-circle.module.css'
import global from '../../../global.module.css'
import temp from '../../../asserts/temp/temp.jpg'
import photo from '../../../asserts/icons/photo.svg'
function ProfileCircle ({ img, size, edit, click }) {
  return (
    <div className={styles.main} style={{ width: `${size}px`, height: `${size}px` }} >
      { img ?
        <img className={styles.img} src={img ? img : temp} alt={'profileImage'}
             style={{ width: `${size}px`, height: `${size}px` }}/>
        :
        <div className={global.skeleton}></div> }
      {edit ?
        <div className={styles.edit}
             onClick={click}
             title={'Нажмите чтобы изменить изображение'}>
            <img src={photo} alt={''}
                 style={{ width: `${size}px`, height: `${size}px`, position: 'relative', bottom: `${size}px`}}/>
        </div>
        : null}
    </div>
  )
}

export default ProfileCircle