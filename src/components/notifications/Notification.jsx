import React from 'react'

import styles from './notification.module.css'
import global from '../../global.module.css'

import RenderType from './renderType/RenderType'

import temp from '../../asserts/temp/stir-fried-pork-with-korean-sauce-on-dark-background.jpg'

/** Компонент уведомлений В завичимости от типа (type)
 * уведомления меняются выходные данные */
function Notification ({type, nickname, postName}) {

  const messageType = (params) => {
    switch (params){
      case 'new-post' :
        return <RenderType
          text={`На странице ${nickname} новый пост "${postName}"`}
          postImage={temp}
          avatar={temp}
          date={'2 часа назад'}
        />;
      case 'liked-post' :
        return <RenderType
          text={`${nickname} понравлися ваш пост`}
          postImage={temp}
          avatar={temp}
          date={'2 часа назад'}
        />;
      case 'deleted-post' :
        return <RenderType
          text={`${nickname} Удаляет свой пост "${postName}"`}
          postImage={temp}
          avatar={temp}
          date={'У вас есть 15 дней чтобы просмотреть пост'}
        />;
      case 'buy-post' :
        return <RenderType
          text={`${nickname} Приобрел ваш пост "${postName}"`}
          postImage={temp}
          avatar={temp}
          date={'2 часа назад'}
        />;
      case 'com-post' :
        return <RenderType
          text={`${nickname} оставил комментарий под постом "${postName}"`}
          postImage={temp}
          avatar={temp}
          date={'2 часа назад'}
        />;
      case 'liked-com' :
        return <RenderType
          text={`${nickname} понравлися ваш комментарий`}
          // postImage={temp}
          avatar={temp}
          date={'2 часа назад'}
        />;
      case 'answer-com' :
        return <RenderType
          text={`${nickname} ответил на ваш комментарий`}
          avatar={temp}
          date={'2 часа назад'}
        />;
      case 'subscribed' :
        return <RenderType
          text={`${nickname} подписался на вас`}
          postImage={temp}
          avatar={temp}
          date={'2 часа назад'}
        />;
      default :
        return <RenderType
          text={`${postName}`}
          postImage={temp}
          views={'1 000 000'}
          date={'2 часа назад'}
        />;
    }
  }

  return (
    <div>
      {messageType(type)}
    </div>
  )
}

export default Notification