import React, {useEffect, useState} from 'react'
import parse from 'html-react-parser';
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'

//styles
import styles from './post.module.css'
import dialog from '../../auth/profile/profile-page/profile.module.css'
import global from '../../../global.module.css'

//img
import report from '../../../asserts/icons/update/alert-triangle.svg'
import comment from '../../../asserts/icons/update/message-circle.svg'
import share from '../../../asserts/icons/update/share-2.svg'
// import video from '../../../asserts/icons/contextMenu/Видео.png'

//img comp
import Like from '../../../components/svgs/Like'

//components
import ProfileNickname from '../../../components/profile/profile-nickname/ProfileNickname'
import CardLittle from '../../../components/post/post-cards/card-little/CardLittle'
import Comment from '../../../components/comments/comment/Comment'
import CommnetForm from '../../../components/comments/comments-form/CommnetForm'
import ContextDrop from '../../../components/context-drop/ContextDrop'
import Button from "../../../components/ui/buttons/button/Button";

//utils
// import {useAuth} from '../../../provider/AuthProvider'
import {getPost, getSamePost, reportPublication} from '../../../redux/slices/post'
import {handleDialogClick, IMAGE_URL, toggleOverlay} from '../../../utils'
import InputDporDown from "../../../components/ui/input/input-dropdown/InputDporDown";
import Textarea from "../../../components/ui/input/textarea/Textarea";
import {postLikePublication, postToFavorite} from "../../../redux/slices/like";
import Bookmark from "../../../components/svgs/Bookmark";
import {getComments, reportComment} from "../../../redux/slices/comments";
import ServerError from "../../server/ServerError";
import {Helmet} from "react-helmet";

function Post() {
    // const {user} = useAuth()
    const {id} = useParams()
    const {OnePost, SamePosts} = useSelector(state => state.posts)
    const {items, status} = useSelector(state => state.comments.publicationComment)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [reported, setReported] = useState({})

    const [liked, setLiked] = useState(false)
    const [favorite, setFavorite] = useState(false)

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
    const pagetGetComments = () => {
        try{
            dispatch(getComments(id))
        }catch (e) {
            console.log(e)
        }
    }

    const likePublication = (e) => {
        e.preventDefault();
        const data= {
            publicationId: id,
        }
        try{
            dispatch(postLikePublication(data))
            setLiked(!liked)
        }catch (e) {
            console.log(e)
        }
    }

    const addToFavorite = () => {
        const data= {
            publicationId: id,
        }
        try{
            dispatch(postToFavorite(data))
            setFavorite(!favorite)
        }catch (e) {
            console.log(e)
        }
    }

    const handleSupport = (e) => {
        e.preventDefault()
        let data = {}
        let commentID = localStorage.getItem('commentID')
        if (!commentID) {
            data.publicationId = id;
            data.reasonForComplaintId = reported ? reported : null;
            try{
                dispatch(reportPublication(data))
                toggleOverlay('support')
                alert('Жалоба отправлена')
            }catch (e) {
                console.log(e)
            }
        }else{
            data.reasonForComplaintId = reported ? reported : null;
            data.commentId = commentID;
            try{
                dispatch(reportComment(data))
                toggleOverlay('support')
                alert('Жалоба отправлена')

                localStorage.removeItem('commentID')
            }catch (e) {
                console.log(e)
            }
        }

    }



    useEffect(() => {
        if (OnePost.status === 'loaded' && OnePost.items.id === id) return;
        pageGetPost()
    }, [])

    useEffect(() => {
        if (status === 'updated' || status === 'loading'){
            pagetGetComments()
        }else {
            return;
        }
    }, [status === 'loading'|| status === 'updated'])



    useEffect(() => {
        // Если данные поступили и все необходимые свойства доступны
        if (OnePost.status === 'loaded') {
            setLiked(OnePost.items?.user?.isLiked || false);
            setFavorite(OnePost.items?.user?.isFavorite || false);
        }
    }, [OnePost]); // Зависимость от OnePost


    useEffect(() => {
        if (SamePosts.status === 'loaded' && OnePost.items.id === id) return;
        pageGetSamePost() // присылать похожие посты вместе с постом?
    }, []);

    const shuffledPosts = [...SamePosts?.items];

    // Перемешиваем массив
    for (let i = shuffledPosts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPosts[i], shuffledPosts[j]] = [shuffledPosts[j], shuffledPosts[i]];
    }

    // Обработка ошибок
    if (status === 'error') {
        return <ServerError/>;
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>ZABOR | {OnePost?.items?.title || 'Публикация'}</title>
                <meta name="description" content={'Описание:' + OnePost?.items.description}/>
                <meta name="keywords" content="HTML, CSS, JavaScript"/>
                <meta name="author" content="Sairommef"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>
            <div className={styles.grid}>
                <div className={styles.content}>
                    <div className={styles.text}>
                        <h2 className={`${global.xl3} ${global.bold}`}>{OnePost?.items.title || `Пост ${id}`}</h2>
                    </div>

                    <div className={`${styles.text} ${styles.imageBlock} ${global.flex} ${global.f_a_center}`}>
                        <img src={`${IMAGE_URL}${OnePost?.items.coverUrl}`} className={styles.image} alt={'temp'}/>
                    </div>

                    <div className={`${styles.actionButtons} ${global.flex}`}>
                            {/*<TransprantButton img={like} title={'Нравится'} click={() => likePublication()}/>*/}
                            <Button img={<Like stroke={liked ? 'transparent' : 'var(--black)'} fill={liked ? 'var(--red)' : 'transparent'}/>} componentImage variant={'ghost'} click={(e) => likePublication(e)}>
                                Нравится
                            </Button>
                            <Button variant={'ghost'} click={() => addToFavorite()}
                                    img={<Bookmark stroke={favorite ? 'transparent' : 'var(--black)'} fill={favorite ? 'var(--accent)' : 'transparent'}/>} componentImage
                            >
                                Избранное
                            </Button>

                            {/*<TransprantButton img={bookmark} title={'Избранное'} click={() => addToFavorite()}/>*/}
                            <a href={'#comments'} className={`${global.flex} ${global.f_center}`}>
                                {/*<TransprantButton img={comment} title={'Комментарии'}/>*/}
                                <Button img={comment} variant={'ghost'}>
                                    Комментарии
                                </Button>
                            </a>
                        <div className={global.flex}>
                            <Button img={report} variant={'ghost'} click={() => toggleOverlay('support')}>
                                Пожаловаться
                            </Button>
                            <Button img={share} variant={'ghost'} click={() => setSharee(!sharee)}>
                                Поделиться
                            </Button>
                        </div>
                    </div>

                    <div className={styles.text}>
                        <div className={`${styles.profile} ${styles.text}`}>
                            <ProfileNickname type={'post'} nickname={OnePost.items.user?.nickname}
                                             img={`${IMAGE_URL}${OnePost.items.user?.avatarUrl}`} date={OnePost?.items.createdAt}
                                             id={OnePost?.items.user?.id} view={OnePost?.items.views_count}
                            />
                            <Button variant={'outlet'} className={global.f_center}>
                                Подписаться
                            </Button>
                        </div>

                    </div>


                    <div className={`${styles.text} ${styles.mb}`}>
                        <input type="checkbox" className={styles.input} id='desi'/>
                        <div className={`${global.d2} ${styles.description}`}>
                            {description ? parse(description) : 'Автор не добавил описания'}
                        </div>
                        <label htmlFor='desi' className={global.d3}> Развернуть </label>
                    </div>

                    <div className={styles.text}>
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
                                            <div className={styles.imageBlock}>
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
                    <div className={styles.mainAfterPost}>
                        <h1 className={`${global.xl2} ${global.bold}`}>Похожее</h1>
                        <div className={styles.afterpost}>
                            {shuffledPosts && shuffledPosts.length > 0 ? (
                                shuffledPosts.slice(0, 6).map((post, i) => (
                                    // <Link to={`/publication/${post.id}`}>
                                        <CardLittle
                                            data={post}
                                            key={i}
                                            blur
                                            img={post.coverUrl}
                                            title={post.title}
                                            price={post.price}
                                            user_id={post.userId}
                                            time={post.createdAt}
                                            views={post.views_count + 1}
                                        />
                                    // </Link>
                                ))
                            ) : null}
                        </div>
                    </div>
                    <div className={`${styles.text} ${styles.comments}`} id={"comments"}>
                        <CommnetForm main />
                        {items?.length > 0 ? items?.map((item, i) => (
                        <Comment comment={item} replies={item?.replies} key={i}/>
                            )) : null }
                    </div>
                </div>
                {/*</form>*/}
                <div className={styles.recomends}>
                    <h1 className={`${global.t4} ${global.bold}`}>Похожее</h1>
                    {shuffledPosts?.length > 0 ?
                        shuffledPosts?.map((posts) => (
                            <Link to={`/publication/${posts.id}`}>
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

            <dialog id={'support'} className={dialog.dialog} onClick={(e) => handleDialogClick(e, 'support')}>
                <form className={`${dialog.message} ${global.flex} ${global.f_dir_column}`} onSubmit={handleSupport} id={'supportForm'}>
                    {/*<div className={dialog.support}>*/}
                    <h1 className={global.xl3}>О чем желаете сообщить?</h1>
                    <p className={global.d3}>Мы обязательно рассмотрим ваше обращение</p>
                    {/*</div>*/}
                    <InputDporDown text={'Причина жалобы'} data={[{id: 1, title: 'Насилие', value: 1}, {id: 2, title: 'Оскорбление', value: 2},]} required value={reported} onChange={(e) => setReported(e.target.value)} />
                    <div className={`${dialog.textarea} ${dialog.addPostsCarda}`}>
                    <Textarea rows={5} place={'В чем проблема?'}/>
                    </div>
                    <div className={`${global.flex} ${global.f_dir_column}`} style={{gap: '1rem'}}>
                        <Button variant={'outlet'} click={() => toggleOverlay('support')}
                                className={`${global.w100} ${global.f_center}`}>
                            Отменить
                        </Button>
                        <Button variant={'color'} type={'submit'} form={'supportForm'}
                                className={`${global.w100} ${global.f_center}`}
                                onClick={() => navigate('/basket')}>
                            Отправить
                        </Button>
                    </div>
                </form>
            </dialog>

        </div>
    )
}

export default Post