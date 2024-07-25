import React, { useContext, useEffect, useState } from 'react'

import styles from './profile.module.css'
import global from '../../../global.module.css'

import temp from '../../../asserts/temp/temp.jpg'

import Tab from '../../../components/ui/tab/Tab'
import ProfileCircle from '../../../components/profile/profile-circle/ProfileCircle'
import WhiteButton from '../../../components/ui/buttons/white-button/WhiteButton'
import AboutMe from '../../../components/profile/profile-tab-content/aboutMe/AboutMe'
import Playlists from '../../../components/profile/profile-tab-content/playlists/Playlists'
import UserPosts from '../../../components/profile/profile-tab-content/user-posts/UserPosts'
import { OverlayContext } from '../../../context/OverlayContext'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../../provider/AuthProvider'
import { useParams } from 'react-router-dom'
import SelectPost from '../../../components/post/post-playlist/select-postORplaylist/SelectPost'
import AfterBlock from '../../../components/after-overlay-block/AfterBlock'
import GreenButton from '../../../components/ui/buttons/green-button/GreenButton'
import { getUserFolder, putPostToFolder } from '../../../redux/slices/folder'
import { getUserData } from '../../../redux/slices/user'

function Profile ({prewie}) {
  const { overlay,setOverlay, someOpen, setSomeOpen } = useContext(OverlayContext)
  const { id } = useParams()
  const { user } = useAuth()

  // const authData = useSelector(selectAuthData);
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.userR)
  const { userFolder } =  useSelector(state => state.folder)

  const [playlist, setPlaylist] = useState([])

  const [loading, setLoading] = useState(true)

  const closeSome = () => {
    // getUserFolders()
    setOverlay(!overlay)
    setSomeOpen(!someOpen)
    setPlaylist([])
  }

  const addPlaylist = (value, isChecked) => {
    // console.log(value, isChecked)
    if (isChecked) {
      if (!playlist.includes(value)) {
        setPlaylist(prevPlaylist => [...prevPlaylist, value]);
        console.log('Added to playlist:', value);
      }
    } else {
      setPlaylist(prevPlaylist => prevPlaylist.filter(item => item !== value));
    }

    // console.log(playlist)
  };
  const addToPlaylistVideo = () => {
    if (playlist.length <= 0){
      alert('Выберете плейлист')
    }
    const HASH = window.location.hash.replace('#', '')
    for(let i = 0; i < playlist.length; i++){
      try{
        const data = {
          publicationId: HASH,
          folderOfPublicationId: playlist[i]
        }
        dispatch(putPostToFolder(data))
      }
      catch (e){
        console.log(e)
      }
    }
    closeSome()
  }

  const getUserPosts = async () => {
    try{
      dispatch(getUserPost(id))
      setLoading(false)
    }
    catch (err){
      console.log(err)
      setLoading(false)
    }
  }

  const getUserFolders = () => {
    try{
      dispatch(getUserFolder(id))
    }catch (err) {
      console.log(err)
    }
  }

  const getUser = () => {
    // const data = {
    //   userId: id
    // }
    try{
      dispatch(getUserData(id))
    }
    catch (err){
      console.log(err)
    }
  }

  useEffect(() => {
      // getUserPosts()
      getUser()
    },
    [])

  useEffect(() => {
    getUserFolders()
  }, [overlay === true])

// console.log(userR)

  /** Контент для Tab */
  // todo: При открытии плейлиста не отобржается Находится ли он в нем уже или нет

  const tabContent = [
    { title: 'Публикации', content: <UserPosts data={userData.items.publications}/> },
    { title: 'Плейлисты', content: <Playlists /> },
    { title: 'Об авторе', content: <AboutMe data={user ? user : null} social={userData.items.socialMedia}/> },
  ];
  // console.log(userData)
  /** Компонент для страницы профиля главный контент отправляется в Tab через items*/
  return (
    <div className={styles.main}>
      {someOpen ?
        <div className={styles.addToPalylist}>
          <AfterBlock>
            <h2>Выберете плейлист</h2>
            <div className={styles.addPostsCarda}>
            {userFolder?.items.map((item) => (
              <SelectPost title={item?.name}
                          onChange={(event) => addPlaylist(item?.id, event.target.checked)}
                          id={item?.id}
                          img={item?.coverUrl}
                          // img={temp}
                          description={item?.description}/>
            ))}
            </div>
            <div className={`${global.flex} ${styles.gap}`}>
              <WhiteButton text={'Отмена'} click={() => closeSome()} />
              <GreenButton text={'Сохранить'} click={() => addToPlaylistVideo()}/>
            </div>
          </AfterBlock>
        </div>
      : null}
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
                {userData?.items?.user?.nickname ?
                <h2>{userData?.items?.user?.nickname}</h2>
                :
                  <h2 className={global.skeleton}>NICKNAME</h2>
                }
                {userData?.items?.user?.count_subscribers ?
                  <div className={global.d2}>
                    {userData?.items?.user?.count_subscribers} Подписчик
                  </div>
                  // <h2>{userData?.items?.user?.nickname}</h2>
                  :
                  <div className={global.d2}>
                    Пока нет подписчиков
                  </div>
                }
              </div>
            </div>
            {/*Тут должен быть редактор фото*/}
            {user?.id === Number(id) ?
              null :
            <div className={styles.follow}>
              <WhiteButton text={'Подписаться'}/>
            </div> }
          </div>
          <div className={styles.tab}>
            <Tab items={tabContent}/>
          </div>

        </div>
    </div>
  )
}

export default Profile

