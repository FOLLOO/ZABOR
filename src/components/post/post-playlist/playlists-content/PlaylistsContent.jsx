import React, { useState } from 'react'

import styles from './playlists-content.module.css'
import global from '../../../../global.module.css'


import folder_trash from '../../../../asserts/icons/update/folder-minus.svg'
import folder_settings from '../../../../asserts/icons/update/folder-cog.svg'
import folder_edit from '../../../../asserts/icons/update/folder-edit.svg'
import folder_output from '../../../../asserts/icons/update/folder-output.svg'



import PlaylistsPost from '../../post-cards/card-for-playlist/PlaylistsPost'
import ContextDrop from '../../../context-drop/ContextDrop'
import ContextGroup from '../../../context-drop/context-group/ContextGroup'
import { useDispatch } from 'react-redux'
import { deleteFolder } from '../../../../redux/slices/folder'
import { useNavigate } from 'react-router-dom'
import Button from "../../../ui/buttons/button/Button";
 /** Это контент плейлиста его описание и его видео*/
function PlaylistsContent ({ data, folder}) {
   const [settingsContext, setSettingsContext] = useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const clickDeleteFolder = () => {
     const id = folder.id;
     try {
         console.log(id)
       dispatch(deleteFolder(id))
       navigate(-1)
     }
     catch (e){
       console.log(e)
     }
   }

  return (
      <div className={`${styles.main} ${global.flex}`}>
          <div className={`${styles.about}`}>
              <div className={styles.title}>
                  {folder.name ? <h3 className={global.bold}>{folder.name}</h3> :
                      <h3 className={global.skeleton}>Nothing</h3>}
              </div>
              <div className={`${global.d2} `}>
                  {folder.description ?
                      folder.description
                      :
                      <div className={`${global.skeleton}`}>
                          тут нет информации
                          тут нет информации
                          тут нет информации
                          тут нет информации
                          тут нет информации
                          тут нет информации
                          тут нет информации
                          тут нет информации
                          тут нет информации
                      </div>}
              </div>
          </div>
          <div className={styles.content}>
              <div className={styles.actions}>
                  <Button img={folder_settings} click={() => setSettingsContext(!settingsContext)}>
                      Редактировать
                  </Button>
                  {settingsContext ?
                      <div className={styles.settingsContext}>
                          <ContextDrop>
                              <ContextGroup>
                                  <Button img={folder_edit}>
                                      Изменить
                                  </Button>
                              </ContextGroup>
                              <ContextGroup noafter>
                                  <div className={`${global.flex} ${global.f_dir_column}`}>
                                      <Button img={folder_output}>Убрать из плейлиста</Button>
                                      <Button img={folder_trash}
                                              variant={'red-text'}
                                              click={() => clickDeleteFolder()}>Удалить плейлист</Button>
                                  </div>
                              </ContextGroup>
                          </ContextDrop>
                      </div>
                      : null}
              </div>

              <div className={`${styles.video} `}>
                  <div className={`${global.flex} ${global.f_dir_column} ${styles.videoOl}`}>
                      {data.length > 0 ?
                          data.map((item) => (
                              // <li className={styles.li}>
                              <PlaylistsPost image={item.coverUrl}
                                             title={item.title}
                                             description={item.description.replace(/<[^>]*>?/gm, '')}
                                             views={item.views_count + 1}
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