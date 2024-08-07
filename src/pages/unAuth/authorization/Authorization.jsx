import React, { useEffect, useState } from 'react'

import styles from './authorization.module.css'
import global from '../../../global.module.css'
import GlassCard from '../../../components/glasses/glasses-card/GlassCard'
import InputText from '../../../components/ui/input/input-text/InputText'
// import InputCheckbox from '../../../components/ui/input/input-toggle/InputCheckbox'
import GreenButton from '../../../components/ui/buttons/green-button/GreenButton'
import { Link, useNavigate } from 'react-router-dom'

import { useCookies } from 'react-cookie'
import { useAuth } from '../../../provider/AuthProvider'

/*** headers не содержит refreshToken -> он как бы есть, но его с axios не вытащить
 * https://github.com/axios/axios/issues/295
 * Как то так
 * */
function Authorization () {

  const { loginAction } = useAuth()

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [errMes, setErrMes] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await loginAction(email, password)
      .then((res) => {
        // console.log(res)
        if (res.error) {
          return setErrMes(res.error.message)
        }
        const { token, email} = res
        localStorage.setItem('token', token) //Где то вроде используется
        setCookie('token', token, { path: '/' })
        setCookie('email', email, { path: '/' })

        navigate('/main')
      })
  }

  // useEffect(() => {
  //
  //   console.log('Cookies after setting:', cookie);
  // }, [cookie]);

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
            <div className={`${styles.form} ${global.flex} ${global.f_dir_column} ${global.f_ji_center}`}
                 style={{ width: '100%' }}>
              <div className={styles.title}>
                <h1>
                  Авторизация
                </h1>
              </div>
              <form className={styles.signIn} onSubmit={handleSubmit}>
                <InputText
                  value={email ? email : null}
                  onChange={e => setEmail(e.target.value)}
                  place={'Введите Email'} type={'email'} height={'50px'}/>
                <InputText
                  value={password ? password : null}
                  onChange={e => setPassword(e.target.value)}
                  place={'Введите Пароль'} type={'password'} height={'50px'}/>

                <div className={`${global.flex} ${global.f_s_between} ${global.f_a_center}`}>
                  <div className={`${global.flex} ${global.f_a_center} ${styles.com}`}>

                  </div>
                  <div className={global.d2}>
                    <Link to={'/registration'}>
                      Зарегистрироваться
                    </Link>
                  </div>
                </div>
                <GreenButton text={'Войти'} unique type={'submit'}/>
              </form>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default Authorization