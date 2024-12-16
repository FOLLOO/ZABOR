import React from 'react'

import RenderType from './renderType/RenderType'

import temp from '../../asserts/temp/stir-fried-pork-with-korean-sauce-on-dark-background.jpg'

/** Компонент уведомлений В завичимости от типа (type)
 * уведомления меняются выходные данные */
function Notification ({type, nickname, postName, postImage, views, date}) {

  const messageType = (params) => {
    switch (params){
      case 'new-post' :
        return <RenderType
          text={postName}
          postImage={null}
          avatar={null}
          date={new Date(date).toLocaleDateString('ru-RU')}
        />;
      case 'liked-post' :
        return <RenderType
          text={`${nickname} понравился ваш пост`}
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
          postImage={postImage ? postImage : temp}
          views={date}
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