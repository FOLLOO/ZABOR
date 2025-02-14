import React, { useEffect } from 'react'

import styles from './post-analytics.module.css'
import global from '../../../../global.module.css'
import PostReview from './post-review/PostReview'
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SettingsTitle from '../../../../components/toolbar/settings-title/SettingsTitle'
import PostSells from './post-sells/PostSells'
import PostAudience from './post-audience/PostAudience'
import TabMain from '../../../../components/ui/tab/TabMain'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function PostAnalytics (props) {
  const {id} = useParams()
  const {pathname} = useLocation()
  const navigate = useNavigate()

  const tabContent = [
    {id: 0, title: 'Обзор', content: <PostReview/>  },
    {id: 1, title: 'Продажи', content: <PostSells/> },
    {id: 2, title: 'Аудитория', content: <PostAudience/> },
  ]

  useEffect(() => {
    if (id === null || id === undefined){
      navigate(`${pathname}/0`)
    }
  })

  return (
    <div className={`${global.padLeft} `}>
      <BackCreate  sticky/>
      <SettingsTitle bigTitle={`Аналитика поста "Новый пост"`} description={'А ты хорош!'}/>
      <div className={styles.margin}>
      <TabMain items={tabContent}/>
      </div>
    </div>
  )
}

export default PostAnalytics