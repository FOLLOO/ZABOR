import React, { useState } from 'react'

import styles from './playlists-content.module.css'
import global from '../../../../global.module.css'

import settings_b from '../../../../asserts/icons/Settings.svg'
import trash from '../../../../asserts/icons/contextMenu/trash red.svg'
import remover from '../../../../asserts/icons/remove-some.svg'
import edit from '../../../../asserts/icons/edit.svg'

import PlaylistsPost from '../../post-cards/card-for-playlist/PlaylistsPost'
import GlassCard from '../../../glasses/glasses-card/GlassCard'
import InputDporDown from '../../../ui/input/input-dropdown/InputDporDown'
import TransprantButton from '../../../ui/buttons/transprant-button/TransprantButton'
import ContextDrop from '../../../context-drop/ContextDrop'
import ContextGroup from '../../../context-drop/context-group/ContextGroup'
import { useDispatch } from 'react-redux'
import { deleteFolder } from '../../../../redux/slices/folder'
import { useNavigate } from 'react-router-dom'
 /** Это контент плейлиста его описание и его видео*/
function PlaylistsContent ({title, description, data, folder}) {
  // console.log(folder)
  // console.log(data)
   const [settingsContext, setSettingsContext] = useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()
  // console.log(data)
  // console.log(folder)

   const clickDeleteFolder = () => {
     const id = folder.id;
     try {
       dispatch(deleteFolder(id))
       navigate(-1)
     }
     catch (e){
       console.log(e)
     }
   }

  return (
    <div className={`${styles.main} ${global.flex}`}>
      <div className={`${styles.about} ${global.flex} ${global.f_dir_column} ${global.f_ji_center}`}>
          {/*<h2>{title ? title : 'Загрузка...'}</h2>*/}
        {folder.title ?
          <h2>{folder.title}</h2>
          :
          // eslint-disable-next-line jsx-a11y/heading-has-content
          <h2 className={global.skeleton} style={{maxHeight: "60px"}}>.</h2>
        }

        <GlassCard height>
          <div className={`${styles.glassContetn} ${global.flex} ${global.f_dir_column} ${global.f_ji_center}`}>
          <h3>Описание</h3>
            {folder.description ?
          <div className={global.d2}>
            {folder.description}
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
            <TransprantButton img={settings_b} nonePad click={() => setSettingsContext(!settingsContext)}/>
          </div>
        </div>
        {settingsContext ?
          <div className={`${global.flex} ${global.f_end}`}>
        <div className={styles.settingsContext}>
          <ContextDrop>
            <ContextGroup>
              <TransprantButton text={'Изменить'} img={edit} left click={() => navigate('/create/playlist')}/>
            </ContextGroup>
            <ContextGroup noafter>
              <TransprantButton text={'Убрать из плейлиста'} img={remover} left/>
              <TransprantButton text={'Удалить плейлист'} img={trash} red left click={() => clickDeleteFolder()}/>
            </ContextGroup>
          </ContextDrop>
        </div> </div> : null }
        <div className={`${styles.video} `}>
          <div className={`${global.flex} ${global.f_dir_column} ${styles.videoOl}`}>
            {data.items.length > 0 ?
            data.items.map((item) => (
              // <li className={styles.li}>
                <PlaylistsPost image={item.coverUrl}
                                 title={item.title}
                                 description={item.description.replace(/<[^>]*>?/gm, '')}
                                 views={item.views_count + 1 }
                                 cost={item.price}
              />
              // </li>
            )) :
              <li><PlaylistsPost/></li>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaylistsContent