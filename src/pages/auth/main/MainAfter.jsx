import React, { useContext, useEffect, useState } from 'react'

import styles from './main.module.css'
import global from '../../../global.module.css'
import SettingsTitle from '../../../components/toolbar/settings-title/SettingsTitle'
import WhiteButton from '../../../components/ui/buttons/white-button/WhiteButton'
import CardLittle from '../../../components/post/post-cards/card-little/CardLittle'
import { fetchLogin } from '../../../redux/slices/user'
import { useDispatch } from 'react-redux'
import { fetchPosts } from '../../../redux/slices/post'
import { fetchTags } from '../../../redux/slices/tag'
import { Link } from 'react-router-dom'
import MessageBox from '../../../components/message-box/MessageBox'
import { OverlayContext } from '../../../context/OverlayContext'

function MainAfter (props) {

  const [errMes, setErrMes] = useState("")
  const [loading, setLoading] = useState(false)
  const { overlay } = useContext(OverlayContext)
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [tags, setTags] = useState([])
  const getPosts = () => {
    dispatch(fetchPosts())
      .then((res) => {
        if (res.error) {
          setErrMes(res.error.message)
        }
        if (res.error === undefined) {
          // console.log(res)
          // const pathname = localStorage.getItem('token') || '/main'
          setData(res.payload)
          setLoading(true)
          // const {refreshToken} = res.payload.profile
          // setCookie("refreshToken" , refreshToken)
        }
      })
  }
  // console.log(data)

  const getTags = () => {
    dispatch(fetchTags())
      .then((res) => {
        if (res.error) {
          setErrMes(res.error.message)
        }
        if (res.error === undefined) {
          // console.log(res.data)
          // const pathname = localStorage.getItem('token') || '/main'
          setTags(res.payload)
          // const {refreshToken} = res.payload.profile
          // setCookie("refreshToken" , refreshToken)
        }
      })
  }

  useEffect(() => {
    getPosts()
    getTags()
    // console.log('help')
    // console.log(loading)
  }, [loading])

  return (
    <div className={`${styles.main}`}>
      {overlay ?
      <MessageBox type={'buy'}/>
        : null
      }
      <SettingsTitle bigTitle={'Публикации'}/>
      <div className={`${global.flex} ${styles.tags}`}>
        {tags.length > 0 ?
          tags.map(item => (
            <div className={styles.b_width}>
              <WhiteButton text={item.name}/>
            </div>

          ))
        :
          <>
            <WhiteButton text={'Здесь был ТЕГ'}/>
            <WhiteButton text={'Здесь был ТЕГ'}/>
            <WhiteButton text={'Здесь был ТЕГ'}/>
            <WhiteButton text={'Здесь был ТЕГ'}/>
          </>
        }
      </div>

      <div className={styles.grid}>
        {data.length > 0 ? data.map(posts => (
          <Link to={`/post/${posts.id}`}>
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
        )) :
        <>
        <CardLittle title={'some'}/>
        <CardLittle title={'some'}/>
        <CardLittle title={'some'}/>
        <CardLittle title={'some'}/>
        </>
        }
      </div>

    </div>
  )
}

export default MainAfter