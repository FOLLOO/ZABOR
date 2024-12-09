import React, { useEffect, useState} from 'react'

import styles from './main.module.css'
import SettingsTitle from '../../../components/toolbar/settings-title/SettingsTitle'
import CardLittle from '../../../components/post/post-cards/card-little/CardLittle'
import {useDispatch} from 'react-redux'
import {fetchPosts} from '../../../redux/slices/post'
import {fetchTags} from '../../../redux/slices/tag'
import { useParams} from 'react-router-dom'
import LittleTag from '../../../components/ui/input/little-tag/LittleTag'
import NothingYet from "../../nothing/nothing-yet/NothingYet";
import {useAuth} from "../../../provider/AuthProvider";

export default function Publications() {
    let {group, creative_tags} = useParams();

    const {user} = useAuth()
    const [errMes, setErrMes] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [open, setOpen] = useState()

    const [data, setData] = useState([])
    const [tags, setTags] = useState([])


    const getPosts = () => {
        let checkboxes = document.getElementsByName("publications_tags");
        let selectedCboxes = Array.prototype.slice.call(checkboxes)
            .filter(ch => ch.checked == true)
            .map(ch => ch.id);

        const params = {
            group: group ? group : 'main',
            creative_tags: creative_tags ? creative_tags : selectedCboxes,
        }
        dispatch(fetchPosts(params))
            .then((res) => {
                if (res.error) {
                    setErrMes(res.error.message)
                }
                if (res.error === undefined) {
                    setData(res.payload)
                    setLoading(true)
                }
            })
    }
    const getTags = () => {
        dispatch(fetchTags())
            .then((res) => {
                if (res.error) {
                    setErrMes(res.error.message)
                }
                if (res.error === undefined) {
                    setTags(res.payload)
                }
            })
    }

    useEffect(() => {
        getPosts()
        getTags()
    }, [loading])


    return (
        <div className={`${styles.main}`}>
            <SettingsTitle bigTitle={'Публикации'}/>
            <div className={open ? `${styles.tags}` : `${styles.tags_hidden}`}>
                <div className={styles.b_width}>
                    <LittleTag text={open ? `Закрыть` : `Еще...`} click={() => setOpen(!open)}/>
                </div>
                {tags.length > 0 ?
                    //todo: выбрать все
                    tags.map(item => (
                        <div className={styles.b_width}>
                            <LittleTag text={item.name} id={item.id} key={item.id} onChange={() => setLoading(!loading)}
                                       name={'publications_tags'}/>
                        </div>
                    ))
                    :
                    <>
                        <LittleTag text={'Ошибка при загрузке тегов...'}/>
                    </>
                }
            </div>
            {data.length > 0 ?
                <div className={styles.grid}>
                    {data.map(posts => (
                            <CardLittle
                                data={posts}
                                avatar={posts.user?.files[0]?.url}
                                blur

                                editable={posts.userId === user.id}
                                img={posts.coverUrl}
                                title={posts.title}
                                price={posts.price}
                                userID={posts.userId}
                                time={posts.createdAt}
                                views={posts.views_count + 1}
                            />
                    ))}
                </div>
                :
                <>
                    <NothingYet/>
                </>
            }

        </div>
    )
}

