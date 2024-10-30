import React, {useContext, useEffect, useState} from 'react'

import styles from './userPosts.module.css'
import global from '../../../../global.module.css'

import GlassCard from '../../../glasses/glasses-card/GlassCard'
import GreenButton from '../../../ui/buttons/green-button/GreenButton'
// import CardDefault from '../../../post/post-cards/card-default/CardDefault'

// import simpleFilter from '../../../../asserts/icons/simple-filter.svg'
import filter from '../../../../asserts/icons/update/sort-desc.svg'

import {useNavigate, useParams} from 'react-router-dom'
import {useAuth} from '../../../../provider/AuthProvider'
import {useDispatch, useSelector} from 'react-redux'
import {IMAGE_URL} from '../../../../utils'
import LittleTag from '../../../ui/input/little-tag/TagCheckBox'
import {fetchTags} from '../../../../redux/slices/tag'
import AfterBlock from "../../../after-overlay-block/AfterBlock";
import SelectPost from "../../../post/post-playlist/select-postORplaylist/SelectPost";
import WhiteButton from "../../../ui/buttons/white-button/WhiteButton";
import {OverlayContext} from "../../../../context/OverlayContext";
import {getUserFolder, putPostToFolder} from "../../../../redux/slices/folder";
import Button from "../../../ui/buttons/button/Button";
import CardLittle from "../../../post/post-cards/card-little/CardLittle";

/** Посты пользователя */


function UserPosts({data = []}) {

    const {user} = useAuth()
    const {id} = useParams()

    const {userFolder} = useSelector(state => state.folder)
    const {userData} = useSelector(state => state.userR)

    const {overlay, setOverlay} = useContext(OverlayContext)

    const [sort, setSort] = useState(false) // сортировка
    const [open, setOpen] = useState(false) // теги

    const dispatch = useDispatch()

    const [tags, setTags] = useState([])
    const [playlist, setPlaylist] = useState([])

    const [sortData, setSortData] = useState([]) // сортировка

    const navigate = useNavigate()


    function Over() {
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
        } return
    }, [sort, data])

    const NothingYet = () => {
        return (
            <GlassCard>
                <div className={`${global.flex} ${global.f_center} ${global.f_dir_column} 
        ${global.f_a_center} ${styles.main}`}>
                    <h3>Публикации</h3>
                    <div className={global.d2}>
                        {/*Какое-то говно переделать нужно*/}
                        Пока что ничего нет 🤔
                    </div>
                    {id === user?.id ?
                        <div className={styles.addButton}>
                            {user.roleId === 1 ?
                                <GreenButton text={'Создать публикацию'} unique click={() => navigate('/group')}/>
                                :
                                <GreenButton text={'Создать публикацию'} unique click={() => navigate('/create/post')}/>
                            }
                        </div>
                        : null}
                </div>
            </GlassCard>
        )
    }
    const UserPosts = () => {
        return (
            <>
                <div className={styles.title}>
                    <header className={`${global.flex} ${global.f_a_center} ${styles.some}`}>
                        <h3 className={styles.header}>Публикации</h3>
                        <Button img={filter} img_size={'h-6'} click={() => setSort(!sort)}>
                        </Button>
                    </header>
                </div>
                <div className={open ? `${styles.tags}` : `${styles.tags_hidden}`}>
                    <div className={styles.checkbox}>
                        <LittleTag text={open ? `Закрыть` : `Еще...`} click={() => setOpen(!open)}/>
                    </div>
                    {tags.length > 0 ?
                        tags.map(item => (
                            <div>
                                <LittleTag text={item.name}/>
                            </div>
                        ))
                        :
                        <>
                            <LittleTag text={'...'}/>
                        </>
                    }
                </div>
                <div className={styles.margin}>
                    <div className={styles.grid}>
                        {Number(id) === user?.id ? user?.roleId === 1 ?
                                <GreenButton text={'Создать публикацию'} unique click={() => navigate('/group')}/>
                                :
                                <GreenButton text={'Создать публикацию'} unique click={() => navigate('/create/post')}/>
                            : null}
                        {sortData.length > 0 ?
                            sortData.map((message =>
                                    // <>
                                    <CardLittle
                                        data={message}
                                        id={message?.id}
                                        userID={message?.userId}
                                        avatar_img={`${IMAGE_URL}${userData.avatar.url}`} //todo: Пока что ничего нет
                                        img={message?.coverUrl}
                                        blur={!!message?.price}
                                        views={message?.views_count + 1}
                                        // time={new Date(message?.createdAt).toLocaleDateString('ru-RU',)}
                                        time={message?.createdAt}
                                        title={message?.title}
                                        // todo: EDITABLE
                                        editable={Number(id) === user?.id}
                                        description={message?.description.replace(/<[^>]*>?/gm, '')}
                                        price={message?.price ? message?.price : 'Бесплатно'}
                                        image/>
                            ))
                            :
                            <>
                                <CardLittle/>
                                <CardLittle/>
                                <CardLittle/>
                                <CardLittle/>
                            </>
                        }
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className={styles.margin}>
            {overlay ?
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