import React, { useEffect, useState } from 'react'

import styles from './playlist-create.module.css'
import global from '../../../../global.module.css'
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SettingsTitle from '../../../../components/toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../../../components/toolbar/settings-block/SettingsBlock'
import Search from '../../../../components/layout/search/Search'
import InputText from '../../../../components/ui/input/input-text/InputText'
import Textarea from '../../../../components/ui/input/textarea/Textarea'
import { useAuth } from '../../../../provider/AuthProvider'
import { useDispatch, useSelector } from 'react-redux'
import { createFolder, putPostToFolder } from '../../../../redux/slices/folder'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../loading/Loading'
import SelectPost from '../../../../components/post/post-playlist/select-postORplaylist/SelectPost'
import { getUserPost } from '../../../../redux/slices/post'

function PlaylistCreate ({}) {

  const { user } = useAuth()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const { userPosts } = useSelector(state => state.posts)
  const isLoading = userPosts.status === 'loading'

  const [posts, setPosts] = useState([])
  // useEffect(() => {
  //   if (isLoading) return
  //   // console.log(userPosts.items)
  // }, [isLoading])

  const submitForm = (e) => {
    e.preventDefault()
    const data = {
      name : title,
      description : description,
      tags : [
        {id : 2},
        {id : 5},
      ]
    }
    try{
      dispatch(createFolder(data)).then((res) => {
        if (res.error === undefined) {
          console.log(res)
          const folderId = res?.payload?.id
          // console.log(folderId)
          for(let i = 0; i < posts.length; i++){
            try{
              const data = {
                publicationId: posts[i],
                folderOfPublicationId: folderId
              }
              dispatch(putPostToFolder(data))
            }
            catch (e){
              console.log(e)
            }
          }
        }
      })
      navigate(`/profile/${user?.id}#1`)
    }catch (err){
      console.log(err)
    }
  }

  const addPosts = (value, isChecked) => {
    if (isChecked) {
      if (!posts.includes(value)) {
        setPosts(prevPosts => [...prevPosts, value]);
        // console.log('Added to playlist:', value);
      }
    } else {
      setPosts(prevPosts => prevPosts.filter(item => item !== value));
    }
  };
  const getUSerPost = () => {
    const id = user.id
    try {
      dispatch(getUserPost(id))
    }
    catch (e){
      console.log()
    }
  }

  useEffect(() => {
    if (isLoading){
      getUSerPost()
    }
  },[isLoading])

  if (isLoading){
    return <Loading/>
  }

  return (
    <div className={styles.main}>
      <div className={`${styles.navigate}`}>
      <BackCreate button greenText={'Сохранить'} greenButtonForm={'save_playlist'}/>
      </div>
      <SettingsTitle bigTitle={'Создать плейлист'} />
      <div className={styles.settings}>
        <SettingsBlock
          titleWidth={400}
          mainWidth={1400}
          title={'Заголовок и описание'} >
          <form id={'save_playlist'} onSubmit={submitForm}>
          <div className={styles.profileInputs}>
            <InputText  place={'Название плейлиста'}
                        value={title ? title : null}
                        onChange={(e) => setTitle(e.target.value)}/>
            {/*<InputText place={'Информация о себе'}/>*/}
            <Textarea place={'Описание плейлиста'} rows={10}
                      value={description ? description : null}
                      onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          </form>
        </SettingsBlock>
          {/*На будущее*/}
            {/*<SettingsBlock*/}
            {/*  titleWidth={400}*/}
            {/*  mainWidth={1400}*/}
            {/*  title={'Приватность'} >*/}
            {/*  <div className={`${global.flex} ${styles.toggle}`}>*/}
            {/*    <InputToggle/>*/}
            {/*    <SettingsBlock noMargin titleWidth={'100%'} mainWidth={'100%'}*/}
            {/*    title={'Виден всем'} descripton={'Этот плейлист будет отображаться на странице вашего профиля всем пользователям'}*/}
            {/*    >*/}

            {/*    </SettingsBlock>*/}
            {/*  </div>*/}
            {/*</SettingsBlock>*/}
        <SettingsBlock
          titleWidth={400}
          mainWidth={1400}
          title={'Ваши видео'}
          descripton={'Можете сразу добавить ваши видео в плейлист'}
        >
          <div className={styles.search}>
            <Search/>
          </div>
          <div className={`${global.flex} ${global.f_dir_column} ${styles.posts}`}>
            {user?.roleId === 1 ?
              <>
                У вас нет видео
              </>
              :
              userPosts.items.map((item) => (
                // <PlaylistsPost views={item.views_count ? item.views_count : 1 }
                //                cost={item.price ? item.price : 'Бесплатно'}
                //                title={item.title}
                //                description={item.description}
                //
                // />
                <SelectPost
                  title={item?.title}
                  id={item?.id}
                  onChange={(event) => addPosts(item?.id, event.target.checked)}
                  description={item.description}
                />
              ))
            }

          </div>
        </SettingsBlock>
      </div>
    </div>
  )
}

export default PlaylistCreate