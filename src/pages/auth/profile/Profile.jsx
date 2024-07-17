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
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthData } from '../../../redux/slices/user'
import { useAuth } from '../../../provider/AuthProvider'
import { useParams } from 'react-router-dom'
import { fetchPosts, getUserPost } from '../../../redux/slices/post'

function Profile ({prewie}) {
  const { overlay } = useContext(OverlayContext)
  const { id } = useParams()
  const { user } = useAuth()

  // const authData = useSelector(selectAuthData);
  const [errMes, setErrMes] = useState('')
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [posts, setPosts] = useState([])

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

  const getUserPosts = async () => {
    try{
      dispatch(getUserPost(id))
        .then((res) => {
          if (res.error) {
            setErrMes(res.error.message)
          }
          if (res.error === undefined) {
            // console.log(res)
            // const pathname = localStorage.getItem('token') || '/main'
            setPosts(res.payload)
            setLoading(false)
            // const {refreshToken} = res.payload.profile
            // setCookie("refreshToken" , refreshToken)
          }
        })
    }
    catch (err){
      console.log(err)
    }
  }


  useEffect(() => {
      // getData();
      getUserPosts()
      // console.log(data)
  },[loading])
  // console.log(posts)

  /** Контент для Tab */
  const tabContent = [
    { title: 'Публикации', content: <UserPosts data={posts}/> },
    { title: 'Плейлисты', content: <Playlists data={data}/> },
    { title: 'Об авторе', content: <AboutMe data={user ? user : null}/> },
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
                {user?.nickname ?
                <h2>{user?.nickname}</h2>
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

