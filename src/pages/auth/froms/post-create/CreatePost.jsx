import React, { useContext } from 'react'

import global from '../../../../global.module.css'
import styles from './create-post.module.css'

import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import CardLittle from '../../../../components/post/post-cards/card-little/CardLittle'

import temp from '../../../../asserts/temp/temp1.png'
import ProfileNickname from '../../../../components/profile/profile-nickname/ProfileNickname'
import WhiteButton from '../../../../components/ui/buttons/white-button/WhiteButton'
import GlassBox from '../../../../components/glasses/glasses-box/GlassBox'
import GlassCard from '../../../../components/glasses/glasses-card/GlassCard'
import TempEditor from '../../../temp/TempEditor'
import GreenButton from '../../../../components/ui/buttons/green-button/GreenButton'
import { OverlayContext } from '../../../../context/OverlayContext'
import MessageBox from '../../../../components/message-box/MessageBox'
function CreatePost (props) {


  const { overlay, setOverlay } = useContext(OverlayContext);

  const toggleOverlay = () => {
    setOverlay(!overlay);
  };

  return (
    <div className={global.pad}>
      {overlay ?
        <MessageBox type={'help'} visability={true}/>
        : null
      }
      <div className={styles.grid}>
        <div className={styles.main}>

          <BackCreate greenText={'Опублоковать'} description={'Так будет выглядеть ваш пост'}/>
        </div>
        <span>

        </span>
        <div className={styles.content}>
            <img src={temp} width={1250} height={520} alt={'temp'} style={{overflow: 'hidden',
              maxHeight: '520px',
              maxWidth: '1250px',
              objectFit: 'cover'
            }}/>

            <div className={styles.profile}>
              <ProfileNickname type={'post'} nickname={'Лёха'}/>
              <div className={styles.button}>
              <WhiteButton text={'Подписаться'}/>
              </div>
            </div>
          <div className={styles.inputDescription}>
            <GlassCard>
            <h4>Описание</h4>
              <div className={global.d3}>
                Напиши что нибудь...
              </div>
            </GlassCard>
          </div>

          <h3>Заголовок</h3>

          <div className={styles.text}>
            <TempEditor/>
          </div>

          <div className={styles.buttons}>
            <div className={global.d3}>
              Добавить блок
            </div>
            <GreenButton text={'Addd'} click={() => toggleOverlay()}/>
          </div>

        </div>
        <div className={styles.recomends}>
          <h4>Похожее</h4>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
        </div>
      </div>

    </div>
  )
}

export default CreatePost