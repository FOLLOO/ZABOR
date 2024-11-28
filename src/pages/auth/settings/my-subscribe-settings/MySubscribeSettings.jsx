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
import NothingYet from "../../../nothing/nothing-yet/NothingYet";

function MySubscribeSettings () {

  const dispatch = useDispatch()

  const { sub } = useSelector(state => state.subscribes)

  const [value, setValue] = React.useState('')

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
  },[])



  return (
    <div className={styles.main}>
      <BackCreate />
      <SettingsTitle bigTitle={'Подписки'} description={'Изменения сохраняются автоматически'}/>
      {sub.items.length > 0 ?
      <div className={styles.settings}>
        <SettingsBlock
          title={'Ваши подписки'} >
          <div className={styles.content}>

          <div className={styles.search}>
            <Search onChange={(e) => setValue(e.target.value)} value={value ? value : null} />
          </div>
          <div className={styles.grid}>
            { sub.items.map((item) => (
             <ProfileCard  nickname={item.nickname} image={item.coverUrl} description={item.aboutMe} id={item.id}/>
            ))}
          </div>
          </div>
        </SettingsBlock>
      </div>
          : <NothingYet/> }
    </div>
  )
}

export default MySubscribeSettings