import React, { useEffect, useState } from 'react'

import styles from './playlist-create.module.css'
import global from '../../../../global.module.css'
import SettingsTitle from '../../../../components/toolbar/settings-title/SettingsTitle'
import Search from '../../../../components/layout/search/Search'
import InputText from '../../../../components/ui/input/input-text/InputText'
import Textarea from '../../../../components/ui/input/textarea/Textarea'
import { useAuth } from '../../../../provider/AuthProvider'
import { useDispatch, useSelector } from 'react-redux'
import { createFolder, putPublicationToFolder } from '../../../../redux/slices/folder'
import {useNavigate, useParams} from 'react-router-dom'
import Loading from '../../../loading/Loading'
import SelectPost from '../../../../components/post/post-playlist/select-postORplaylist/SelectPost'
import { getUserPost } from '../../../../redux/slices/post'
import Button from "../../../../components/ui/buttons/button/Button";
import NothingYet from "../../../nothing/nothing-yet/NothingYet";

function PlaylistCreate () {

  const { user } = useAuth()


  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [filtredData, setFiltredData] = useState([])
  const [search, setSearch] = useState('')

  const { userPosts } = useSelector(state => state.posts)
  const isLoading = userPosts.status === 'loading'
  const {id} = useParams()

  const [posts, setPosts] = useState([])


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
              dispatch(putPublicationToFolder(data))
            }
            catch (e){
              console.log(e)
            }
          }
        }
      })
      navigate(`/profile/${user?.id}/playlists`)
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
    try {
      dispatch(getUserPost(id))
    }
    catch (e){
      console.log()
    }
  }

  useEffect(() => {
    if (search) {
      // Фильтруем данные по заголовку
      const filteredItems = userPosts.items.filter(item =>
          item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())
      );
      setFiltredData(filteredItems);
    } else {
      // Если search пуст, можно вернуть изначальные данные
      setFiltredData(userPosts.items);
    }
  }, [search, userPosts.items])

  useEffect(() => {
    if (isLoading){
      getUSerPost()
    }
  },[isLoading])

  if (isLoading){
    return <Loading/>
  }

  //todo: создать поиск постов, по этому же запросу сделать
  // добавление треков -> таким образом приложение будет работать быстрее

  return (
    <div className={styles.main}>
      <SettingsTitle bigTitle={'Создать плейлист'} />
      <div className={styles.settings}>
          <form id={'save_playlist'} onSubmit={submitForm}>
            <div className={styles.profileInputs}>
              <InputText place={'Название плейлиста'}
                           value={title ? title : null} required
                           onChange={(e) => setTitle(e.target.value)}/>
              <Textarea place={'Описание плейлиста'} rows={6} req
                        value={description ? description : null}
                        onChange={(e) => setDescription(e.target.value)}
              />
              <Button variant={'color'} type={'submit'}>
                Сохранить
              </Button>
            </div>
          </form>
        <div className={styles.search}>
          <Search placeholder={'Найти пост'} value={search} onChange={(e) => setSearch(e.target.value) } />
        </div>
        <div className={`${global.flex} ${global.f_dir_column} ${styles.posts}`}>
            {user?.roleId === 1 ?
              <NothingYet />
              :
              search ?
                  filtredData.map((item) => (
                      <SelectPost
                          title={item?.title}
                          id={item?.id}
                          img={`${item?.coverUrl}`}
                          onChange={(event) => addPosts(item?.id, event.target.checked)}
                          description={item.description}
                      />
                  ))
                  : userPosts.items.map((item) => (
                <SelectPost
                  title={item?.title}
                  id={item?.id}
                  img={`${item?.coverUrl}`}
                  onChange={(event) => addPosts(item?.id, event.target.checked)}
                  description={item.description}
                />
              ))
            }
          </div>
      </div>
    </div>
  )
}

export default PlaylistCreate