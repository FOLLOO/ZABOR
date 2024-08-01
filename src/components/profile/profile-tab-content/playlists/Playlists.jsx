import React, { useEffect, useState } from 'react'

import styles from './palylists.module.css'
import global from '../../../../global.module.css'

import GlassCard from '../../../glasses/glasses-card/GlassCard'
import GreenButton from '../../../ui/buttons/green-button/GreenButton'
import Playlist from '../../../post/post-playlist/Playlist'
import PlaylistsContent from '../../../post/post-playlist/playlists-content/PlaylistsContent'
import { useDispatch, useSelector } from 'react-redux'
import { getPublicationsInFolder, getUserFolder } from '../../../../redux/slices/folder'
import { useNavigate, useParams } from 'react-router-dom'

import temp from '../../../../asserts/temp/top-view-over-chinese-hot-pot.jpg'

function Playlists ({ data = [] }) {

  const {id} = useParams()
  const dispatch = useDispatch();
  const { dataInFolder } = useSelector(state => state.folder)

  const navigate = useNavigate()

  const { userFolder } =  useSelector(state => state.folder)
  const [folder, setFolder] = useState({})
  const [open, setOpen] = useState(false)

  const getFolders = () => {
    try{
      dispatch(getUserFolder(id))
    }catch (err) {
      console.log(err)
    }
  }
  const openFolder = (value, title, description) => {
    setOpen(!open)
    setFolder({'title' : title, 'description': description})
    try{
      dispatch(getPublicationsInFolder(value))
      // console.log('suck yes')
    }catch (e){
      console.log(e)
    }
  }

  useEffect(() => {
    getFolders()
  }, [userFolder?.items < 0])

  useEffect(() => {

  },[open])

  console.log(userFolder?.items)
  /** ничего нет*/
  const NothingYeat = () => {
    return (
      <GlassCard>
        <div className={`${global.flex} ${global.f_center} ${global.f_dir_column} 
        ${global.f_a_center} ${styles.main}`}>
          <h3>Плейлисты</h3>
          <div className={global.d2}>
            {/*Какое то говно переделать нужно*/}
            {userFolder?.items.length > 0 ? userFolder?.items : 'Пока что ничего нет 🤔'}
          </div>
          {userFolder?.items.length > 0 ? null :
            <div className={styles.addButton}>
              <GreenButton text={'Создать'} unique/>
            </div>
          }
        </div>
      </GlassCard>
    )
  }
  /** Отображение плейлистов */
  const AllPlaylists = () => {
    return (
      <>
        <div className={`${styles.title}`}>
          <h2>Плейлисты</h2>
        </div>
        <div className={styles.margin}>
          <div className={styles.grid}>
            <Playlist add />
            {userFolder?.items.length > 0 ? userFolder?.items.map((item =>
                <div onClick={() => openFolder(item?.id, item?.name, item?.description)}>
                <Playlist
                  title={item.name}
                  image={item.latest_publication[0]?.publication?.coverUrl}
                  // image={temp}
                  description={item.description} />
                </div>
            ))
              :
              <>
              {/*<Playlist add/>*/}
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
      <PlaylistsContent data={dataInFolder} folder={folder}/>
    )
  }

  return (
    // margin потому что там ток один атрибут
    <div className={styles.margin}>
      {userFolder?.items !== 'У пользователя нет плейлистов' && userFolder?.items.length > 0 ?
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