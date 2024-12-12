import React, {useEffect} from 'react'

import styles from './palylists.module.css'
import global from '../../../../global.module.css'

import Playlist from '../../../../components/post/post-playlist/Playlist'

import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useAuth} from "../../../../provider/AuthProvider";
import NothingYet from "../../../nothing/nothing-yet/NothingYet";
import {getUserFolder} from "../../../../redux/slices/folder";
import {Helmet} from "react-helmet";


function Playlists() {

    const {id} = useParams()
    const {user} = useAuth()

    const dispatch = useDispatch()
    const {userFolder} = useSelector(state => state.folder)

    const navigate = useNavigate()


    const getFolders = () => {
        try {
            dispatch(getUserFolder(id))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getFolders()
    }, [userFolder?.items?.length < 0])

    const isMe = () => {
        return user?.id === Number(id)
    }


    return (
        <div className={styles.margin}>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>ZABOR | Плейлисты | {user.nickname}</title>
                <meta name="description" content={'Плейлисты пользователя' + user.nickname}/>
                <meta name="keywords" content="HTML, CSS, JavaScript"/>
                <meta name="author" content="Sairommef"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>

            {userFolder?.items !== 'У пользователя нет плейлистов' ? (
                    <>
                        <div className={`${styles.title}`}>
                            <h1 className={`${global.xl3} ${global.bold}`}>Плейлисты</h1>
                        </div>
                        <div className={styles.margin}>
                            <div className={styles.grid}>
                                <Playlist add/>
                                { userFolder?.items.map((item =>
                                            <Link to={`/profile/${item?.userId}/playlist/${item.id}`}>
                                            <Playlist
                                                title={item.name}
                                                image={item.latest_publication[0]?.publication?.coverUrl}
                                                // image={temp}
                                                description={item.description}/>
                                            </Link>
                                    ))

                                }
                            </div>
                        </div>
                    </>
                ) : user?.roleId === 2
                ?
                <>
                <div className={`${styles.title}`}>
                    <h1 className={`${global.xl3} ${global.bold}`}>Плейлисты</h1>
                </div>

                <Playlist add/>
                </>
                :
                <NothingYet
                    isMe={isMe()}
                    isAuthor={user?.roleId === 1}
                    buttonText={'Стать автором'}
                    onButtonClick={() => navigate('/select/author/group_tags')}
                />
            }
        </div>
    );
}

export default Playlists