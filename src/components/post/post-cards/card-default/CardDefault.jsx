import React, { useContext, useEffect, useRef, useState } from 'react'

import styles from './card-default.module.css'
import global from '../../../../global.module.css'
import ProfileCircle from '../../../profile/profile-circle/ProfileCircle'
import lock from '../../../../asserts/icons/Lock.svg'
import basket from '../../../../asserts/icons/basket.svg'
import plus from '../../../../asserts/icons/plus.svg'
import ContextDrop from '../../../context-drop/ContextDrop'
import ContextGroup from '../../../context-drop/context-group/ContextGroup'
import { useDispatch, useSelector } from 'react-redux'
import { deltePost } from '../../../../redux/slices/post'


import { OverlayContext } from '../../../../context/OverlayContext'
import { Link, useNavigate } from 'react-router-dom'
import { IMAGE_URL } from '../../../../utils'
import { useAuth } from '../../../../provider/AuthProvider'
import { addItemToCart } from '../../../../redux/slices/bascet'


function CardDefault ({
  img,
  avatar_img,
  title,
  views,
  price,
  data,
  editable,
  time,
  description,
  id,
  userID,
  blur = false
}) {

  const [open, setOpen] = useState(false)
  const ref = useRef(null);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch()

  const [disable, setDisable] = useState(false)

  const { user } = useAuth()


  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target))
      setOpen(false)
  }

  const handleAddToCart = () => {
    if(cartItems.length < 0 || cartItems[0]?.id !== data?.id){ //решение проблемы: по id задать свойство кнопке disabled
      dispatch(addItemToCart(data));
      setDisable(true)
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // console.log(user.id)

  return (
    <>
    <div className={`${styles.main} ${global.shadowBliz}`}>
      <div className={img ? styles.temp : null}>
        <div className={`${styles.actions} ${global.flex} ${global.f_dir_column}`}>
          <div className={`${styles.profile} ${global.flex} ${global.f_end}`}>
            <ProfileCircle img={avatar_img} size={40}/>
          </div>
          <div className={`${styles.lock} ${global.flex} ${global.f_center}`}>
            {blur ?
              <img src={lock} alt={'lock'} width={80}/>
              :
              <img src={lock} alt={'lock'} width={80} style={{ opacity: '1%' }}/>
            }
          </div>

          <div className={`${styles.basket} ${global.flex} ${global.f_start}`}>

            {user?.id === userID ? null : price !== 'Бесплатно' ?
              <button className={styles.button} disabled={disable} onClick={() => handleAddToCart()}>
                <div className={`${global.flex} ${global.f_a_center} ${global.f_center} ${styles.buttonCon}`}>
                  <img src={basket} alt={'button img'}/>
                  <img src={plus} alt={'button img'}/>
                </div>
              </button>
              : <span className={styles.bascet_span}></span> }
          </div>

        </div>
        <div className={`${styles.content} ${global.flex} ${global.f_dir_column}`}>
        <Link to={`/post/${id}`} className={`${global.flex} ${global.f_dir_column} ${styles.gap}`}>
          <div className={`${styles.epigraph} ${global.flex} ${global.f_s_between}`}>
            <div className={`${global.lg} ${global.bold} ${styles.title}`}>
              {title ? title :
                <div className={global.skeleton}>
                  Пришла и оторвало голову нам сумасшедшая весна
                </div>
              }
            </div>
            <div className={`${global.lg} ${styles.price}`}>
              {price ? price + ' ₽' :
                <div className={global.skeleton}>
                  015₽
                </div>
              }
            </div>

          </div>
          <div className={`${global.d2} ${styles.description}`}>
            {description ? description :
              <div className={global.skeleton}>
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
                asdfasdf
              </div>
            }
          </div>
          </Link>
          <div className={`${styles.analytych} ${global.flex} ${global.f_s_between} ${global.f_a_center}`}>
            <div className={`${global.d3} ${styles.views}`}>
              {views ? views + ' просмотров' :
                <div className={global.skeleton}>
                  1000 просмотров
                </div>
              }
            </div>

            <div className={`${global.flex} ${styles.editFlex}`}>
              <div className={global.d3}>
                {time ? time :
                  <div className={global.skeleton}>
                    '2 часа назад'
                  </div>
                }
              </div>
              {editable ?
                  <button onClick={() => setOpen(!open)}>
                    <div className={`${styles.edit} `}>
                      <h3>...</h3>
                    </div>
                  </button>
                : null}
            </div>
          </div>
        </div>
      </div>
      {open ?
      <div className={styles.editContext} ref={ref}>
        <ContextDrop width={'17vw'} >
          <ContextGroup>
          </ContextGroup>
          <ContextGroup noafter>
          </ContextGroup>
        </ContextDrop>
      </div> : null}
      {img ?
        <img className={`${styles.cardImage} ${blur ? global.blur : null}`} src={`${IMAGE_URL}${img}`}
             alt={'temp'} />
        :
        <div className={`${global.skeleton} ${styles.noImage}`}>

        </div>
      }
    </div>
    </>

  )
}

export default CardDefault