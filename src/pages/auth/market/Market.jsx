import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";

//css
import styles from './market.module.css'
import global from '../../../global.module.css'

//components
import SettingsTitle from '../../../components/toolbar/settings-title/SettingsTitle'
import PlaylistsPost from '../../../components/post/post-cards/card-for-playlist/PlaylistsPost'
import Button from "../../../components/ui/buttons/button/Button";

//img
import fire from '../../../asserts/emoji/Fire.svg'
import close from '../../../asserts/icons/plus_white.svg'

//utils
import { deleteItemFromCart } from '../../../redux/slices/bascet'
import NothingYet from "../../nothing/nothing-yet/NothingYet";


function Market () {

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
      <div className={`${global.w100}`}>
        <SettingsTitle bigTitle={'Корзина'}
                       description={`В корзине ${cartItems.length} поста`}/>
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
                          <img src={close} alt={'close'} title={'Удалить'} className={styles.image}
                               onClick={() => handleClick(item)}/>
                        </button>
                      </div>
                    </>
                ))
                :
                <div className={styles.beMaxSize}>
                  <NothingYet/>
                </div>
              }
          </div>

          <div className={`${styles.bascket} `}>
            <div className={styles.bascket_content}>
              <div className={styles.form}>
                <Button img={fire} img_size={'h-5'}
                        variant={'outlet'} className={`${global.f_center} ${global.w100}`}>
                  Оплатить
                </Button>

                <hr/>

                <div className={styles.call}>
                  <div className={`${global.flex} ${styles.hall}`}>
                    <div className={global.t3}>
                      Постов:
                    </div>
                    <div className={global.t3}>
                      {cartItems.length} шт
                    </div>
                  </div>
                </div>

                <div className={styles.call}>
                  <div className={`${global.flex} ${styles.hall}`}>
                    <div className={global.t3}>
                      Общая стоимость:
                    </div>
                    <div className={global.t3}>
                      {new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(totalPrice)}
                    </div>
                  </div>
                </div>

                <hr/>

                <p className={`${global.d3} ${styles.descript}`}>
                  Нажимая «Оплатить», вы соглашаетесь с <Link to={'/documentation/pay'}> условиями использования </Link>сервиса
                  zabor.inc
                </p>

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