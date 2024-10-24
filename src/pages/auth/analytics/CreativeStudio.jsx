import React, { useEffect, useState } from 'react'
import styles from './creative-studio.module.css'
import global from '../../../global.module.css'
import BackCreate from '../../../components/toolbar/backCreate-toolbar/BackCreate'
import SettingsTitle from '../../../components/toolbar/settings-title/SettingsTitle'
import ActionCard from '../../../components/settings/ActionCard/ActionCard'
import CardDefault from '../../../components/post/post-cards/card-default/CardDefault'
import { Link, useNavigate } from 'react-router-dom'
import Notification from '../../../components/notifications/Notification'
import ContextGroup from '../../../components/context-drop/context-group/ContextGroup'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAvatar, getUserData } from '../../../redux/slices/user'
import { useAuth } from '../../../provider/AuthProvider'
import { IMAGE_URL } from '../../../utils'
import Nothing from '../../nothing/Nothing'

function CreativeStudio (props) {

  const [lastPost, setLastPost] = useState()
  const { user } = useAuth()
  const { userData } = useSelector(state => state.userR)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getUser = () => {
    try {
      dispatch(getUserData(user.id))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (userData.status === 'loaded') return
    getUser()
  }, [])

  useEffect(() => {
    if (userData?.items?.publications?.length > 0) {
      const lastPublication = userData.items.publications.slice(-1)[0]
      setLastPost(lastPublication)
      // console.log('Last post:', lastPublication);
    }
  }, [userData?.items?.publications?.length])

  return (
    <div className={`${styles.padLeft}`}>
      <BackCreate/>
      <SettingsTitle bigTitle={'Панель управления'}
                     description={'Следите за аналитикой на вашей старице автора'}
      />
      <div className={`${styles.grid}`}>
        <div className={`${styles.column}`}>
          <ActionCard title={'Последняя публикация'} click_nav={() => navigate('/')}>
            <Link to={`/settings/post/analytics/${lastPost?.id}`}>
              <CardDefault
                data={lastPost}
                id={lastPost?.id}
                userID={lastPost?.userId}
                avatar_img={`${IMAGE_URL}${userData.items.avatarUrl}`} //todo: Пока что ничего нет
                img={lastPost?.coverUrl}
                blur={!!lastPost?.price}
                views={lastPost?.views_count + 1}
                time={new Date(lastPost?.createdAt).toLocaleDateString('ru-RU',)}
                title={lastPost?.title}
                // todo: EDITABLE
                // editable={Number(id) === user?.id}
                description={lastPost?.description.replace(/<[^>]*>?/gm, '')}
                price={lastPost?.price ? lastPost?.price : 'Бесплатно'}
                image/>
            </Link>
          </ActionCard>
          <ActionCard title={'Опубликованные посты'} back
                      click_nav={() => navigate('/')}>
            {userData?.items.publications?.length > 0 ?
              userData?.items.publications.slice(0, 5)
                .map((message) => (
                <div >
                 <Notification postName={message.title} nickname={user.nickname} />
                </div>
              )) : <Nothing/>}
          </ActionCard>
        </div>
        <div className={`${styles.column}`}>
          <ActionCard back title={'Аналитика'} click_nav={() => navigate('/')}>
            <ContextGroup>
              <div className={`${global.flex} ${global.f_a_center} ${global.f_s_between}`}>
                <h5>
                  Число подписчиков
                </h5>
                <h1>
                  10K
                </h1>
              </div>
              <div className={`${global.flex} ${global.f_a_center} ${global.f_s_between}`}>
                <h5>
                  Количество купленных <br/> постов за все время
                </h5>
                <h1>
                  100K
                </h1>
              </div>
            </ContextGroup>
            <ContextGroup>
              <h4>Лучшее видео</h4>
              <div className={`${global.d3}`}>
                За последние 28 дней
              </div>
            </ContextGroup>
            <ContextGroup noafter>
              {/*{userData?.items.publications?.length > 0 ?*/}
              {/*  userData?.items.publications.slice(0, 1)*/}
              {/*    .map((message) => (*/}
              {/*      <div >*/}
              {/*        <Notification postName={message.title} nickname={user.nickname} />*/}
              {/*      </div>*/}
              {/*    )) : <Notification/>}*/}

              {userData?.items?.publications?.length > 0 ?
                userData.items.publications
                  // .sort((a, b) => b.views_count || 1 - a.views_count || 1) // Сортировка по убыванию views_count
                  .slice(0, 2) // Ограничение на 1 элемент (или замените 1 на любое другое число)
                  .map((message) => (
                    <div key={message.id}>
                      <Notification postName={message.title} nickname={user.nickname} />
                    </div>
                  )) : <Notification />}


            </ContextGroup>
          </ActionCard>

          <ActionCard title={'Последние комментарии'} back
                      click_nav={() => navigate('/')}>
            <Notification type={'com-post'}/>
            <Notification type={'com-post'}/>
            <Notification type={'com-post'}/>
            <Notification type={'com-post'}/>
            <Notification type={'com-post'}/>
          </ActionCard>
        </div>
        <div className={`${styles.column}`}>
          <ActionCard title={'Доход'} back click_nav={() => navigate('/')}>
            <div className={`${global.flex} ${global.f_a_center} ${global.f_s_between}`}>
              <h5>
                За все время
              </h5>
              <h1>
                10K
              </h1>
            </div>
            <div className={`${global.flex} ${global.f_a_center} ${global.f_s_between}`}>
              <h5>
                За все месяц
              </h5>
              <h1>
                10K
              </h1>
            </div>
            <div className={`${global.flex} ${global.f_a_center} ${global.f_s_between}`}>
              <h5>
                За все день
              </h5>
              <h1>
                10K
              </h1>
            </div>
          </ActionCard>
          <ActionCard title={'Новости'} click_nav={() => navigate('/')}>
            <CardDefault/>
          </ActionCard>
        </div>
      </div>
    </div>
  )
}

export default CreativeStudio