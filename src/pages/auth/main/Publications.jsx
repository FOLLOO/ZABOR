import React, { useContext, useEffect, useState } from 'react'

import styles from './main.module.css'
import SettingsTitle from '../../../components/toolbar/settings-title/SettingsTitle'
import CardLittle from '../../../components/post/post-cards/card-little/CardLittle'
import { useDispatch } from 'react-redux'
import { fetchPosts } from '../../../redux/slices/post'
import { fetchTags } from '../../../redux/slices/tag'
import { Link } from 'react-router-dom'
import MessageBox from '../../../components/message-box/MessageBox'
import { OverlayContext } from '../../../context/OverlayContext'
import LittleTag from '../../../components/ui/input/little-tag/TagCheckBox'
import Loading from '../../loading/Loading'

export default function Publications () {

  const [errMes, setErrMes] = useState("")
  const [loading, setLoading] = useState(false)
  const { overlay } = useContext(OverlayContext)
  const dispatch = useDispatch()
  const [open, setOpen]= useState()

  const [data, setData] = useState([])
  const [tags, setTags] = useState([])
  const getPosts = () => {
    dispatch(fetchPosts())
      .then((res) => {
        if (res.error) {
          setErrMes(res.error.message)
        }
        if (res.error === undefined) {
          setData(res.payload)
          setLoading(true)
        }
      })
  }
  const getTags = () => {
    dispatch(fetchTags())
      .then((res) => {
        if (res.error) {
          setErrMes(res.error.message)
        }
        if (res.error === undefined) {
          setTags(res.payload)
        }
      })
  }

  useEffect(() => {
    getPosts()
    getTags()
  }, [loading])

  return (
    <div className={`${styles.main}`}>
      {overlay ?
      <MessageBox type={'buy'}/>
        : null
      }
      <SettingsTitle bigTitle={'Публикации'}/>
      <div className={open ? `${styles.tags}` : `${styles.tags_hidden}`}>
          <div className={styles.b_width}>
        <LittleTag text={open ? `Закрыть` : `Еще...`} click={() => setOpen(!open)}/>
          </div>
        {tags.length > 0 ?
            //todo: выбрать все
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
      {data.length > 0 ?
      <div className={styles.grid}>
        {data.map(posts => (
          <Link to={`/publications/${posts.id}`}>
            <CardLittle
              data={posts}
              avatar={posts.user.files[0].url}
              blur
              img={posts.coverUrl}
              title={posts.title}
              price={posts.price}
              user_id={posts.userId}
              time={posts.createdAt}
              views={posts.views_count + 1}
            />
          </Link>
        ))}
      </div>
        :
        <>
          <Loading/>
        </>
      }

    </div>
  )
}

