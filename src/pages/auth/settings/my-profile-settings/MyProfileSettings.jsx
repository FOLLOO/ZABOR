import React from 'react'

import styles from './my-profile-settings.module.css'
import global from '../../../../global.module.css'
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SettingsTitle from '../../../../components/toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../../../components/toolbar/settings-block/SettingsBlock'
import InputText from '../../../../components/ui/input/input-text/InputText'
import GreenButton from '../../../../components/ui/buttons/green-button/GreenButton'

function MyProfileSettings (props) {
  return (
    <div className={styles.main}>
      <BackCreate />
      <SettingsTitle bigTitle={'Мой профиль'} description={'Эти данные отображаются на вашей странице в профиле'}/>


      <div className={styles.settings}>
        <SettingsBlock title={'Публичная информация'} descripton={'Эта информация отображается всем. \n' +
          'На вашей странице профиля'} >
          <>
            <InputText place={'nickname'}/>
            <InputText place={'Информация о себе'}/>
            <GreenButton text={'Сохранитть изменения'}/>
          </>
        </SettingsBlock>
      </div>
    </div>
  )
}

export default MyProfileSettings