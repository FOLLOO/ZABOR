import React from 'react'
import global from '../../../global.module.css'
import styles from './profile-nickname.module.css'
import ProfileCircle from '../profile-circle/ProfileCircle'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../provider/AuthProvider'

function ProfileNickname ({ nickname, date, view, type, desc = false, img }) {
  const {user} = useAuth()
  const Default = () => {
    return (
      <div>
        <Link to={`/profile/${user?.id}`} className={` ${global.flex} ${global.f_dir_column}  ${styles.hola}`}>
          <div className={`${global.t2}`}>
            {nickname ? nickname : 'Anonymos'}
          </div>
          {desc ?
            <div className={global.d3}>
              Моя страница автора
            </div>
            : null}
        </Link>
      </div>
    )
  }

  const Post = () => {
    return (
      <div className={`${global.flex} ${global.f_dir_column} ${styles.post}`}>
        <div className={global.t3}>
          {nickname ? nickname : 'Anonymos'}
        </div>
        <div className={global.d3}>
          {date ? date : 'Вчера '} | {view ? view : ' 10К'} просмотров
        </div>
      </div>
    )
  }

  const renderSwitch = (param) => {
    switch (param) {
      case 'post' :
        return <Post/>
      case  'default' :
        return <Default/>
      default:
        return <h5> Опрделеите тип... </h5>
    }
  }

  return (
    <>
      <div className={`${global.flex} ${global.f_a_center} ${styles.main}`}>
        <ProfileCircle size={50} img={img}/>
        {renderSwitch(type)}
      </div>
    </>
  )
}

export default ProfileNickname