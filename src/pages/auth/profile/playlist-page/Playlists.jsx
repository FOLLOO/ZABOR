import React, { useEffect, useState } from 'react'

import styles from './palylists.module.css'
import global from '../../../../global.module.css'

import GlassCard from '../../../../components/glasses/glasses-card/GlassCard'
import GreenButton from '../../../../components/ui/buttons/green-button/GreenButton'
import Playlist from '../../../../components/post/post-playlist/Playlist'
import PlaylistsContent from '../../../../components/post/post-playlist/playlists-content/PlaylistsContent'

import { useDispatch, useSelector } from 'react-redux'
import { getPublicationsInFolder, getUserFolder } from '../../../../redux/slices/folder'
import { useNavigate, useParams } from 'react-router-dom'


function Playlists ({ data = [] }) {

  const { id } = useParams()
  const dispatch = useDispatch()
  const { dataInFolder, userFolder } = useSelector(state => state.folder)

  const navigate = useNavigate()

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
    setFolder({'id' : value,'title' : title, 'description': description})
    try{
      dispatch(getPublicationsInFolder(value))
    }catch (e){
      console.log(e)
    }
  }

  useEffect(() => {
    getFolders()
  }, [userFolder?.items?.length < 0])

  /** Отображение пустоты */
  const NothingYet = () => {
    return (
      <GlassCard>
        <div className={`${global.flex} ${global.f_center} ${global.f_dir_column} 
        ${global.f_a_center} ${styles.main}`}>
          <h3>Плейлисты</h3>
          <div className={global.d2}>
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
          <h1 className={`${global.xl3} ${global.bold}`}>Плейлисты</h1>
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

  return (
      <div className={styles.margin}>
        {userFolder?.items !== 'У пользователя нет плейлистов' && userFolder?.items.length > 0 ? (
            <>
              {open ? (
                  <PlaylistsContent data={dataInFolder} folder={folder}/>
              ) : (
                  <AllPlaylists />
              )}
            </>
        ) : (
            NothingYet()
        )}
      </div>
  );
}

export default Playlists