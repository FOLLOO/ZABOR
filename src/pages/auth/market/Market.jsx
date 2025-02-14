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
import del from '../../../asserts/icons/update/close.svg'
import fire from '../../../asserts/emoji/Fire.svg'

//utils
import NothingYet from "../../nothing/nothing-yet/NothingYet";
import {deleteItemFromBasket} from "../../../redux/slices/basketAPI";
import {Helmet} from "react-helmet";
import {TITLE} from "../../../utils";
import axios from "../../../r-axios/axios";


function Market () {

  const cartItems = useSelector((state) => state.cart.basket)
  const dispatch = useDispatch()
  const deleteItem = (e,ID) => {
    e.preventDefault()
    const data = {
      basketId: ID
    }
    try{
      dispatch(deleteItemFromBasket(data));
      // window.location.reload()
    }catch (e) {
      console.log(e)
    }
  }

  async function Pay (){
      try{
          const response = await axios.get(`/pay/transaction`);
          if(response){
            window.open(response.data)
          } // Возвращаем данные из ответа
      }catch (e) {
        console.log(e)
      }
    }

  // подсчет итога
  const totalPrice = cartItems.items.reduce((acc, currentValue) => {
    return acc + currentValue.publication?.price
  }, 0)

  return (
    <div className={`${global.flex} ${styles.main}`}>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{TITLE} | Корзина</title>
        <meta name="description" content="Корзина"/>
        <meta name="keywords" content="HTML, CSS, JavaScript"/>
        <meta name="author" content="Sairommef"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
      <div className={`${global.w100}`}>
        <SettingsTitle bigTitle={'Корзина'}
                       description={cartItems.length ? `В корзине ${cartItems.length} поста` : 'В корзине нет постов'}/>
        <div className={`${global.flex} ${styles.check}`}>
          <div className={styles.posts}>
            {cartItems.items.length > 0 ?
                cartItems.items.map((item) => {
                   const publication = item.publication;
                   return(
                    <div className={styles.data}>
                      <Button img={del} variant={'ghost'} className={styles.buttonReplace} click={(e) => deleteItem(e,publication.id)}></Button>
                      <PlaylistsPost blur
                                     title={publication?.title}
                                     image={publication?.coverUrl}
                                     cost={publication?.price}
                                     views={publication?.views_count}
                                     description={publication?.description}/>
                    </div>)
                })
                :
                <div className={styles.beMaxSize}>
                  <NothingYet/>
                </div>
              }
          </div>

          <div className={`${styles.bascket} `}>
            <div className={styles.bascket_content}>
              <div className={styles.form}>
                <Button img={fire} img_size={'h-5'} click={() => Pay()}
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
                      {cartItems.items.length} шт
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
                  Нажимая «Оплатить», вы соглашаетесь с <Link to={'/documentation/pay'} style={{color: "var(--accent)"}}> условиями использования </Link>сервиса
                  {" " + TITLE}
                </p>

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Market