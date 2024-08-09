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

function MyNotificationsSettings (props) {

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
    <div className={global.padLeft}>
      <BackCreate sticky />
      <SettingsTitle bigTitle={'Мои уведомления'} description={'Изменения сохраняются автоматически'}/>

      <SettingsBlock title={'Уведомления в браузере'} titleWidth={500}>
        <div className={`${global.flex} ${styles.content}`}>
          <InputToggle id={1}/>
          <div className={`${global.flex} ${global.f_dir_column} ${styles.text_content}`}>
            <div className={global.text}>Уведомления в браузере</div>
            <div className={global.d3}>
              Вы можете настроить уведомления в настройках вашего браузера
            </div>
          </div>
        </div>
      </SettingsBlock>

      <SettingsBlock title={'Уведомления от Авторов'} titleWidth={500}>
        <div className={`${global.flex} ${styles.content}`}>
          <InputToggle id={2}/>
          <div className={`${global.flex} ${global.f_dir_column} ${styles.text_content}`}>
            <div className={global.text}>Отключить все уведомления от авторов</div>
          </div>
        </div>

        <div className={styles.avtor_list}>
          {sub?.items.length > 0 ? sub?.items.map((item) => (
          <div className={`${styles.avtor} ${global.flex}`}>
            <ProfileNickname type={'subs'} subs={item?.subs} nickname={item.nickname}/>
            <div className={`${global.flex} ${styles.gap}`} >
            <div className={global.text}>
              Уведомление от автора
            </div>
            <InputToggle change={() => console.log(sub)}/>
            </div>
          </div>
          )) : <Nothing/>}

        </div>
      </SettingsBlock>
    </div>
  )
}

export default MyNotificationsSettings