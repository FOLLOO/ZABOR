import React from 'react'

import styles from './playlists-content.module.css'
import global from '../../../../global.module.css'

import settings_b from '../../../../asserts/icons/Settings.svg'

import PlaylistsPost from '../../post-cards/card-for-playlist/PlaylistsPost'
import GlassCard from '../../../glasses/glasses-card/GlassCard'
import InputDporDown from '../../../ui/input/input-dropdown/InputDporDown'
import TransprantButton from '../../../ui/buttons/transprant-button/TransprantButton'
 /** Это контент плейлиста его описание и его видео*/
function PlaylistsContent ({title, description, data}) {
  return (
    <div className={`${styles.main} ${global.flex}`}>
      <div className={`${styles.about} ${global.flex} ${global.f_dir_column} ${global.f_ji_center}`}>
          {/*<h2>{title ? title : 'Загрузка...'}</h2>*/}
        {title ?
          <h2>{title}</h2>
          :
          // eslint-disable-next-line jsx-a11y/heading-has-content
          <h2 className={global.skeleton} style={{maxHeight: "60px"}}>.</h2>
        }

        <GlassCard width height>
          <div className={`${styles.glassContetn} ${global.flex} ${global.f_dir_column} ${global.f_ji_center}`}>
          <h3>Описание</h3>
            {description ?
          <div className={global.d2}>
            {description}
          </div>
            :
              <div className={`${global.d2} ${global.skeleton}`}>
                тут нет информации
                тут нет информации
                тут нет информации

                тут нет информации
                тут нет информации
                тут нет информации

                тут нет информации
                тут нет информации
                тут нет информации
              </div>
              // <h2 className={global.skeleton}>alksdjfajsdlkfaskldjflkasdlkf </h2>
            }
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
            <li><PlaylistsPost views={10000}/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
            <li><PlaylistsPost/></li>
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