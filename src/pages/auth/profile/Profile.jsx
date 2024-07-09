import React from 'react'

import styles from './profile.module.css'
import global from '../../../global.module.css'

import temp from '../../../asserts/temp/temp.jpg'

import Tab from '../../../components/ui/tab/Tab'
import MessageBox from '../../../components/message-box/MessageBox'
import ProfileCircle from '../../../components/profile/profile-circle/ProfileCircle'
import WhiteButton from '../../../components/ui/buttons/white-button/WhiteButton'
import AboutMe from '../../../components/profile/profile-tab-content/aboutMe/AboutMe'
import Playlists from '../../../components/profile/profile-tab-content/playlists/Playlists'
import UserPosts from '../../../components/profile/profile-tab-content/user-posts/UserPosts'


function Profile ({prewie, nickname}) {
  /** Контент для Tab */
  const tabContent = [
    { title: 'Публикации', content: <UserPosts/> },
    { title: 'Плейлисты', content: <Playlists/> },
    { title: 'Об авторе', content: <AboutMe/> },
  ];
  /** Компонент для страницыы профиля главный контент отоправляется в Tab через items*/
  return (
    <div className={styles.main}>
        <div className={styles.prewieImage}>
          {prewie ?
          <img src={temp} alt={'some'}/>
          :
            <div className={global.skeleton}></div>
          }
        </div>
        <div className={styles.content}>
          <div className={styles.profile}>
            <div className={styles.nickname}>
              <ProfileCircle size={200}/>
              <div className={styles.subes}>
                {nickname ?
                <h2>Porfile NICKNAME</h2>
                :
                  <h2 className={global.skeleton}>NICKNAME</h2>
                }
              <div className={global.d2}>
                Пока нет подписчиков
              </div>
              </div>
            </div>
            <div className={styles.follow}>
            <WhiteButton text={'Подписаться'}/>
            </div>
          </div>
          <div className={styles.tab}>
            <Tab items={tabContent}/>
          </div>

        </div>
    </div>
  )
}

export default Profile

