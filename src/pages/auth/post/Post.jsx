import React, { useEffect, useState} from 'react'
import parse from 'html-react-parser';
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'

//styles
import styles from './post.module.css'
import dialog from '../../auth/profile/profile-page/profile.module.css'
import global from '../../../global.module.css'

//img
import bookmark from '../../../asserts/icons/update/bookmark.svg'
import like from '../../../asserts/icons/update/heart.svg'
import report from '../../../asserts/icons/update/alert-triangle.svg'
import comment from '../../../asserts/icons/update/message-circle.svg'
import share from '../../../asserts/icons/update/share-2.svg'
import video from '../../../asserts/icons/contextMenu/Видео.png'

//components
import ProfileNickname from '../../../components/profile/profile-nickname/ProfileNickname'
import CardLittle from '../../../components/post/post-cards/card-little/CardLittle'
import Comment from '../../../components/comments/comment/Comment'
import CommnetForm from '../../../components/comments/comments-form/CommnetForm'
import TransprantButton from '../../../components/ui/buttons/transprant-button/TransprantButton'
import ContextDrop from '../../../components/context-drop/ContextDrop'
import Button from "../../../components/ui/buttons/button/Button";

//utils
import {useAuth} from '../../../provider/AuthProvider'
import {getPost, getSamePost} from '../../../redux/slices/post'
import {IMAGE_URL} from '../../../utils'
import InputDporDown from "../../../components/ui/input/input-dropdown/InputDporDown";
import Textarea from "../../../components/ui/input/textarea/Textarea";

function Post() {
    const {user} = useAuth()
    const {id} = useParams()
    const {OnePost, SamePosts} = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [sharee, setSharee] = useState(false)

    const parser = new DOMParser()
    const pageGetPost = () => {
        try {
            dispatch(getPost(id))
        } catch (e) {
            console.log(e)
        }
    }
    const description = OnePost?.items?.description || '';
    const pageGetSamePost = () => {
        try {
            dispatch(getSamePost(id))
        } catch (e) {
            console.log(e)
        }
    }

    const toggleOverlay = () => {
        const dialog = document.getElementById('support')
        const isOpen = dialog.open;
        console.log(isOpen)
        return isOpen ? dialog.close()  : dialog.showModal()
    }


    useEffect(() => {
        if (OnePost.status === 'loaded' && OnePost.items.id === id) return;
        pageGetPost()
        }, [])

    useEffect(() => {
        if(SamePosts.status === 'loaded' && OnePost.items.id === id) return;
        pageGetSamePost() // присылать похожие посты вместе с постом?
    }, []);

    const shuffledPosts = [...SamePosts?.items];

    // Перемешиваем массив
    for (let i = shuffledPosts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPosts[i], shuffledPosts[j]] = [shuffledPosts[j], shuffledPosts[i]];
    }
    return (
        <div>
            <div className={styles.grid}>
                <div className={styles.content}>
                    <div className={`${styles.text} ${global.flex} ${global.f_a_center}`}>
                        <img src={`${IMAGE_URL}${OnePost?.items.coverUrl}`} className={styles.image} alt={'temp'}/>
                    </div>


                    <div className={styles.text}>
                        <div className={`${styles.actionButtons} ${global.flex}`}>
                            <div className={`${global.flex} ${global.f_a_center}`}>
                                <TransprantButton img={like} title={'Нравится'}/>
                                <TransprantButton img={bookmark} title={'Избранное'}/>
                                <a href={'#comments'} className={`${global.w100} ${global.flex} ${global.f_center}`}>
                                    <TransprantButton img={comment} title={'Комментарии'}/>
                                </a>
                            </div>
                            <div className={global.flex}>
                                <TransprantButton img={report} click={(e) => toggleOverlay(e)}
                                                  title={'Обратиться в поддержку'}/>
                                <TransprantButton img={share} click={() => setSharee(!sharee)} title={'Поделиться'}/>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.profile} ${styles.text}`}>
                        <ProfileNickname type={'post'} nickname={user?.nickname}/>
                        <Button variant={'color'} className={global.f_center}>
                            Подписаться
                        </Button>
                    </div>

                    <div className={`${styles.text} ${styles.mb}`}>
                        <input type="checkbox" className={styles.input} id='desi'/>
                        <div className={`${global.d2} ${styles.description}`}>
                            {description ? parse(description) : 'Автор не добавил описания'}
                        </div>
                        <label htmlFor='desi' className={global.d3}> Развернуть </label>
                    </div>

                    <div className={styles.text}>
                        <h2 className={`${global.xl3} ${global.bold}`}>{OnePost?.items.title || `Пост ${id}`}</h2>
                        {sharee ?
                            <div className={styles.sharee}>
                                <ContextDrop>
                                    jasdlfalsdkjf
                                </ContextDrop>
                            </div>
                            : null}

                        {OnePost?.items.publication_blocks?.length > 0 ? (
                            OnePost.items.publication_blocks.map((item, index) => {
                                const doc = parser.parseFromString(item.text, 'text/html');
                                const htmlString = doc.body.innerHTML; // Получаем HTML из <body>
                                return (
                                    item.type === 'file' ? (
                                        item.file.name.split('.').pop().toLowerCase() === 'mp4' || item.file.name.split('.').pop().toLowerCase() === 'h264' ? (
                                            <video controls className={styles.video}>
                                                <source src={`${IMAGE_URL}/static/${item.file.name}`} type="video/mp4"/>
                                                Извините, ваш браузер не поддерживает воспроизведение видео.
                                            </video>
                                        ) : (
                                            // <div key={index}>Image: {item.file.name}</div>
                                            <div>
                                                <img className={styles.fileUploadImage}
                                                     src={`${IMAGE_URL}/static/${item.file.name}`} alt="image"/>
                                            </div>
                                        )
                                    ) : (
                                        <div key={index} dangerouslySetInnerHTML={{__html: htmlString}}
                                             className={styles.textContent}/>
                                    )
                                );
                            })
                        ) : null}
                    </div>
                    <div className={styles.text} id={"comments"}>
                        <CommnetForm/>
                        <Comment/>
                    </div>
                </div>
                {/*</form>*/}
                <div className={styles.recomends}>
                    <h1 className={`${global.t4} ${global.bold}`}>Похожее</h1>
                    {shuffledPosts?.length > 0 ?
                        shuffledPosts?.map((posts) => (
                            <Link to={`/post/${posts.id}`}>
                                <CardLittle
                                    key={posts.id}
                                    data={posts}
                                    // avatar={posts.user.files[0].url}
                                    blur
                                    img={posts.coverUrl}
                                    title={posts.title}
                                    price={posts.price}
                                    user_id={posts.userId}
                                    time={posts.createdAt}
                                    views={posts.views_count + 1}
                                />
                            </Link>
                        ))
                        : <> <CardLittle/> <CardLittle/> <CardLittle/> <CardLittle/> <CardLittle/>
                            <CardLittle/> <CardLittle/> <CardLittle/> <CardLittle/> <CardLittle/> </>}
                </div>
            </div>

            <dialog id={'support'} className={dialog.dialog} >
                <div className={`${dialog.message} ${global.flex} ${global.f_dir_column}`}>
                    {/*<div className={dialog.support}>*/}
                        <h1 className={global.xl3}>О чем желаете сообщить?</h1>
                        <p className={global.d3}>Мы обязательно рассмотрим ваше обращение</p>
                    {/*</div>*/}
                    <InputDporDown data={[{id: 1, title: 'Куда', value: 'м'}, {id: 2,title: 'Сюда',value: 'ж'},]}/>
                    <Textarea rows={5} place={'В чем проблема?'}/>
                    <div className={`${global.flex} ${global.f_dir_column}`} style={{gap: '1rem'}}>
                        <Button variant={'outlet'} click={() => toggleOverlay()}
                                className={`${global.w100} ${global.f_center}`}>
                            Отменить
                        </Button>
                        <Button variant={'color'} type={'submit'}
                                className={`${global.w100} ${global.f_center}`}
                                onClick={() => navigate('/basket')}>
                            Отправить
                        </Button>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default Post