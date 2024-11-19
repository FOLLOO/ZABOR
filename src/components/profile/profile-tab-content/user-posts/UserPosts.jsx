import React, {useContext, useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
//styles
import styles from './userPosts.module.css'
import global from '../../../../global.module.css'
//coponents
import GreenButton from '../../../ui/buttons/green-button/GreenButton'
import LittleTag from '../../../ui/input/little-tag/LittleTag'
import AfterBlock from "../../../after-overlay-block/AfterBlock";
import SelectPost from "../../../post/post-playlist/select-postORplaylist/SelectPost";
import WhiteButton from "../../../ui/buttons/white-button/WhiteButton";
import Button from "../../../ui/buttons/button/Button";
import CardLittle from "../../../post/post-cards/card-little/CardLittle";
import NothingYet from "../../../../pages/nothing/nothing-yet/NothingYet";
//img
import filter from '../../../../asserts/icons/update/sort-desc.svg'
//utils
import {useAuth} from '../../../../provider/AuthProvider'
import {fetchTags} from '../../../../redux/slices/tag'
import {OverlayContext} from "../../../../context/OverlayContext";
import {getUserFolder, putPostToFolder} from "../../../../redux/slices/folder";

/** Посты пользователя */


function UserPosts({data = []}) {

    const {user} = useAuth()
    const {id} = useParams()

    const {userFolder} = useSelector(state => state.folder)
    const {userData} = useSelector(state => state.userR)

    const {overlay, setOverlay} = useContext(OverlayContext)

    const [sort, setSort] = useState(false) // сортировка
    const [open, setOpen] = useState(false) // теги
    const [plstOpen, setPlstOpen] = useState(false) // плейлист


    const dispatch = useDispatch()

    const [tags, setTags] = useState([])
    const [playlist, setPlaylist] = useState([])

    const [sortData, setSortData] = useState([]) // сортировка

    const navigate = useNavigate()


    function Over() {
        setPlstOpen(!plstOpen)
        setOverlay(!overlay)
    }

    const addPlaylist = (value, isChecked) => {
        // console.log(value, isChecked)
        if (isChecked) {
            if (!playlist.includes(value)) {
                setPlaylist(prevPlaylist => [...prevPlaylist, value])
                // console.log('Added to playlist:', value)
            }
        } else {
            setPlaylist(prevPlaylist => prevPlaylist.filter(item => item !== value))
        }
    }
    const addToPlaylistVideo = () => {
        if (playlist.length <= 0) {
            alert('Выберете плейлист')
        }
        const HASH = window.location.hash.replace('#', '')
        for (let i = 0; i < playlist.length; i++) {
            try {
                const data = {
                    publicationId: HASH,
                    folderOfPublicationId: playlist[i]
                }
                dispatch(putPostToFolder(data))
            } catch (e) {
                console.log(e)
            }
        }
        window.location.hash = ''
        Over()
    }
    const getTags = () => {
        dispatch(fetchTags())
            .then((res) => {
                if (res.error) {
                    console.log(res.error.message)
                }
                if (res.error === undefined) {
                    setTags(res.payload)
                }
            })
    }
    const getUserFolders = () => {
        try {
            dispatch(getUserFolder(id))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {
        if (userFolder.status === 'loaded') return
        getUserFolders()
    }, [overlay]);

    useEffect(() => {
        if (data.length > 0) {
            if (sort) {
                setSortData([...(data || [])].sort((a, b) => a.id - b.id))
            } else {
                setSortData([...(data || [])].sort((a, b) => b.id - a.id))
            }
        }

    }, [sort, data])
    const isMe = () => { return user?.id === Number(id) }

    const UserPosts = () => {
        return (
            <>
                <div className={styles.title}>
                    <header className={`${global.flex} ${global.f_a_center} ${styles.some}`}>
                        <h3 className={styles.header}>Публикации</h3>
                        {sortData.length > 0 ?
                        <Button img={filter} img_size={'h-6'} click={() => setSort(!sort)}></Button>
                            : null }
                    </header>
                </div>
                <div className={open ? `${styles.tags}` : `${styles.tags_hidden}`}>
                    {tags.length > 0 && sortData.length > 0 ?
                    <div className={styles.checkbox}>
                        <LittleTag text={open ? `Закрыть` : `Еще...`} click={() => setOpen(!open)}/>
                    </div> : null
                    }
                    {tags.length > 0 && sortData.length > 0 ?
                        tags.map(item => (
                            <div>
                                <LittleTag text={item.name}/>
                            </div>
                        ))
                        : null
                    }
                </div>
                <div className={styles.margin}>
                    {sortData.length > 0 ?
                        <div className={styles.grid}>
                            {sortData.map((message =>
                                    <Link to={`/publications/${message.id}`}>
                                        <CardLittle
                                            data={message}
                                            id={message?.id}
                                            userID={message?.userId}
                                            avatar={`${userData.items.avatarUrl}`}
                                            img={message?.coverUrl}
                                            blur={!!message?.price}
                                            views={message?.views_count + 1}
                                            time={message?.createdAt}
                                            title={message?.title}
                                            editable={Number(id) === user?.id}
                                            description={message?.description.replace(/<[^>]*>?/gm, '')}
                                            price={message?.price ? message?.price : 'Бесплатно'}
                                            image/>
                                    </Link>
                            ))}
                        </div>
                        :
                        <NothingYet
                            isMe={isMe()}
                            isAuthor={user?.roleId === 1}
                            onButtonClick={() => navigate('/group')}
                            buttonText="Создать публикацию"
                        />
                    }
                </div>
            </>
        )
    }

    return (
        <div className={styles.margin}>
            {plstOpen ?
                <div className={styles.addToPalylist}>
                    <AfterBlock>
                        <h2>Выберете плейлист</h2>
                        <div className={styles.addPostsCarda}>
                            {userFolder?.items.map((item) => (
                                <SelectPost title={item?.name}
                                            onChange={(event) => addPlaylist(item?.id, event.target.checked)}
                                            id={item?.id}
                                            img={item?.coverUrl}
                                    // img={temp}
                                            description={item?.description}/>
                            ))}
                        </div>
                        <div className={`${global.flex} ${styles.gap}`}>
                            <WhiteButton text={'Отмена'} click={() => Over()}/>
                            <GreenButton text={'Сохранить'} click={() => addToPlaylistVideo()}/>
                        </div>
                    </AfterBlock>
                </div>
                : null}
            {data ? UserPosts() : NothingYet() }
        </div>
    )
}

export default UserPosts