import React, { useContext } from 'react'
import styles from './message-box.module.css'
import global from '../../global.module.css'

import close from '../../asserts/icons/close.svg'

import InputDporDown from '../ui/input/input-dropdown/InputDporDown'
import InputText from '../ui/input/input-text/InputText'
import GreenButton from '../ui/buttons/green-button/GreenButton'
import WhiteButton from '../ui/buttons/white-button/WhiteButton'
import TransprantButton from '../ui/buttons/transprant-button/TransprantButton'
import { OverlayContext } from '../../context/OverlayContext'
import { useNavigate } from 'react-router-dom'

/** Сообщения по типу:
 * вы уверены что хотите удалить это и т.д
 * Принимает 3 параметра: visibility, message, type
 *  type принимает входные данные
 * 'help' - Жалоба какая-то
 * 'buy' - Вы добавили пост в корзину
 * 'sure' - Вы уверены что хотите ... {message} ...
 * */

function MessageBox ({
  visability = true,
  message,
  type
}) {

  const { overlay, setOverlay } = useContext(OverlayContext);
  const navigate = useNavigate()
  const toggleOverlay = () => {
    setOverlay(!overlay);
  };
  const openLink = (value) => {
    toggleOverlay()
    navigate(value)
  }

  const Help = () => {
    return (
      <>
        <div className={`${global.flex} ${global.f_s_between}`}>
          <h3>О чем хотите сообщить?</h3>
          <TransprantButton
            img={close}
            nonePad
            stylee={{maxWidth: "50px"}}
            click={() => toggleOverlay()}
          />
        </div>
        <h4>
          Мы обязательно рассмотрим ваше обращение
        </h4>
        <InputDporDown/>
        <InputText height={"200px"}/>
        <div className={global.flex} style={{gap: "10px"}}>
          <WhiteButton text={'Отмена'}  />
          <GreenButton text={'Отправить'} unique />
        </div>
      </>
    );
  }

  const AddedCart = () => {
    return (
      <>
        <div className={`${global.flex} ${global.f_s_between}`}>
          <h3>Добавлено в корзину!</h3>
          <TransprantButton
            img={close}
            nonePad
            click={() => toggleOverlay()}
            stylee={{maxWidth: "50px"}}/>
        </div>
        <h4>
          Удалить пост можно в корзине
        </h4>
        {/*<InputDporDown/>*/}
        {/*<InputText height={"200px"}/>*/}
        <div className={`${global.flex} ${global.f_dir_column}`}  style={{gap: "10px"}}>
          <WhiteButton text={'Продолжить покупки'} click={() => toggleOverlay()}/>
          <GreenButton text={'Открыть корзину'} unique click={() => openLink('/market')}/>
        </div>
      </>
    )
  }

  const AreUSure = () => {
    return (
      <>
        <div className={`${global.flex} ${global.f_s_between}`}>
          <h3>Вы уверены что хотите {message ? message : '...'}?</h3>
          <TransprantButton
            img={close}
            nonePad
            click={() => toggleOverlay()}
            stylee={{maxWidth: "50px"}}
          />
        </div>
        <h4>
          Что то написано
        </h4>
        {/*<InputDporDown/>*/}
        {/*<InputText height={"200px"}/>*/}
        <div className={`${global.flex}`}  style={{gap: "10px"}}>
          <WhiteButton text={'Отмена'}  click={() => visability = false}/>
          <GreenButton text={'Да'} unique/>
        </div>
      </>
    )
  }

  const renderSwitch = (param) => {
    switch (param){
      case 'help' :
        return <Help/>;
      case 'buy' :
         return <AddedCart/>
      case 'sure' :
        return <AreUSure/>
      default:
        return <h1> Ой!<br/> Ничего нет.</h1>;
    }
  }


  return (
    <div className={`${styles.main} ${global.flex} ${global.f_dir_column}`}
         style={visability ? {display: 'flex'} : {display: 'none'}}>
      {renderSwitch(type)}
    </div>
  )
}

export default MessageBox