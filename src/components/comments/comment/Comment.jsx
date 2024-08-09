import React, { useEffect, useRef, useState } from 'react'

import styles from './comment.module.css'
import global from '../../../global.module.css'
import { symbol } from 'prop-types'
import ProfileCircle from '../../profile/profile-circle/ProfileCircle'
import ProfileNickname from '../../profile/profile-nickname/ProfileNickname'
import grayLike from '../../../asserts/icons/GrayLike.svg'
import arrow_down from '../../../asserts/icons/arowMenu.svg'
import trash from '../../../asserts/icons/contextMenu/trash red.svg'
import TransprantButton from '../../ui/buttons/transprant-button/TransprantButton'
import CommnetForm from '../comments-form/CommnetForm'
import ContextGroup from '../../context-drop/context-group/ContextGroup'
import ContextDrop from '../../context-drop/ContextDrop'
import Nothing from '../../../pages/nothing/Nothing'
function Comment({ comment=[], replies=[] }) {

  const [answ, setAnsw] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [menu, setMenu] = useState(false)

  const ref = useRef(null);


  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target))
      setMenu(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
    { comment.length > 0 ?
    <div className={styles.pad}>

      <div className={`${styles.sender_information} ${global.flex}`}>
        <ProfileNickname size={50} type={'default'} nickname={comment?.nickname} />
        <div className={`${styles.time} ${global.d3}`}>
          {comment?.time}
        </div>
        <button onClick={() => setMenu(!menu)}>
          <div className={`${global.t4} ${styles.edit} `}>...</div>
        </button>
      </div>
      {menu ?
      <div className={styles.inlinemenu} ref={ref}>
        <ContextDrop>
            <TransprantButton left text={'Пожаловаться'}/>
            <TransprantButton left text={'Редактировать'}/>
            <TransprantButton left text={'Удалить'} red img={trash}/>
        </ContextDrop>
      </div> : null }

      <div className={styles.content}>
        <div className={`${global.d2} ${styles.content_text}`}>
          {comment?.text}
        </div>
      </div>
      <div className={styles.action}>
        <button className={styles.likes}>
          <div className={`${global.flex} ${global.d2} ${styles.flex}`}>
            <img src={grayLike} alt={'like'} />
            {comment?.likes}
          </div>
        </button>
        {answ ? null : <TransprantButton text={'Ответить'} click={() => setAnsw(!answ)} />}
      </div>
      <div className={styles.answ}>
        {answ ? <CommnetForm click={() => setAnsw(!answ)} /> : null}
      </div>
      <div className={styles.openAnswers}>
        {replies && replies.length > 0 && (
          <button className={styles.answ_btn} onClick={() => setShowReplies(!showReplies)}>
            <div className={`${global.flex} ${global.text} ${styles.flex}`}>
              <img src={arrow_down} alt={'like'} width={17} />
              {showReplies ? 'Скрыть ответы' : 'Еще ответы'}
            </div>
          </button>
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
        : <Nothing text={'Пока что нет комментариев'}/>}
    </>
  );
}

export default Comment