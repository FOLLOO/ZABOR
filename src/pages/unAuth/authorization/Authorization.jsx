import React from 'react'

import styles from './authorization.module.css'
import global from '../../../global.module.css'
import GlassCard from '../../../components/glasses/glasses-card/GlassCard'
import InputText from '../../../components/ui/input/input-text/InputText'
import InputCheckbox from '../../../components/ui/input/input-toggle/InputCheckbox'
import GreenButton from '../../../components/ui/buttons/green-button/GreenButton'
import { Link } from 'react-router-dom'
function Authorization (props) {
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
                  Авторизация
                  </h1>
                </div>
              <form className={styles.signIn}>
                <InputText place={'Введите Email'} type={'text'} height={'50px'}/>
                <InputText place={'Введите Пароль'} type={'password'} height={'50px'}/>
                <div className={`${global.flex} ${global.f_s_between} ${global.f_a_center}`}>
                  <div className={`${global.flex} ${global.f_a_center} ${styles.com}`}>
                  <InputCheckbox/>
                  <div className={global.t5}>
                    Запомнить меня
                  </div>
                  </div>

                  <div className={global.d2}>
                    <Link to={'/registration'}>
                    Зарегестрироваться
                    </Link>
                  </div>
                </div>
                <GreenButton text={'Войти'} unique/>
              </form>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default Authorization