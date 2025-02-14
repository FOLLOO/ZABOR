import React, { useState } from 'react'

import styles from './authorization.module.css'
import global from '../../../global.module.css'
import GlassCard from '../../../components/glasses/glasses-card/GlassCard'
import InputText from '../../../components/ui/input/input-text/InputText'
// import InputCheckbox from '../../../components/ui/input/input-toggle/InputCheckbox'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../../provider/AuthProvider'
import Button from "../../../components/ui/buttons/button/Button";
import {useDispatch} from "react-redux";
import {resetPassword} from "../../../redux/slices/user";
import {FULL_TITLE, TITLE} from "../../../utils";


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

  const navigate = useNavigate()
    const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()

    await loginAction(email, password)
      .then((res) => {
        if (res.error) {
          return setErrMes(res.error.message)
        }
        const {token} = res
        localStorage.setItem('token', token)
        navigate('/publications')
      }).catch((err) => {
         return  setErrMes(err)
      })
  }

  const voidResetPassword = async () => {
    if(!email) return;
    localStorage.setItem('email', email);
    const data= {
        email: email
    }
    try{
        await dispatch(resetPassword(data))
    } catch (e) {
        setErrMes('Ошибка при обработке запроса')
    }
  }

  return (
    <div className={styles.back}>
        <div className={styles['form-style']}>
        <GlassCard>
          <div className={`${styles.flex}`}>
            <div className={`${styles.logo}`}>
                <Link to={'/'} className={`${global.xl4} `}>
                    {TITLE}
                </Link>
                <p className={`${global.d3} ${styles.decriptionText}`}>
                    {FULL_TITLE} — это платформа, на которой люди объединяют свои деньги или другие ресурсы через интернет, чтобы поддержать усилия других людей или организаций.
                </p>
            </div>
            <div className={`${styles.form}`}>
              <form className={styles.signIn} onSubmit={handleSubmit}>
                <InputText
                  value={email ? email : null}
                  // value={'new@mail.ru'}
                  onChange={e => setEmail(e.target.value)}
                  place={'Введите Email'} type={'email'} />
                <InputText
                  value={password ? password : null}
                  onChange={e => setPassword(e.target.value)}
                  place={'Введите Пароль'} type={'password'} />
                  <div className={`${styles.link}`}>
                      <div className={global.d3}>
                          <Link to={!email ? null : '/forgot'} className={!email ? styles.disabled : null} onClick={voidResetPassword}>
                              Забыли пароль?
                          </Link>
                      </div>
                      <div className={global.d3}>
                          <Link to={'/registration'}>
                              Зарегистрироваться
                          </Link>
                      </div>
                  </div>
                  <div className={styles.button}>
                      <Button variant={'outlet'} className={`${global.f_center} ${styles.button}`} type={'submit'}>
                          Войти
                      </Button>
                  </div>
                  <p className={`${styles.error} ${global.d3}`}>{errMes}</p>
              </form>
            </div>
          </div>
        </GlassCard>
        </div>
    </div>
  )
}

export default Authorization