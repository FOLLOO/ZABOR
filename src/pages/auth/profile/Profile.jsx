import React, { useContext, useEffect, useState } from 'react'

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
// import axios from '../../../r-axios/axios'
import axios from 'axios'
import { OverlayContext } from '../../../context/OverlayContext'
import { useSelector } from 'react-redux'
import { selectAuthData } from '../../../redux/slices/user'

function Profile ({prewie}) {
  const { overlay } = useContext(OverlayContext)

  const authData = useSelector(selectAuthData);

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)


  const getData = async () => {
    try{
      const response = await axios.get('https://dog.ceo/api/breed/hound/images/random/1000')
      setData(response.data.message)
      setLoading(false)
    }
    catch (err){
      console.log(err)
    }
  }

  useEffect(() => {
      getData();
      // console.log(data)
  },[loading])


  /** Контент для Tab */
  const tabContent = [
    { title: 'Публикации', content: <UserPosts data={data}/> },
    { title: 'Плейлисты', content: <Playlists data={data}/> },
    { title: 'Об авторе', content: <AboutMe data={authData}/> },
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
                {authData?.profile.nickname ?
                <h2>{authData?.profile.nickname}</h2>
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

