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

    const [tags, setTags] = useState(false)
    const [serverTags, setServerTags] = useState([])
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

    //может нормально как userFolders сделать?
    const getTags = () => {
        dispatch(fetchTags())
            .then((res) => {
                if (res.error) {
                    console.log(res.error.message)
                }
                if (res.error === undefined) {
                    setServerTags(res.payload)
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
        if(serverTags.length > 0) return
        getTags()
    }, [])

    useEffect(() => {
        if (userFolder.status === 'loaded') return
        getUserFolders()
    }, [overlay]);



    useEffect(() => {
        if (data.length > 0) {
            let checkboxes = document.getElementsByName("publications_tags");
            let selectedCboxes = Array.prototype.slice.call(checkboxes)
                .filter(ch => ch.checked == true)
                .map(ch => Number(ch.id));

            const newFilteredData = data.filter(publication => {
                // Проверим, есть ли у публикации связанные теги
                const publicationTagIds = publication.publication_tags.map(tag => tag.creativeTagId);
                return selectedCboxes.length === 0 || selectedCboxes.some(id => publicationTagIds.includes(id));
            });
            // Сортировка данных
            if (sort) {
                setSortData([...newFilteredData].sort((a, b) => a.id - b.id));
            } else {
                setSortData([...newFilteredData].sort((a, b) => b.id - a.id));
            }
        }

    }, [sort, data, tags])
    const isMe = () => { return user?.id === Number(id) }

    const UserPosts = () => {
        return (
            <>
                <div className={styles.title}>
                    <header className={`${global.flex} ${global.f_a_center} `}>
                        <h3 className={styles.header}>Публикации</h3>
                        {sortData.length > 0 ?
                        <Button img={filter} img_size={'h-6'} click={() => setSort(!sort)}></Button>
                            : null }
                    </header>
                </div>
                    {serverTags.length > 0  ?
                        <div className={open ? `${styles.tags}` : `${styles.tags_hidden}`}>
                                <div className={styles.checkbox}>
                                    <LittleTag text={open ? `Закрыть` : `Еще...`} click={() => setOpen(!open)}/>
                                </div>
                            {serverTags.map(item => (
                                <div>
                                    <LittleTag text={item.name} name={'publications_tags'} id={item.id} onChange={() => setTags(!tags)} />
                                </div>
                            ))}
                        </div>
                        : null}
                <div className={styles.margin}>
                    {sortData.length > 0 ?
                        <div className={styles.grid}>
                            {sortData.map((message =>
                                    <Link to={`/publication/${message.id}`}>
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
                            onButtonClick={() => navigate('/select/author/group_tags')}
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