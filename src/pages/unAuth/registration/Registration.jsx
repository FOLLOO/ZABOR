import React from 'react'
import styles from './registration.module.css'
import GlassCard from '../../../components/glasses/glasses-card/GlassCard'
import global from '../../../global.module.css'
import InputText from '../../../components/ui/input/input-text/InputText'
import InputCheckbox from '../../../components/ui/input/input-toggle/InputCheckbox'
import { Link } from 'react-router-dom'
import GreenButton from '../../../components/ui/buttons/green-button/GreenButton'
import InputDporDown from '../../../components/ui/input/input-dropdown/InputDporDown'

function Registration (props) {
  return (
    <div className={styles.back}>
      <div className={styles.state}>
        <GlassCard>
          <div className={`
          ${global.flex} ${global.f_s_around} 
          ${styles.flex}
          `}>
            <div className={`${styles.logo}`}>
              <div
                className={`${global.flex} ${global.f_ji_center} ${global.f_center} ${global.f_a_center} ${global.h100}`}>
                <h2>
                  {/*naZAБORe*/}
                  ZAБOR
                </h2>
              </div>
            </div>
            <div className={`${styles.form} ${global.flex} ${global.f_dir_column} ${global.f_ji_center}`} style={{width: "100%"}}>
              <div className={styles.title}>
                <h1>
                  Регистрация
                </h1>
              </div>
              <form className={styles.signIn}>
                <InputText place={'Введите Email'} type={'text'}/>
                <InputDporDown/>
                <InputText place={'Введите Пароль'} type={'password'}/>
                <InputText place={'Повторите Пароль'} type={'password'}/>
                <div className={`${global.flex} ${global.f_end} ${global.f_a_center}`}>

                  <div className={global.d2}>
                    <Link to={'/login'}>
                      Уже есть аккаунт?
                    </Link>
                  </div>
                </div>
                <GreenButton text={'Зарегестрироваться'} unique/>
              </form>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default Registration