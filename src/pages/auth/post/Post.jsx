import React, { useContext, useEffect, useRef, useState } from 'react'

import styles from './post.module.css'
import global from '../../../global.module.css'

import start from '../../../asserts/icons/STAR.svg'

import MessageBox from '../../../components/message-box/MessageBox'
import ProfileNickname from '../../../components/profile/profile-nickname/ProfileNickname'
import WhiteButton from '../../../components/ui/buttons/white-button/WhiteButton'
import GlassCard from '../../../components/glasses/glasses-card/GlassCard'
import GreenButton from '../../../components/ui/buttons/green-button/GreenButton'
import CardLittle from '../../../components/post/post-cards/card-little/CardLittle'
import { useAuth } from '../../../provider/AuthProvider'
import { OverlayContext } from '../../../context/OverlayContext'
import { useDispatch, useSelector } from 'react-redux'
import {  CSSTransition } from 'react-transition-group'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPost, getSamePost } from '../../../redux/slices/post'
import { IMAGE_URL } from '../../../utils'
import Nothing from '../../nothing/Nothing'
import parse from 'html-react-parser';
import Comment from '../../../components/comments/comment/Comment'
import CommnetForm from '../../../components/comments/comments-form/CommnetForm'
import { createComment } from '../../../redux/slices/comments'
function Post (props) {
  const { user } = useAuth()
  const { overlay, setOverlay } = useContext(OverlayContext)
  const {id} = useParams()
  const { OnePost, SamePosts } = useSelector(state => state.posts)
  const dispatch = useDispatch()

  const openRef = useRef(false);

  const [showMessage, setShowMessage] = useState(false)
  const toggleMenu = (e) => {
    e.preventDefault()
    // setShowMessage(!showMessage)
    openRef.current = !openRef.current;
    const gridClass = openRef.current ? `${styles.description1} ${global.d2}` : `${styles.description} ${global.d2}`;
    document.querySelector("#descript").className = gridClass;
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
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted');
  //   if (id) {
  //     const data = {
  //       text: 'fir',
  //       publicationId: 150,
  //       // commentId:
  //     };
  //     try {
  //       dispatch(createComment(data));
  //     } catch (e) {
  //       console.error('Error:', e);
  //     }
  //   }
  // };
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
            <div className={styles.spanImage}>
                <div  className={styles.mainImage}>
                  <img src={`${IMAGE_URL}${OnePost?.items.coverUrl}`} className={styles.image} width={1250} height={520} alt={'temp'} style={{
                    overflow: 'hidden',
                    maxHeight: '520px',
                    maxWidth: '1250px',
                    objectFit: 'cover'
                  }}/>
                </div>
              <div className={styles.sato}>
                <button>
                  <img src={start} alt={'star'} />
                </button>
              </div>
            </div>
            <div className={styles.profile}>
              <ProfileNickname type={'post'} nickname={user?.nickname}/>
              <div className={`${styles.button} ${global.flex}`}>
                <WhiteButton text={'Поделиться'} disable/>
                <GreenButton text={'Подписаться'} />
              </div>
            </div>
            <div className={styles.inputDescription}>
              <GlassCard height>
                <h4 className={styles.he}>Описание</h4>
                <div className={`${global.d3} ${styles.description}`} id={'descript'} >
                  {description ? parse(description) : <Nothing/>}
                </div>
                {/*<CSSTransition*/}
                {/*  in={showMessage}*/}
                {/*  timeout={300}*/}
                {/*  // classNames="alert"*/}
                {/*  classNames={`${global.d3} ${styles.alertEnter} `}*/}
                {/*  unmountOnExit*/}
                {/*>*/}
                {/*  /!*<Nothing/>*!/*/}
                {/*  {description ? parse(description) : <Nothing/>}*/}
                {/*</CSSTransition>*/}


                <button className={styles.more} onClick={(e) => toggleMenu(e)}>
                  <div className={global.d3}>
                    Развернуть
                  </div>
                </button>
              </GlassCard>
            </div>
            {/*<TipTapEditor bubble place={"Заголовок"}/>*/}
            <h2>{OnePost?.items.title || `Пост ${id}`}</h2>

            <div className={styles.text}>
              {OnePost?.items.publication_blocks?.length > 0 ? (
                OnePost.items.publication_blocks.map((item, index) => {
                  const doc = parser.parseFromString(item.text, 'text/html');
                  const htmlString = doc.body.innerHTML; // Получаем HTML из <body>

                  return (
                    <div key={index} dangerouslySetInnerHTML={{ __html: htmlString }} />
                  );
                })
              ) : (
                <Nothing />
              )}
            </div>
            <div className={styles.comments}>
            <CommnetForm/>
            <Comment/>
            </div>
          </div>
        {/*</form>*/}
        <div className={styles.recomends}>
          <h4>Похожее</h4>
          {SamePosts?.items.length > 0 ?
            SamePosts?.items.map((posts) => (
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