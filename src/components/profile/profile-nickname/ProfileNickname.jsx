import React from 'react'
import global from '../../../global.module.css'
import styles from './profile-nickname.module.css'
import ProfileCircle from '../profile-circle/ProfileCircle'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../provider/AuthProvider'

/**
 *
 * @param id
 * @param nickname
 * @param date
 * @param view
 * @param type - post subs default
 * @param desc
 * @param img
 * @param subs
 * @param comment
 * @returns {Element}
 * @constructor
 */
function ProfileNickname ({id, nickname, date, view, type, desc = false, comment = false, img,  subs }) {

  const {user} = useAuth()
    function hob(count){
      let result;
        if (count === 0) {
            result = 'просмотров'
        } else if (count === 1) {
            result = 'просмотр'
        } else if (count === 2) {
            result = 'просмотра'
        } else {
            result = 'просмотров'
        }
        return result
    }
  const Default = () => {
    return (
      <div>
        <Link to={`/profile/${user?.id}`} className={` ${global.flex} ${global.f_dir_column}  ${styles.hola}`}>
          <div className={`${global.t3} ${styles.nickname} ${desc || comment ? null : styles.default_nickname}`}>
            {nickname ? nickname : 'not-authorized'}
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
        <Link to={`/profile/${id}`} className={global.t3}>
          {nickname ? nickname : 'Anonymos'}
        </Link>
        <div className={global.d3}>
          {date ? new Date(date).toLocaleString('ru-RU',{ day: 'numeric', month: 'numeric', year: 'numeric'}) : 'Вчера '} |  {view ? view + ' ' + hob(view) : '10К'}
        </div>
      </div>
    )
  }


  const SubesView = () => {
    return (
      <div className={`${global.flex} ${global.f_dir_column} ${styles.post}`}>
        <Link to={`/profile/${id}`} className={global.t3}>
          {nickname ? nickname : 'Anonymos'}
        </Link>
        <div className={global.d3}>
          {subs ? new Intl.NumberFormat('ru-RU').format(subs) + 'Подписчиков' : 'Нет подписчиков'}
        </div>
      </div>
    )
  }

  const renderSwitch = (param) => {
    switch (param) {
      case 'post' :
        return <Post/>
      case 'subs' :
        return <SubesView/>
      case  'default' :
        return <Default/>
      default:
        return <h5> Опрделеите тип... </h5>
    }
  }

  return (
    <>
      <div className={`${global.flex} ${global.f_a_center} ${styles.main}`}>
        <ProfileCircle size={40} img={img}/>
        {renderSwitch(type)}
      </div>
    </>
  )
}

export default ProfileNickname