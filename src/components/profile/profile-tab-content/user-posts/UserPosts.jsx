import React, { useEffect, useState } from 'react'

import styles from './userPosts.module.css'
import global from '../../../../global.module.css'

import GlassCard from '../../../glasses/glasses-card/GlassCard'
import GreenButton from '../../../ui/buttons/green-button/GreenButton'
import CardDefault from '../../../post/post-cards/card-default/CardDefault'

import temp
  from '../../../../asserts/temp/smiling-handsome-young-man-city-street-taking-picture-from-vintage-camera.jpg'
import simpleFilter from '../../../../asserts/icons/simple-filter.svg'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../../provider/AuthProvider'
import ContextDrop from '../../../context-drop/ContextDrop'
import ContextGroup from '../../../context-drop/context-group/ContextGroup'
import TransprantButton from '../../../ui/buttons/transprant-button/TransprantButton'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGE_URL } from '../../../../utils'
import LittleTag from '../../../ui/input/little-tag/TagCheckBox'
import { fetchTags } from '../../../../redux/slices/tag'

/** Посты пользователя */


function UserPosts ({ data = [] }) {

  const { user } = useAuth()
  const { id } = useParams()
  const [sort, setSort] = useState(false)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const [tags, setTags] = useState([])

  const { userData } = useSelector(state => state.userR)
  const [datar, setDatar] = useState([])
  const navigate = useNavigate()
  // console.log('id', id , 'userID', user?.id)
  useEffect(() => {
    if (sort){
      setDatar([...(data || [])].sort((a, b) => a.id - b.id))
      console.log("kek")
    }
    else {
    setDatar([...(data || [])].sort((a, b) => b.id - a.id))
    }
    // console.log("lol")
  },[sort])
  /** Нет постов*/

  const getTags = () => {
    dispatch(fetchTags())
      .then((res) => {
        if (res.error) {
          console.log(res.error.message)
        }
        if (res.error === undefined) {
          setTags(res.payload)
        }
      })
  }

  useEffect(() => {
    getTags()
  }, [])
  const NothingYeat = () => {
    return (
      <GlassCard>
        <div className={`${global.flex} ${global.f_center} ${global.f_dir_column} 
        ${global.f_a_center} ${styles.main}`}>
          <h3>Публикации</h3>
          <div className={global.d2}>
            {/*Какое-то говно переделать нужно*/}
            Пока что ничего нет 🤔
          </div>
          {id === user?.id ?
            <div className={styles.addButton}>
              {user.roleId === 1 ?
                <GreenButton text={'Создать публикацию'} unique click={() => navigate('/group')}/>
                :
                <GreenButton text={'Создать публикацию'} unique click={() => navigate('/create/post')}/>
              }
            </div>
            : null}
        </div>
      </GlassCard>
    )
  }
// console.log(userData)
  const UserPosts = () => {
    return (
      <>
        <div className={styles.title}>
          <header className={`${global.flex} ${global.f_a_center}`}>
           <h2>Публикации</h2>
            <div className={styles.button}>
            <TransprantButton img={simpleFilter} left click={() => setSort(!sort)}/>
            </div>
          </header>
        </div>
        <div className={open ? `${styles.tags}` : `${styles.tags_hidden}`}>
          <LittleTag text={open ? `Закрыть` : `Еще...`} click={() => setOpen(!open)}/>
          {tags.length > 0 ?
            tags.map(item => (
              <div className={styles.b_width}>
                <LittleTag text={item.name}/>
              </div>
            ))
            :
            <>
              <LittleTag text={'Ошибка при загрузке тегов...'}/>
            </>
          }
        </div>
        <div className={styles.margin}>
          <div className={styles.grid}>
            {Number(id) === user?.id ? user?.roleId === 1 ?
                <GreenButton text={'Создать публикацию'} unique click={() => navigate('/group')}/>
                :
                <GreenButton text={'Создать публикацию'} unique click={() => navigate('/create/post')}/>
              : null}
            {datar.length > 0 ?
              datar.map((message =>
              // <>
                <CardDefault
                  data={message}
                  id={message?.id}
                  userID={message?.userId}
                  avatar_img={`${IMAGE_URL}${userData.avatar.url}`} //todo: Пока что ничего нет
                  img={message?.coverUrl}
                  blur={!!message?.price}
                  views={message?.views_count + 1}
                  time={new Date(message?.createdAt).toLocaleDateString('ru-RU',)}
                  title={message?.title}
                  // todo: EDITABLE
                  editable={Number(id) === user?.id}
                  description={message?.description.replace(/<[^>]*>?/gm, '')}
                  price={message?.price ? message?.price : 'Бесплатно'}
                  image/>
                ))
              :
              <>
                <CardDefault/>
                <CardDefault/>
                <CardDefault/>
                <CardDefault/>
              </>
            }
          </div>
        </div>
      </>
    )
  }

  return (
    // margin потому что там ток один атрибут
    <div className={styles.margin}>
      {data ?
        UserPosts()
        : NothingYeat()
      }

    </div>
  )
}

export default UserPosts