import React, { useEffect } from 'react'

import styles from './notifications-settings.module.css'
import global from '../../../../global.module.css'
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SettingsTitle from '../../../../components/toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../../../components/toolbar/settings-block/SettingsBlock'
import InputToggle from '../../../../components/ui/input/input-toggle/InputCheckbox'
import ProfileNickname from '../../../../components/profile/profile-nickname/ProfileNickname'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribe } from '../../../../redux/slices/sub'
import Nothing from '../../../nothing/Nothing'
import { toggleNoti } from '../../../../redux/slices/notifications'
import {IMAGE_URL} from "../../../../utils";

function MyNotificationsSettings () {

  const { sub } = useSelector(state => state.subscribes)
  const dispatch = useDispatch()

  const getSub = () => {
    if (sub.length < 0 || sub.length === undefined){
      try{
        dispatch(getSubscribe())
      }catch (e) {
        console.log(e)
      }
    }
  }
  useEffect(() => {
    if (sub.status === 'loaded') return
    getSub()
  },[])

  const postwToggleNoti = (id) => {
    console.log(id)
    const data = {
      subscriptionId: id
    }
    // console.log(data)
    try {
      dispatch(toggleNoti(data))
    }catch (e) {
      console.log(e)
    }
  }


  return (
    <div className={styles.main}>
      <BackCreate />
      <SettingsTitle
          bigTitle={'Мои уведомления'}
          description={'Изменения сохраняются автоматически'}/>
      <hr/>
      <SettingsBlock title={'Уведомления в браузере'} titleWidth={500}>
        <div className={`${global.flex} ${styles.content}`}>
          <InputToggle id={'all'}/>
          <div className={`${global.flex} ${global.f_dir_column} ${styles.text_content}`}>
            <label htmlFor={'all'}  className={global.t3}>Уведомления в браузере</label>
            <dvi className={global.d3}>
              Вы можете настроить уведомления в настройках вашего браузера
            </dvi>
          </div>
        </div>
      </SettingsBlock>

      <SettingsBlock title={'Уведомления от Авторов'} titleWidth={500}>
        <div className={`${global.flex} ${styles.content}`}>
          <InputToggle id={'all-not'}/>
          <div className={`${global.flex} ${global.f_dir_column} ${styles.text_content}`}>
            <label htmlFor={'all-not'} className={global.t3}>Отключить все уведомления от авторов</label>
          </div>
        </div>

        <div className={styles.avtor_list}>
          {sub?.items.length > 0 ? sub?.items.map((item, index) => (
            <label htmlFor={index} className={`${styles.avtor} ${global.flex}`} key={index}>
              <ProfileNickname type={'subs'} id={item?.id}
                               subs={item?.subs}
                               img={item?.coverUrl ? `${IMAGE_URL}${item?.coverUrl}` : null} nickname={item.nickname}/>
                <div className={`${global.flex} ${styles.gap}`} >
                <div  className={global.t3}>
                  Уведомление
                </div>
              <InputToggle id={index} change={() => postwToggleNoti(item.id)}/>
              </div>
            </label>
          )) : <Nothing/>}

        </div>
      </SettingsBlock>
    </div>
  )
}

export default MyNotificationsSettings