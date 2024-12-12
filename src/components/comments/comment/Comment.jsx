import React, { useEffect, useRef, useState } from 'react'

import styles from './comment.module.css'
import global from '../../../global.module.css'
import ProfileNickname from '../../profile/profile-nickname/ProfileNickname'
import arrow_down from '../../../asserts/icons/arowMenu.svg'
import trash from '../../../asserts/icons/contextMenu/trash red.svg'
import CommnetForm from '../comments-form/CommnetForm'
import ContextDrop from '../../context-drop/ContextDrop'
import Button from "../../ui/buttons/button/Button";
import Like from "../../svgs/Like";
import report from "../../../asserts/icons/update/alert-triangle.svg";
import {toggleOverlay} from "../../../utils";
import {useDispatch} from "react-redux";
import {deleteComment, likeComment} from "../../../redux/slices/comments";
import {useAuth} from "../../../provider/AuthProvider";
function Comment({ comment=[], replies=[] }) {

    const {user} = useAuth()
  const [answ, setAnsw] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [menu, setMenu] = useState(false)
    const [liked, setLiked] = useState(comment?.isLiked || false)

    const dispatch = useDispatch()
  const ref = useRef(null);


  const handleLikedComment = (id) => {
      try{
        dispatch(likeComment(id))
          setLiked(!liked)
      }catch(e){
          console.log(e)
      }
  }

  const handleDeleteComment = (id) => {
      try{
          dispatch(deleteComment(id))
      }catch (e) {
          console.log(e)
      }
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target))
      setMenu(false)
  }

  const supportComment = (commentID) => {
      localStorage.setItem('commentID', JSON.stringify(commentID));
      toggleOverlay('support')
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])




  return (
    <div className={styles.pad}>
      <div className={`${styles.sender_information} ${global.flex}`}>
        <ProfileNickname comment size={50} type={'default'}  nickname={comment?.user?.nickname} />
        <div className={`${styles.time} ${global.d3}`}>
          {comment?.createdAt}
        </div>
        <button onClick={() => setMenu(!menu)}>
          <div className={`${global.t4} ${styles.edit} `}>...</div>
        </button>
      </div>
      {menu ?
      <div className={styles.inlinemenu} ref={ref}>
        <ContextDrop>
            <Button img={report} variant={'ghost'} click={() => supportComment(comment?.id)}>
                Пожаловаться
            </Button>
            {comment?.userId === user.id ?
                <>
                    <Button img={trash} img_size={'h-5'} variant={'red-text'}
                    click={() => handleDeleteComment(comment.id)}>
                        Удалить
                    </Button>
                </>
                : null }
        </ContextDrop>
      </div> : null }

      <div className={styles.content}>
        <div className={`${global.d2} ${styles.content_text}`}>
          {comment?.text}
        </div>
      </div>
      <div className={styles.action}>
        <button className={styles.likes} onClick={() => handleLikedComment(comment.id)}>
          <div className={`${global.flex} ${global.d2} ${styles.flex}`}>
              {liked ?  <Like stroke={'transparent'} fill={'var(--red)'}/> : <Like/> }
              {comment?.likeCount !== 0 ? comment?.likeCount : null }
          </div>
        </button>
        {answ ? null : <Button variant={'ghost'}  click={() => setAnsw(!answ)} >Ответить</Button>  }
      </div>
      <div className={styles.answ}>
        {answ ? <CommnetForm click={() => setAnsw(!answ)} parrentID={comment.id} /> : null}
      </div>
      <div className={styles.openAnswers}>
        {replies && replies.length > 0 && (
            <Button img={arrow_down} click={() => setShowReplies(!showReplies)}>
                {showReplies ? 'Скрыть ответы' : 'Еще ответы'}
            </Button>
        )}
      </div>

      {showReplies && (
        <div className={styles.childAnswer}>
          {replies.map((reply) => (
            <Comment key={reply.id} comment={reply} replies={reply.replies} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment