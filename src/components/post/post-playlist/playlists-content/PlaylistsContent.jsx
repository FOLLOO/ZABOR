import React from 'react'

import styles from './playlists-content.module.css'
import global from '../../../../global.module.css'

import settings_b from '../../../../asserts/icons/Settings.svg'

import PlaylistsPost from '../../post-cards/card-for-playlist/PlaylistsPost'
import GlassCard from '../../../glasses/glasses-card/GlassCard'
import InputDporDown from '../../../ui/input/input-dropdown/InputDporDown'
import TransprantButton from '../../../ui/buttons/transprant-button/TransprantButton'

function PlaylistsContent (props) {
  return (
    <div className={`${styles.main} ${global.flex}`}>
      <div className={`${styles.about} ${global.flex} ${global.f_dir_column} ${global.f_ji_center}`}>
          <h2>Название</h2>
        <GlassCard width height>
          <div className={`${styles.glassContetn} ${global.flex} ${global.f_dir_column} ${global.f_ji_center}`}>
          <h3>Описание</h3>
          <div className={global.d2}>
            Я целеустремленный и креативный специалист,
            который постоянно находится в поиске новых возможностей для самореализации.
            С радостью делюсь своими идеями и знаниями со всеми, кто меня окружает.
            Стремлюсь к постоянному саморазвитию и совершенствованию своих навыков.
          </div>
          </div>
        </GlassCard>
      </div>
      <div className={styles.content}>
        <div className={`${styles.actions} ${global.flex} ${global.f_s_between}`}>
          <div className={styles.input}>
          <InputDporDown/>
          </div>
          <div className={styles.settings}>
            <TransprantButton img={settings_b} nonePad/>
          </div>
        </div>
        <div className={`${styles.video} `}>
          <ol className={`${global.flex} ${global.f_dir_column} ${styles.videoOl}`}>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default PlaylistsContent