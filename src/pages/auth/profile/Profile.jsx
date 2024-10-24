import React, { useContext, useEffect, useState } from 'react'

import styles from './profile.module.css'
import global from '../../../global.module.css'

import temp from '../../../asserts/temp/temp.jpg'
import edit from '../../../asserts/icons/edit.svg'
import star from '../../../asserts/icons/STAR.svg'

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
import { getUserAvatar, getUserData, postUserAvatar, postUserCover } from '../../../redux/slices/user'
import { getUserPost } from '../../../redux/slices/post'
import MessageBox from '../../../components/message-box/MessageBox'
import { IMAGE_URL } from '../../../utils'
import TransprantButton from '../../../components/ui/buttons/transprant-button/TransprantButton'
import { postSubscribe } from '../../../redux/slices/sub'
import loading from '../../loading/Loading'

function Profile ({ prewie }) {
  const { overlay, setOverlay, someOpen, setSomeOpen } = useContext(OverlayContext)
  const { id } = useParams()
  const { user } = useAuth()
  const formData = new FormData()

  // const authData = useSelector(selectAuthData);
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.userR)
  const { userFolder } = useSelector(state => state.folder)

  const isUserDataLoading = userData.status === 'loading'

  const [file, setFile] = useState(null)
  const [fileURL, setFileURL] = useState(null)
  const [sub, setSub] = useState(false)

  const [playlist, setPlaylist] = useState([])

  const [happy, setHappy] = useState(0)

  const closeSome = () => {
    Over()
    setSomeOpen(!someOpen)
    setPlaylist([])
  }

  function Over () {
    setOverlay(!overlay)
  }

  // useEffect(() => {
  //   // if (happy) {
  //     console.log('Current happy:', happy)
  //   // }
  // }, [happy])

  const saveImage = (e) => {
    // e.preventDefault()
    // console.log(happy)
    let value = localStorage.getItem('type')
    // console.log(value.toString())
    // alert('value', value)
    if (value === 'avatar') {
      formData.append('avatar', file)
      try {
        dispatch(postUserAvatar(formData))
        Over()
      } catch (err) {
        console.log(err)
      }
    }
    if (value === 'cover') {
      formData.append('cover', file)
      try {
        dispatch(postUserCover(formData))
        Over()
      } catch (err) {
        console.log(err)
      }
    } else {
      alert('💀 Something wrong with your params 💀')
      localStorage.removeItem('type')
    }
  }
  const addPlaylist = (value, isChecked) => {
    // console.log(value, isChecked)
    if (isChecked) {
      if (!playlist.includes(value)) {
        setPlaylist(prevPlaylist => [...prevPlaylist, value])
        // console.log('Added to playlist:', value)
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

  const getUserFolders = () => {
    try {
      dispatch(getUserFolder(id))
    } catch (err) {
      console.log(err)
    }
  }

  const getUser = () => {
    try {
      dispatch(getUserData(id))
      dispatch(getUserAvatar())
    } catch (err) {
      console.log(err)
    }
  }

  const fileChange = (event) => {
    const uploadedFile = event.target.files[0]
    let WIDTH = 1250
    // const AVATAR_WIDTH = 200;
    const type = localStorage.getItem('type')

    switch (type) {
      case 'cover' :
        WIDTH = 1920
        break
      case 'avatar' :
        WIDTH = 400
        break
      default :
        WIDTH = 1250
        break
    }

    if (uploadedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
      if (!allowedExtensions.exec(uploadedFile.name)) {
        alert('Неверный формат файла. Пожалуйста, загрузите файл в формате .jpg, .jpeg, или .png')
        event.target.value = null // Сбросить значение input
        return
      }
      let reader = new FileReader()
      reader.readAsDataURL(uploadedFile)
      reader.onload = (event) => {
        let image_url = event.target.result
        let image = document.createElement('img')
        image.src = image_url
        image.onload = (e) => {
          let canvas = document.createElement('canvas')
          let ratio = WIDTH / e.target.width
          canvas.width = WIDTH
          canvas.height = e.target.height * ratio

          const context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, canvas.width, canvas.height)

          let new_image_url = context.canvas.toDataURL('image/jpeg', 90)

          let new_image = document.createElement('img')
          new_image.src = new_image_url
          setFileURL(new_image_url)
          canvas.toBlob((blob) => {
            // Создаем новый File объект из Blob
            const newFile = new File([blob], uploadedFile.name, { type: 'image/jpeg' })
            setFile(newFile) // Сохраняем File в состоянии
          }, 'image/jpeg', 1)
        }
      }
    }
  }

  function Subscribe () {
    const data = {
      authorId: id
    }
    try {
      dispatch(postSubscribe(data))
      setSub(!sub)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (userData.status === 'loaded') return
    // getUserPosts()
    getUser()
  }, [])

  useEffect(() => {
    if (userFolder.status === 'loaded') return
    getUserFolders()
  }, [])
  console.log(userData)
  /** Контент для Tab */
    // todo: При открытии плейлиста не отображается, Находится ли он в нем уже или нет

  const sortedArray = [...(userData?.items.publications || [])].sort((a, b) => b.id - a.id);

  const tabContent = [
      { title: 'Публикации', content: <UserPosts data={userData.items.publications}/> },
      { title: 'Плейлисты', content: <Playlists/> },
      { title: 'Об авторе', content: <AboutMe data={user ? user : null} social={userData.items.socialMedia}/> },
    ]
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
        {userData?.items.coverUrl ?
          <img src={`${IMAGE_URL}${userData?.items.coverUrl}`} alt={'some'} title={'Превью пользователя'}/>
          :
          <div className={global.skeleton} title={'Превью пользователя'}></div>
        }
      </div>
      {overlay && !someOpen ?
        <div className={`${styles.message} ${global.flex} ${global.f_dir_column}`}
             title={'Форма добавления изображение для ava'}>
          <form className={styles.delete} id={'uploadImage'} onSubmit={() => saveImage()}>
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
            <img src={fileURL} alt={''} className={styles.editImage}/> : null}
          <div className={`${global.flex}`} style={{ gap: '10px' }}>
            <WhiteButton text={'Отмена'} click={() => Over()}/>
            <GreenButton text={'Сохранить'} type={'submit'} form={'uploadImage'}
              // click={() => saveImage()}
                         unique
            />
          </div>
        </div>
        : null
      }
      <div className={styles.content}>
        <div className={styles.profile}>
          <div className={styles.nickname}>
            <ProfileCircle img={`${IMAGE_URL}${userData?.items.avatarUrl}`}
                           size={200}
                           edit={user?.id === Number(id) ? true : null}
                           click={() => {
                             Over()
                             localStorage.setItem('type', 'avatar')
                           }}/>
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
            <div className={styles.edit}>
              <TransprantButton text={'Изменить обложку'} img={edit} left click={() => {
                Over()
                localStorage.setItem('type', 'cover')
              }}/>
            </div>
            :
            <div className={styles.follow}>
              {sub ?
                <TransprantButton text={'Отписаться'}/> :
                <WhiteButton text={'Подписаться'} click={() => Subscribe()}/>}
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

