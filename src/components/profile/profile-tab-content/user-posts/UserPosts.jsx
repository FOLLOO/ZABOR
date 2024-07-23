import React from 'react'

import styles from './userPosts.module.css'
import global from '../../../../global.module.css'

import GlassCard from '../../../glasses/glasses-card/GlassCard'
import GreenButton from '../../../ui/buttons/green-button/GreenButton'
import CardDefault from '../../../post/post-cards/card-default/CardDefault'

import temp
  from '../../../../asserts/temp/smiling-handsome-young-man-city-street-taking-picture-from-vintage-camera.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../../provider/AuthProvider'
import ContextDrop from '../../../context-drop/ContextDrop'
import ContextGroup from '../../../context-drop/context-group/ContextGroup'
import TransprantButton from '../../../ui/buttons/transprant-button/TransprantButton'

/** Посты пользователя */


function UserPosts ({ data = [] }) {

  const { user } = useAuth()
  const { id } = useParams()

  const navigate = useNavigate()

  // console.log('id', id , 'userID', user?.id)

  /** Нет постов*/
  const NothingYeat = () => {
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
          <h2>Публикации</h2>
        </div>
        <div className={styles.margin}>
          <div className={styles.grid}>
            {Number(id) === user?.id ? user?.roleId === 1 ?
                <GreenButton text={'Создать публикацию'} unique click={() => navigate('/group')}/>
                :
                <GreenButton text={'Создать публикацию'} unique click={() => navigate('/create/post')}/>
              : null}
            {data.length > 0 ?
                data.map((message =>
              // <>
                <CardDefault
                  id={message?.id}
                  avatar_img={message?.coverUrl}
                  img={message?.coverUrl}
                  blur={!!message?.price}
                  views={message?.views_count + 1}
                  time={new Date(message?.createdAt).toLocaleDateString('ru-RU',)}
                  title={message?.title}
                  // todo: EDITABLE
                  editable={Number(id) === user?.id}
                  description={message?.description.replace(/<[^>]*>?/gm, '')}
                  price={message?.price ? message?.price : 'Бесплатно'}
                  image/>
                ))
              :
              <>
                <CardDefault/>
                <CardDefault/>
                <CardDefault/>
                <CardDefault/>
              </>
            }
          </div>
        </div>
      </>
    )
  }

  return (
    // margin потому что там ток один атрибут
    <div className={styles.margin}>
      {data ?
        UserPosts()
        : NothingYeat()
      }

    </div>
  )
}

export default UserPosts