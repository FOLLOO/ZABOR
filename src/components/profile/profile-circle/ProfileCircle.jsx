import React from 'react'
import styles from './profile-circle.module.css'
import global from '../../../global.module.css'
import temp from '../../../asserts/temp/temp.jpg'

function ProfileCircle ({img, size}) {
  return (
    <div className={styles.main} style={{width: `${size}px`, height: `${size}px`}}>
      {
        img ?
      <img className={styles.img} src={img ? img : temp} alt={'profileImage'} style={{width: `${size}px`, height: `${size}px`}}/>
          :
          <div className={global.skeleton}>
          </div>
      }
    </div>
  )
}

export default ProfileCircle