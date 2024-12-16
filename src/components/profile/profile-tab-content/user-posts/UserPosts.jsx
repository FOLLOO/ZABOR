import React, { useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
//styles
import styles from './userPosts.module.css'
import global from '../../../../global.module.css'
//coponents
import LittleTag from '../../../ui/input/little-tag/LittleTag'
import Button from "../../../ui/buttons/button/Button";
import CardLittle from "../../../post/post-cards/card-little/CardLittle";
import NothingYet from "../../../../pages/nothing/nothing-yet/NothingYet";
//img
import filter from '../../../../asserts/icons/update/sort-desc.svg'
//utils
import {useAuth} from '../../../../provider/AuthProvider'
import {fetchTags} from '../../../../redux/slices/tag'
import {getUserFolder} from "../../../../redux/slices/folder";
import {Helmet} from "react-helmet";

/** Посты пользователя */


function UserPosts({data = []}) {

    const {user} = useAuth()
    const {id} = useParams()

    const {userFolder} = useSelector(state => state.folder)
    const {userData} = useSelector(state => state.userR)


    const [sort, setSort] = useState(false) // сортировка
    const [open, setOpen] = useState(false) // теги
    // const [plstOpen, setPlstOpen] = useState(false) // плейлист


    const dispatch = useDispatch()

    const [tags, setTags] = useState(false)
    const [serverTags, setServerTags] = useState([])
    // const [playlist, setPlaylist] = useState([])

    const [sortData, setSortData] = useState([]) // сортировка

    const navigate = useNavigate()


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
        if (userFolder.status === 'loaded' && user.id === id) return
        getUserFolders()
    }, []);


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
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>ZABOR | Публикации | {user?.nickname || 'Лучший среди всех'}</title>
                    <meta name="description" content={'Публикации пользователя ' + user?.nickname || 'Публикации пользователя'}/>
                    <meta name="keywords" content="HTML, CSS, JavaScript"/>
                    <meta name="author" content="Sairommef"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </Helmet>
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
                            {serverTags.map((item, index) => (
                                <div key={index}>
                                    <LittleTag text={item.name} name={'publications_tags'} id={item.id} onChange={() => setTags(!tags)} />
                                </div>
                            ))}
                        </div>
                        : null}
                <div className={styles.margin}>
                    {sortData.length > 0 ?
                        <div className={styles.grid}>
                            {sortData.map(((message, index) =>
                                        <CardLittle
                                            data={message}
                                            key={index}
                                            id={message?.id}
                                            userID={message?.userId}
                                            avatar={userData.items.avatarUrl ? `${userData.items.avatarUrl}` : null}
                                            img={message?.coverUrl}
                                            blur={!!message?.price}
                                            views={message?.views_count + 1}
                                            time={message?.createdAt}
                                            title={message?.title}
                                            editable={Number(id) === user?.id}
                                            description={message?.description.replace(/<[^>]*>?/gm, '')}
                                            price={message?.price ? message?.price : 'Бесплатно'}
                                            image/>
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
            {data ? UserPosts() : NothingYet() }
        </div>
    )
}

export default UserPosts