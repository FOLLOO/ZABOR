import React from 'react'
import styles from './profile-circle.module.css'

import temp from '../../../asserts/temp/temp.jpg'

function ProfileCircle ({img, size}) {
  return (
    <div className={styles.main} style={{width: `${size}px`, height: `${size}px`}}>
      <img className={styles.img} src={temp} alt={'profileImage'} style={{width: `${size}px`, height: `${size}px`}}/>
    </div>
  )
}

export default ProfileCircle