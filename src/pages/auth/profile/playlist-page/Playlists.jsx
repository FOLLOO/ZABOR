import React, { useEffect, useState } from 'react'

import styles from './palylists.module.css'
import global from '../../../../global.module.css'

import Playlist from '../../../../components/post/post-playlist/Playlist'
import PlaylistsContent from '../../../../components/post/post-playlist/playlists-content/PlaylistsContent'

import { useDispatch, useSelector } from 'react-redux'
import { getPublicationsInFolder, getUserFolder } from '../../../../redux/slices/folder'
import { useNavigate, useParams } from 'react-router-dom'
import {useAuth} from "../../../../provider/AuthProvider";
import NothingYet from "../../../nothing/nothing-yet/NothingYet";


function Playlists () {

  const { id } = useParams()
  const { user } = useAuth()

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

  const isMe = () => { return user?.id === Number(id) }


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
        ) :
            <NothingYet
                isMe={isMe()}
                isAuthor={user.roleId === 1}
                onButtonClick={() => navigate('/create/post')}
                buttonText="Создать плейлист"
            />
        }
      </div>
  );
}

export default Playlists