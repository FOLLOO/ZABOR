import React, { useEffect } from 'react'

import styles from './market.module.css'
import global from '../../../global.module.css'
import SettingsTitle from '../../../components/toolbar/settings-title/SettingsTitle'
import PlaylistsPost from '../../../components/post/post-cards/card-for-playlist/PlaylistsPost'
import GreenButton from '../../../components/ui/buttons/green-button/GreenButton'
import temp from '../../../asserts/temp/top-view-over-chinese-hot-pot.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItemFromCart } from '../../../redux/slices/bascet'

import logo from '../../../asserts/logo.svg'
import hello_emoji from '../../../asserts/emoji/hello.png'
import fire from '../../../asserts/emoji/Fire.svg'
import close from '../../../asserts/icons/plus_white.svg'

import Nothing from '../../nothing/Nothing'

function Market (props) {

  const cartItems = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  const handleClick = (data) => {
    try{
      dispatch(deleteItemFromCart(data));
      window.location.reload()
    }catch (e) {
      console.log(e)
    }
  }

  // const count = cartItems.length;
  // подсчет итога
  const totalPrice = cartItems.reduce((acc, currentValue) => {
    return acc + currentValue.price
  }, 0)

  return (
    <div className={`${global.flex} ${styles.main}`}>
      <div className={`${global.padRilLeft} ${global.w100}`}>
        <SettingsTitle bigTitle={'Корзина'} title={`В корзине ${cartItems.length} поста`}
                       description={'После оплаты пост станет доступным навсегда'}/>
        <div className={`${global.flex} ${styles.check}`}>
          <div className={styles.posts}>
            {cartItems.length > 0 ?
              cartItems.map((item) => (
                <>
                <PlaylistsPost blur
                               title={item.title}
                               image={item.coverUrl}
                               cost={item.price}
                               views={item.views_count}
                               description={item.description}/>
                  <div className={styles.close}>
                    <button className={styles.deleteButton}>
                      <img src={close} alt={'close'} title={'Удалить'} className={styles.image} onClick={() => handleClick(item)}/>
                    </button>
                  </div>
                </>
              ))
              :
              <div className={`${global.flex} ${global.f_center} ${global.w100}`}>
              <Nothing/>
              </div>
            }
          </div>
        </div>
      </div>
      <div className={`${styles.bascket} `}>
        <div className={styles.bascket_content}>
          <span style={{height: '100px'}}>
          </span>
          <div className={styles.form}>
            <h2>Оплата</h2>
            <div className={styles.call}>
              <div className={`${global.flex} ${styles.hall}`}>

                <div className={global.t1}>
                  Постов:
                </div>
                <div className={global.t1}>
                  {cartItems.length} шт
                </div>
              </div>
            </div>

            <div className={styles.call}>
              <div className={`${global.flex} ${styles.hall}`}>
                <div className={global.t1}>
                  Общая стоимость:
                </div>
                <div className={global.t1}>
                  {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(totalPrice)}
                </div>
              </div>
            </div>

            <button className={styles.whiteButton}>
              <div className={styles.b_content}>
                <img src={fire} width={22}/>
                <div className={`${global.t1} ${global.medium}`}>
                  Оплатить
                </div>
              </div>
            </button>

          </div>
          <div className={styles.basket_footer}>
              <div className={`${styles.block} ${global.flex}`}>
                <img className={styles.logo} src={logo} alt={'logo'}/>
              </div>
              <div className={styles.block}>
                <div className={`${global.d3} ${styles.c_text}`}>
                  © 2024 АЙМАНИ. Все права защищены.
                </div>
              </div>
              <div className={`${styles.block} ${global.flex} ${global.f_end}`}>
                <div className={styles.buttons}>
                  <button className={styles.button}><img src={hello_emoji} width={15}/></button>
                  <button className={styles.button}><img src={hello_emoji} width={15}/></button>
                  <button className={styles.button}><img src={hello_emoji} width={15}/></button>
                </div>
              </div>
          </div>
        </div>
      </div>


      {/*<GreenButton text={'Перейти к оплате'}/>*/}
      {/*</div>*/}
    </div>
  )
}

export default Market