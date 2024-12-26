import React, {useEffect, useState} from 'react'

import styles from './my-subscribe-settings.module.css'


import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SettingsTitle from '../../../../components/toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../../../components/toolbar/settings-block/SettingsBlock'
import ProfileCard from '../../../../components/profile/profile-card/ProfileCard'
import Search from '../../../../components/layout/search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribe } from '../../../../redux/slices/sub'
import NothingYet from "../../../nothing/nothing-yet/NothingYet";
import Loading from "../../../../components/STATUS/loading/Loading";
import ServerError from "../../../../components/STATUS/server/ServerError";

function MySubscribeSettings () {

  const dispatch = useDispatch()

  const { sub, status } = useSelector(state => state.subscribes)
  const [data, setData] = useState([])
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


  useEffect(() => {
    if (value) {
      // Фильтруем данные по заголовку
      const filteredItems = sub.items.filter(item =>
          item?.nickname?.toLowerCase().includes(value.toLowerCase()) || item.aboutMe?.toLowerCase().includes(value.toLowerCase())
      );
      setData(filteredItems);
    } else {
      // Если search пуст, можно вернуть изначальные данные
      setData(sub.items);
    }
  }, [value, sub.items])

  if(status === 'loading'){
    return <Loading/>
  }

  if(status === 'error'){
    return <ServerError/>
  }

  return (
    <div>
      <BackCreate />
      <SettingsTitle bigTitle={'Подписки'} description={'Изменения сохраняются автоматически'}/>
      <div className={styles.main}>
      {sub.items.length > 0 ?
      <div className={styles.settings}>
        <SettingsBlock
          title={'Ваши подписки'} >
          <div className={styles.content}>

          <div className={styles.search}>
            <Search onChange={(e) => setValue(e.target.value)} value={value} />
          </div>
          <div className={styles.grid}>
            { data.map((item) => (
             <ProfileCard  nickname={item.nickname} image={item.coverUrl} key={item.id} description={item.aboutMe} id={item.id}/>
            ))}
          </div>
          </div>
        </SettingsBlock>
      </div>
          : <NothingYet/> }
      </div>
    </div>
  )
}

export default MySubscribeSettings