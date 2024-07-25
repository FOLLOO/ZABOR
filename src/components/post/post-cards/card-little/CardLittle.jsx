import React, { useContext } from 'react'

import styles from './card-little.module.css'
import global from '../../../../global.module.css'

import temp from '../../../../asserts/temp/temp2.jpg'
import basket from '../../../../asserts/icons/basket.svg'
import lock from '../../../../asserts/icons/Lock.svg'
import plus from '../../../../asserts/icons/plus.svg'

import ProfileCircle from '../../../profile/profile-circle/ProfileCircle'
import WhiteButton from '../../../ui/buttons/white-button/WhiteButton'
import TransprantButton from '../../../ui/buttons/transprant-button/TransprantButton'
import whiteButton from '../../../ui/buttons/white-button/WhiteButton'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, sendCartData } from '../../../../redux/slices/bascet'
import store from '../../../../redux/store'
import { OverlayContext } from '../../../../context/OverlayContext'
import { IMAGE_URL } from '../../../../utils'
function CardLittle ({
  image = false,
  title,
  img,
  avatar,
  views,
  price,
  user_id,
  time ,
  data,
  editable,
  blur = false
}) {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const {overlay, setOverlay} = useContext(OverlayContext)

  const handleAddToCart = (e) => {
    e.preventDefault()

    setOverlay(!overlay);

    // Добавляем товар в корзину
    if(cartItems.length < 0 || cartItems[0]?.id !== data?.id){
      dispatch(addItemToCart(data));
    }
    console.log(cartItems)
  };

  return (
    <div className={`${styles.main} ${global.shadowBliz}`}>
      <div className={image ? styles.temp : null}>

      <div className={`${styles.actions} ${global.flex} ${global.f_dir_column}`} >
          <div className={`${styles.profile} ${global.flex} ${global.f_end}`}>
            <Link to={`/user/${user_id}`}>
            <ProfileCircle size={30} img={avatar ? `${IMAGE_URL}${avatar}` : null} />
            </Link>
          </div>

          <div className={`${styles.lock} ${global.flex} ${global.f_center}`}>
            {blur ?
              <img src={lock} alt={'lock'}/>
              :
              <img src={lock} alt={'lock'} style={{opacity: "1%"}}/>
            }
          </div>

          <div className={`${styles.basket} ${global.flex} ${global.f_start}`}>
            {/*<TransprantButton text={'+'} img={basket} stylee={{background: 'white', width: '55px', padding: 0}}/>*/}
            <button className={styles.button} onClick={handleAddToCart}>
              <div  className={`${global.flex} ${global.f_a_center} ${global.f_center} ${styles.buttonCon}`}>
                  <img src={basket} alt={'img'}/>
                  <img src={plus} alt={'img'}/>
              </div>
            </button>
          </div>
      </div>


      <div className={`${styles.content} ${global.flex} ${global.f_dir_column}`}>
        <div className={`${styles.epigraph} ${global.flex} ${global.f_s_between}`}>
          <div className={`${global.t1} ${styles.title}`}>
            {/*{title ? title : 'Пришла и оторвало голову нам сумасшедшая весна'}*/}
            {/*Пришла и оторвало голову нам сумасшедшая весна*/}
            {title ? title :
              <div className={global.skeleton}>
                Пришла и оторвало голову нам сумасшедшая весна
              </div>
            }
          </div>
          <div className={`${global.t1} ${styles.title}`}>
            {price ?  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price) :
              <div className={global.skeleton}>
              015₽
              </div>

            }
          </div>
        </div>
        <div className={`${styles.analytych} ${global.flex} ${global.f_s_between}`}>
          <div className={`${global.d3} ${styles.views}`}>
            {views ? views + ' просмотров' :
              <div className={global.skeleton}>
              1000 просмотров
              </div>
              }
          </div>

          <div className={global.d3}>
            {time ? new Intl.DateTimeFormat('ru-RU').format(new Date(time)) :
              <div className={global.skeleton}>
              '2 часа назад'
              </div>
            }
          </div>

        </div>
      </div>
      </div>
      {img ?
        <img className={`${styles.cardImage}  ${blur ? global.blur : null}`} src={`${IMAGE_URL}${img}`} alt={'temp'}/>
      :
        <div className={`${global.skeleton} ${styles.noImage}`}>

        </div>
      }
    </div>
  )
}

export default CardLittle