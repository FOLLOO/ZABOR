import React, { useContext, useEffect, useRef, useState } from 'react'

import styles from './post.module.css'
import global from '../../../global.module.css'

import favorites from '../../../asserts/icons/post/favorites.svg'
import favorites_a from '../../../asserts/icons/post/favorites_a.svg'
import like from '../../../asserts/icons/post/like.svg'
import unlike from '../../../asserts/icons/post/unlike.svg'
import report from '../../../asserts/icons/post/report.svg'
import comments from '../../../asserts/icons/post/comments.svg'
import share from '../../../asserts/icons/post/share.svg'

import MessageBox from '../../../components/message-box/MessageBox'
import ProfileNickname from '../../../components/profile/profile-nickname/ProfileNickname'
import WhiteButton from '../../../components/ui/buttons/white-button/WhiteButton'
import GreenButton from '../../../components/ui/buttons/green-button/GreenButton'
import CardLittle from '../../../components/post/post-cards/card-little/CardLittle'
import { useAuth } from '../../../provider/AuthProvider'
import { OverlayContext } from '../../../context/OverlayContext'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPost, getSamePost } from '../../../redux/slices/post'
import { IMAGE_URL } from '../../../utils'
import Nothing from '../../nothing/Nothing'
import parse from 'html-react-parser';
import Comment from '../../../components/comments/comment/Comment'
import CommnetForm from '../../../components/comments/comments-form/CommnetForm'
import { createComment } from '../../../redux/slices/comments'
import video from '../../../asserts/icons/contextMenu/Видео.png'
import TransprantButton from '../../../components/ui/buttons/transprant-button/TransprantButton'
import ContextDrop from '../../../components/context-drop/ContextDrop'
function Post (props) {
  const { user } = useAuth()
  const { overlay, setOverlay } = useContext(OverlayContext)
  const {id} = useParams()
  const { OnePost, SamePosts } = useSelector(state => state.posts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const openRef = useRef(false);

  const [sharee, setSharee] = useState(false)

  const CommentsRef = useRef(null)
  const executeScroll = (re) => re.current.scrollIntoView()

  const [showMessage, setShowMessage] = useState(false)
  const toggleMenu = (e) => {
    e.preventDefault();
    openRef.current = !openRef.current;
    const descriptionElement = document.getElementById('descript');
    descriptionElement.classList.toggle(styles.active);
  };


  const parser = new DOMParser()
  const pageGetPost = () => {
    try{
      dispatch(getPost(id))
    }
    catch (e){
      console.log(e)
    }
  }
  const description = OnePost?.items?.description || '';

  const pageGetSamePost = () => {
    try{
      dispatch(getSamePost(id))
    }
    catch (e){
      console.log(e)
    }
  }

  useEffect(() => {
    // if (OnePost.status === 'loaded') return;
    pageGetPost()
    pageGetSamePost()
  },[])

  const shuffledPosts = [...SamePosts?.items];

// Перемешиваем массив
  for (let i = shuffledPosts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledPosts[i], shuffledPosts[j]] = [shuffledPosts[j], shuffledPosts[i]];
  }
  // console.log(OnePost)
  return (
    <div className={global.padLeft}>
      {overlay ?
        <MessageBox type={'help'} visability={true}/>
        : null
      }
      <div className={styles.grid}>
        <span>

        </span>
        <span>

        </span>
        {/*<form  id={'save_my_post'}>*/}
          <div className={styles.content}>
            <div className={`${styles.profile} ${styles.text}`}>
              <ProfileNickname type={'post'} nickname={user?.nickname}/>
              <div className={`${styles.button} ${global.flex} `}>
                <WhiteButton text={'Поделиться'} disable/>
                <GreenButton text={'Подписаться'} />
              </div>
            </div>
            <div className={`${styles.spanImage} ${styles.text}`}>
                <div  className={`${styles.mainImage} ${global.flex} ${global.f_a_center}`}>
                  <img src={`${IMAGE_URL}${OnePost?.items.coverUrl}`} className={styles.image}  alt={'temp'} />
                </div>
              {/*<div className={styles.sato}>*/}
              {/*  <button>*/}
              {/*    <img src={start} alt={'star'} />*/}
              {/*  </button>*/}
              {/*</div>*/}
            </div>

            <div className={styles.inputDescription}>
              {/*<GlassCard height>*/}
              {/*  <h4 className={styles.he}>Описание</h4>*/}
                <div className={`${global.d3} ${styles.description}`} id={'descript'} onClick={(e) => toggleMenu(e)} >
                  {description ? parse(description) : <Nothing/>}
                </div>
                <button className={styles.more} onClick={(e) => toggleMenu(e)}>
                  <div className={global.d3}>
                    Развернуть
                  </div>
                </button>
              {/*</GlassCard>*/}
            </div>
            {/*<TipTapEditor bubble place={"Заголовок"}/>*/}

            <div className={styles.text}>
              <h2>{OnePost?.items.title || `Пост ${id}`}</h2>
              <div className={`${styles.actionButtons} ${global.flex}`}>
                <div className={global.flex}>
                  <TransprantButton img={favorites}/>
                  <TransprantButton img={like} />
                  <TransprantButton img={comments} click={() => executeScroll(CommentsRef)}/>
                </div>
                <div className={global.flex}>
                <TransprantButton img={report} click={() => setOverlay(!overlay)}/>
                <TransprantButton img={share} click={() => setSharee(!sharee)}/>
                </div>
              </div>
              {overlay ?
              <MessageBox type={'help'} />
                : null}

              {sharee ?
                <div className={styles.sharee}>
                <ContextDrop>
                  jasdlfalsdkjf
                </ContextDrop>
                </div>
              : null}

              <ContextDrop>
              </ContextDrop>
              {OnePost?.items.publication_blocks?.length > 0 ? (
                OnePost.items.publication_blocks.map((item, index) => {
                  const doc = parser.parseFromString(item.text, 'text/html');
                  const htmlString = doc.body.innerHTML; // Получаем HTML из <body>
                  return (
                    item.type === 'file' ? (
                      item.file.name.split('.').pop().toLowerCase() === 'mp4' || item.file.name.split('.').pop().toLowerCase() === 'h264' ? (
                        <video controls className={styles.video}>
                          <source src={`${IMAGE_URL}/static/${item.file.name}`} type="video/mp4" />
                          Извините, ваш браузер не поддерживает воспроизведение видео.
                        </video>
                      ) : (
                        // <div key={index}>Image: {item.file.name}</div>
                      <div>
                        <img className={styles.fileUploadImage} src={`${IMAGE_URL}/static/${item.file.name}`} alt="image" />
                      </div>
                      )
                    ) : (
                      <div key={index} dangerouslySetInnerHTML={{ __html: htmlString }} className={styles.textContent} />
                    )
                  );
                })
              ) : (
                <Nothing />
              )}
            </div>
            <div className={styles.comments} ref={CommentsRef}>
            <CommnetForm/>
            <Comment/>
            </div>
          </div>
        {/*</form>*/}
        <div className={styles.recomends}>
          <h4>Похожее</h4>
          {shuffledPosts?.length > 0 ?
            shuffledPosts?.map((posts) => (
              <Link to={`/post/${posts.id}`}>
                <CardLittle
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
          <CardLittle/> <CardLittle/> <CardLittle/> <CardLittle/> <CardLittle/> </> }
        </div>
      </div>

    </div>
  )
}

export default Post