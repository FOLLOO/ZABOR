import React from 'react'

import styles from './playlist-create.module.css'
import global from '../../../../global.module.css'
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SettingsTitle from '../../../../components/toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../../../components/toolbar/settings-block/SettingsBlock'
import Search from '../../../../components/layout/search/Search'
import ProfileCard from '../../../../components/profile/profile-card/ProfileCard'
import temp from '../../../../asserts/temp/2.jpg'
import InputText from '../../../../components/ui/input/input-text/InputText'
import Textarea from '../../../../components/ui/input/textarea/Textarea'
import GreenButton from '../../../../components/ui/buttons/green-button/GreenButton'
import InputToggle from '../../../../components/ui/input/input-toggle/InputCheckbox'
import PlaylistsPost from '../../../../components/post/post-cards/card-for-playlist/PlaylistsPost'

function PlaylistCreate ({}) {
  return (
    <div className={styles.main}>
      <BackCreate sticky greenText={'Сохранить'}/>
      <SettingsTitle bigTitle={'Создать плейлист'} />

      <div className={styles.settings}>
        <SettingsBlock
          titleWidth={400}
          mainWidth={1400}
          title={'Заголовок и описание'} >
          <div className={styles.profileInputs}>
            <InputText  place={'Название плейлиста'}/>
            {/*<InputText place={'Информация о себе'}/>*/}
            <Textarea place={'Описаине плейлиста'} rows={15}/>
          </div>
        </SettingsBlock>

        <SettingsBlock
          titleWidth={400}
          mainWidth={1400}
          title={'Приватность'} >
          <div className={`${global.flex} ${styles.toggle}`}>
            <InputToggle/>
            <SettingsBlock noMargin titleWidth={'100%'} mainWidth={'100%'}
            title={'Виден всем'} descripton={'Этот плейлист будет отоборажаться на странице вашего профиля всем пользователям'}
            >

            </SettingsBlock>
          </div>
        </SettingsBlock>

        <SettingsBlock
          titleWidth={400}
          mainWidth={1400}
          title={'Заголовок и описание'} >
          <div className={styles.search}>
            <Search/>
          </div>
          <div className={`${global.flex} ${global.f_dir_column} ${styles.posts}`}>
           <PlaylistsPost />
           <PlaylistsPost />
           <PlaylistsPost />
          </div>
        </SettingsBlock>
      </div>
    </div>
  )
}

export default PlaylistCreate