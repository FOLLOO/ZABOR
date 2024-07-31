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
import { getUserAvatar, getUserData, postUserAvatar } from '../../../redux/slices/user'
import { getUserPost } from '../../../redux/slices/post'
import MessageBox from '../../../components/message-box/MessageBox'
import { IMAGE_URL } from '../../../utils'

function Profile ({ prewie }) {
  const { overlay, setOverlay, someOpen, setSomeOpen } = useContext(OverlayContext)
  const { id } = useParams()
  const { user } = useAuth()
  const formData = new FormData()

  // const authData = useSelector(selectAuthData);
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.userR)
  const { userFolder } = useSelector(state => state.folder)

  const [file, setFile] = useState(null)
  const [fileURL, setFileURL] = useState(null)

  const [playlist, setPlaylist] = useState([])

  const [loading, setLoading] = useState(true)

  const closeSome = () => {
    Over()
    setSomeOpen(!someOpen)
    setPlaylist([])
  }

  function Over () {
    setOverlay(!overlay)
  }

  async function saveImage() {
      formData.append('avatar', file)

      try{
        dispatch(postUserAvatar(formData))
        Over()
      }
      catch (err){
        console.log(err)
      }
  }
  const addPlaylist = (value, isChecked) => {
    // console.log(value, isChecked)
    if (isChecked) {
      if (!playlist.includes(value)) {
        setPlaylist(prevPlaylist => [...prevPlaylist, value])
        console.log('Added to playlist:', value)
      }
    } else {
      setPlaylist(prevPlaylist => prevPlaylist.filter(item => item !== value))
    }

    // console.log(playlist)
  }
  const addToPlaylistVideo = () => {
    if (playlist.length <= 0) {
      alert('Выберете плейлист')
    }
    const HASH = window.location.hash.replace('#', '')
    for (let i = 0; i < playlist.length; i++) {
      try {
        const data = {
          publicationId: HASH,
          folderOfPublicationId: playlist[i]
        }
        dispatch(putPostToFolder(data))
      } catch (e) {
        console.log(e)
      }
    }
    closeSome()
  }

  const getUserPosts = async () => {
    try {
      dispatch(getUserPost(id))
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const getUserFolders = () => {
    try {
      dispatch(getUserFolder(id))
    } catch (err) {
      console.log(err)
    }
  }

  const getUser = () => {
    // const data = {
    //   userId: id
    // }
    try {
      dispatch(getUserData(id))
      dispatch(getUserAvatar())
    } catch (err) {
      console.log(err)
    }
  }

  const fileChange = (event) => {
    const uploadedFile = event.target.files[0]
    setFile(uploadedFile)
    if (uploadedFile) {
      const fileURL = URL.createObjectURL(uploadedFile)
      setFileURL(fileURL)
    }
  }

  useEffect(() => {
      // getUserPosts()
      getUser()
    },
    [])

  useEffect(() => {
    getUserFolders()
  }, [someOpen === true])
console.log(userData)
  /** Контент для Tab */
    // todo: При открытии плейлиста не отобржается Находится ли он в нем уже или нет

  const tabContent = [
      { title: 'Публикации', content: <UserPosts data={userData.items.publications}/> },
      { title: 'Плейлисты', content: <Playlists/> },
      { title: 'Об авторе', content: <AboutMe data={user ? user : null} social={userData.items.socialMedia}/> },
    ]
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
              <WhiteButton text={'Отмена'} click={() => closeSome()}/>
              <GreenButton text={'Сохранить'} click={() => addToPlaylistVideo()}/>
            </div>
          </AfterBlock>
        </div>
        : null}
      <div className={styles.prewieImage}>
        {prewie ?
          <img src={temp} alt={'some'} title={'Превью пользователя'}/>
          :
          <div className={global.skeleton} title={'Превью пользователя'}></div>
        }
      </div>
      {overlay ?
        <div className={`${styles.message} ${global.flex} ${global.f_dir_column}`} title={'Форма добавления изображение для автораки'}>
          <form className={styles.delete} id={'uploadImage'}>
            <input type={'file'} id={'input_file'} style={{ display: 'none' }} onChange={fileChange}/>
            <label htmlFor={'input_file'}>
                      <span className={styles.support}>
                          <header>
                          <h5>{fileURL ? 'Изменить изображение' : 'Импортировать новый файл'}</h5>
                          <p className={global.d2}>Допустимые форматы: .jpeg .jpg .png</p>
                          </header>
                      </span>
            </label>
          </form>
          {fileURL ?
            <img src={fileURL} alt={''}/> : null}
          <div className={`${global.flex}`} style={{ gap: '10px' }}>
            <WhiteButton text={'Отмена'} click={() => Over()}/>
            <GreenButton text={'Сохранить'} type={'submit'} form={'uploadImage'}
                         click={() => saveImage()}
                         unique
            />
          </div>
        </div>
        : null
      }
      <div className={styles.content}>
        <div className={styles.profile}>
          <div className={styles.nickname}>
            <ProfileCircle img={`${IMAGE_URL}${userData?.avatar.url}`}
                            size={200}
                           edit={user?.id === Number(id) ? true : null}
                           click={() => Over()}/>
            <div className={styles.subes}>
              {userData?.items?.user?.nickname ?
                <h2 title={'Псевдоним пользователя'}>{userData?.items?.user?.nickname}</h2>
                :
                <h2 className={global.skeleton}>NICKNAME</h2>
              }
              {userData?.items?.user?.count_subscribers ?
                <div className={global.d2} title={'Количество подписчиков'}>
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
            </div>}
        </div>
        <div className={styles.tab}>
          <Tab items={tabContent}/>
        </div>

      </div>
    </div>
  )
}

export default Profile

