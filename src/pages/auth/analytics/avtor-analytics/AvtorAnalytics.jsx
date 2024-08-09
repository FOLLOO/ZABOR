import React, { useEffect } from 'react'

import styles from './avtor-analytics.module.css'
import global from '../../../../global.module.css'
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SettingsTitle from '../../../../components/toolbar/settings-title/SettingsTitle'
import TabMain from '../../../../components/ui/tab/TabMain'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AvtorReview from './avtor-review/AvtorReview'
import AvtorSells from './avtor-sells/AvtorSells'
import AvtorAudience from './avtor-audience/AvtorAudience'

function AvtorAnalytics (props) {
  const {id} = useParams()
  const {pathname} = useLocation()
  const navigate = useNavigate()
  // console.log(pathname)
  const tabContent = [
    {id: 0, title: 'Обзор', content: <AvtorReview/>  },
    {id: 1, title: 'Продажи', content: <AvtorSells/> },
    {id: 2, title: 'Аудитория', content: <AvtorAudience/> },
  ]

  useEffect(() => {
    if (id === null || id === undefined){
      navigate(`${pathname}/0`)
    }
  })

  return (
    <div className={`${global.padLeft} `}>
      <BackCreate  sticky/>
      <SettingsTitle bigTitle={`Аналитика по странице`} description={'А ты хорош!'}/>
      <div className={styles.margin}>
        <TabMain items={tabContent}/>
      </div>
    </div>
  )
}

export default AvtorAnalytics