import React, { useState } from 'react'

import styles from './palylists.module.css'
import global from '../../../../global.module.css'

import GlassCard from '../../../glasses/glasses-card/GlassCard'
import GreenButton from '../../../ui/buttons/green-button/GreenButton'
import Playlist from '../../../post/post-playlist/Playlist'
import PlaylistsContent from '../../../post/post-playlist/playlists-content/PlaylistsContent'

function Playlists ({ data = [] }) {

  const [open, setOpen] = useState(false)

  /** ничего нет*/
  const NothingYeat = () => {
    return (
      <GlassCard>
        <div className={`${global.flex} ${global.f_center} ${global.f_dir_column} 
        ${global.f_a_center} ${styles.main}`}>
          <h3>Плейлисты</h3>
          <div className={global.d2}>
            {/*Какое то говно пределать нужно*/}
            {data ? data : 'Пока что ничего нет 🤔'}
          </div>
          {data ? null :
            <div className={styles.addButton}>
              <GreenButton text={'Создать'} unique/>
            </div>
          }
        </div>
      </GlassCard>
    )
  }
  /** Отобржаение плейлистов */
  const AllPlaylists = () => {
    return (
      <>
        <div className={`${styles.title}`}>
          <h2>Плейлисты</h2>
        </div>
        <div className={styles.margin}>
          <div className={styles.grid} onClick={() => setOpen(!open)}>
            <Playlist add/>
            {data.length > 0 ? data.map((item =>
                <Playlist title={item} image={item} description={item}/>
            ))
              :
              <>
              <Playlist add/>
              </>
            }

          </div>
        </div>
      </>
    )
  }
  /** Отобржаение контента внутри плелиста */
  const PlaylistContetn = () => {
    return (
      <PlaylistsContent/>
    )
  }

  return (
    // margin потому что там ток один атрибут
    <div className={styles.margin}>
      {data ?
        <>
          {open ? PlaylistContetn() :
          <AllPlaylists/>
          }
        </>
        :
        NothingYeat()
      }
    </div>
  )
}

export default Playlists