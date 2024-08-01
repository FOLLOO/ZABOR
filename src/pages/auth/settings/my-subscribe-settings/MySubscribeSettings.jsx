import React, { useEffect, useState } from 'react'

import styles from './my-subscribe-settings.module.css'

import temp from '../../../../asserts/temp/2.jpg'

import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SettingsTitle from '../../../../components/toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../../../components/toolbar/settings-block/SettingsBlock'
import ProfileCard from '../../../../components/profile/profile-card/ProfileCard'
import Search from '../../../../components/layout/search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribe } from '../../../../redux/slices/sub'
import Nothing from '../../../nothing/Nothing'

function MySubscribeSettings ({}) {

  const dispatch = useDispatch()
  // const [mySubes, setMySubes] = useState()
  const { sub } = useSelector(state => state.subscribes)


  const getSub = () => {
    try{
      dispatch(getSubscribe())
    }
    catch (e){
      console.log(e)
    }
  }

  useEffect(() => {
    if (sub.status === 'loaded') return;
    getSub()
  },[5000])

  // console.log(sub)

  return (
    <div className={styles.main}>
      <BackCreate sticky/>
      <SettingsTitle bigTitle={'Мой подписки'} description={'Изменения сохраняются автоматически'}/>

      <div className={styles.settings}>
        <SettingsBlock
          titleWidth={400}
          // mainWidth={1400}
          title={'Ваши подписки'} >
          <div className={styles.search}>
            <Search/>
          </div>
          <div className={styles.grid}>
            {sub.items.length > 0 ? sub.items.map((item) => (
             <ProfileCard  nickname={item.nickname} image={item.coverUrl} id={item.id}/>
            )) :
            <Nothing/>
            }
          </div>
        </SettingsBlock>
      </div>
    </div>
  )
}

export default MySubscribeSettings