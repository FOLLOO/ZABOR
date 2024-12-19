import React, {useEffect, useRef, useState} from 'react'

import styles from './playlists-content.module.css'
import global from '../../../../global.module.css'


import folder_trash from '../../../../asserts/icons/update/folder-minus.svg'
import trash from '../../../../asserts/icons/update/trash-2.svg'
import folder_edit from '../../../../asserts/icons/update/folder-edit.svg'
import folder_output from '../../../../asserts/icons/update/folder-output.svg'
import folder_add from '../../../../asserts/icons/update/folder-input.svg'



import PlaylistsPost from '../../post-cards/card-for-playlist/PlaylistsPost'
import ContextDrop from '../../../context-drop/ContextDrop'
import ContextGroup from '../../../context-drop/context-group/ContextGroup'
import { useDispatch } from 'react-redux'
import {deleteFolder, deletePublicationFromFolder, putFolder} from '../../../../redux/slices/folder'
import {useNavigate, useParams} from 'react-router-dom'
import Button from "../../../ui/buttons/button/Button";
import {IMAGE_URL, TITLE} from "../../../../utils";
import {useAuth} from "../../../../provider/AuthProvider";
import InputText from "../../../ui/input/input-text/InputText";
import Textarea from "../../../ui/input/textarea/Textarea";
import {Helmet} from "react-helmet";
 /** Это контент плейлиста его описание и его видео*/
function PlaylistsContent ({ data, folder}) {

   const { user } = useAuth()
   const {id,playlistID} = useParams();
   const [settingsContext, setSettingsContext] = useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const settings = useRef()

   const [editing, setEditing] = useState(false)
   const [title, setTitle] = useState(folder.name)
   const [description, setDescrioption] = useState(folder.description)

   const [delet, setDelete] = useState(false)

     const setPublicationsOver = () => {
         const dialog = document.getElementById('add-publication-to-playlist')
         // console.log(dialog)
         const isOpen = dialog.open
         isOpen ?  dialog.close() : dialog.showModal()
     }


   const clickDeleteFolder = () => {
      const req = {
          id: playlistID
      }
      try {
       dispatch(deleteFolder(req))
       navigate(-1)
     }
     catch (e){
       console.log(e)
     }
   }

   const deletePostFromFolder = (id) => {
       const res = {
           publicationId: id,
           folderOfPublicationId: Number(playlistID),
       }
       try {
           dispatch(deletePublicationFromFolder(res))
       }
       catch (e){
           console.log(e)
       }
   }

   const submitFolderEdits = (e) => {
       e.preventDefault()
       const edits = {
           folderOfPublicationId: Number(playlistID),
           name: title,
           description: description,
       }
       try{
           dispatch(putFolder(edits))
           setEditing(!editing)
           window.location.reload()
       }catch(e){
           console.log('Ошибка при обновлении', e)
       }
   }

     function handleClickOutside(event){
         if (settings.current && !settings.current.contains(event.target)) {
             setSettingsContext(false);
         }
     }
     useEffect(() => {
         document.addEventListener('mousedown', handleClickOutside)
         return () => document.removeEventListener('mousedown', handleClickOutside)
     }, [])

  return (
      <div className={`${styles.main} ${global.flex}`}>
          <Helmet>
              <meta charSet="utf-8"/>
              <title>{TITLE} | {folder?.name}</title>
              <meta name="description" content={folder?.description}/>
              <meta name="keywords" content="HTML, CSS, JavaScript"/>
              <meta name="author" content="Sairommef"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          </Helmet>

          <div className={`${global.flex} ${styles.informationBlock}`}>
              <div className={`${styles.image}`}>
                  <img src={`${IMAGE_URL}${data[0]?.coverUrl}`} alt="about"/>
              </div>
                  {editing ?
                      <form id={'edit-names'} className={styles.about} onSubmit={submitFolderEdits}>
                          <InputText value={title} onChange={(e) => setTitle(e.target.value)}
                                     place={'Название плейлиста'} required />
                          <hr className={global['h-5']}/>
                          <Textarea rows={5} place={'Описание плейлиста'} value={description}
                                    onChange={(e) => setDescrioption(e.target.value)} req/>
                      </form>
              : <div className={`${styles.about}`}>

                  <div className={styles.title}>
                      {folder.name ? <h3 className={`${global.bold} ${global.xl3}`}>{folder.name}</h3> :
                          <h3 className={global.skeleton}>Nothing</h3>}
                  </div>
                  <div className={`${global.d2} `}>
                      {folder.description ?
                          folder.description
                          :
                          <div className={`${global.skeleton}`}>
                              тут нет информации тут нет информации тут нет информации тут нет информации
                          </div>}
                  </div>
              </div> }
              {user.id === Number(id) ?
              <Button variant={'outlet'} type={ editing ? 'submit' : 'button'}
                      form={editing ? 'edit-names' : null}
                      className={global.f_center}
                      click={editing ? null : () => setSettingsContext(!settingsContext)}>
                  {editing ? 'Сохранить' : 'Изменить'}
              </Button> : null}

              <div className={styles.actions}>
                  {settingsContext ?
                      <div className={styles.settingsContext} ref={settings}>
                          <ContextDrop>
                              <ContextGroup>
                                  <Button img={folder_edit} click={() => setEditing(true) }>
                                      Изменить
                                  </Button>
                              </ContextGroup>
                              <ContextGroup noafter>
                                  <div className={`${global.flex} ${global.f_dir_column}`}>
                                      <Button img={folder_add} click={() => setPublicationsOver()}>Добавить публикацию</Button>
                                      <Button img={folder_output} click={() => setDelete(!delet)}>Убрать публикацию</Button>
                                      <Button img={folder_trash}
                                              variant={'red-text'}
                                              click={() => clickDeleteFolder()}>Удалить плейлист</Button>
                                  </div>
                              </ContextGroup>
                          </ContextDrop>
                      </div>
                      : null}
              </div>
          </div>
          <hr className={styles.separator} />
          <div className={styles.content}>
              <div className={`${styles.video} `}>
                  <div className={`${global.flex} ${global.f_dir_column} ${styles.videoOl}`}>
                      {data.length > 0 ?
                          data.map((item, i) => (
                              <div className={`${global.flex} `} key={i}>
                              <PlaylistsPost image={item.coverUrl}
                                             title={item.title}
                                             description={item.description.replace(/<[^>]*>?/gm, '')}
                                             views={item.views_count + 1}
                                             cost={item.price}
                              />
                                  {delet ? <Button img={trash}
                                  click={() => deletePostFromFolder(item?.id)}
                                  ></Button> : null}
                              </div>
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