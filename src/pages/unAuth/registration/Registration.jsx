import React, { useState } from 'react'
import styles from './registration.module.css'
import GlassCard from '../../../components/glasses/glasses-card/GlassCard'
import global from '../../../global.module.css'
import InputText from '../../../components/ui/input/input-text/InputText'
import { Link } from 'react-router-dom'
import GreenButton from '../../../components/ui/buttons/green-button/GreenButton'
import InputDporDown from '../../../components/ui/input/input-dropdown/InputDporDown'
// import axios from '../../../r-axios/axios'
// import { fetchRegistration } from '../../../redux/slices/user'
// import { useDispatch } from 'react-redux'
// import { useAuth } from '../../../provider/AuthProvider'
import userService from '../../../services/UserService'

function Registration (props) {

  // const navigate = useNavigate()
  // const dispatch = useDispatch()

  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [sex, setSex] = useState('')
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [DR, setDR] = useState('')

  const [errMes, setErrMes] = useState('')

  const items = [
    {
      id: 1,
      title: 'Мужской',
      value: 'м'
    },
    {
      id: 2,
      title: 'Женский',
      value: 'ж'
    },
  ]
// ZAEBALOOOO
// ZAEBALOOOO
// ZAEBALOOOO
// ZAEBALOOOO
// ZAEBALOOOO
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== password1) {
      return setErrMes('Пароли не совпадают')
    }
    const data = {
      email,
      password,
      username: nickname,
      sex,
      date_of_birth: DR,
    }
    try{
      userService().createNewUser(data)
    }
    catch (err){
      // console.log(user)
    }
  }

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
                  ZABOR
                </h2>
              </div>
            </div>
            <div className={`${styles.form} ${global.flex} ${global.f_dir_column} ${global.f_ji_center}`}
                 style={{ width: '100%' }}>
              <div className={styles.title}>
                <h1>
                  Регистрация
                </h1>
              </div>
              <form className={styles.signIn} onSubmit={handleSubmit}>
                <InputText
                  place={'Введите Email'} type={'email'} height={'50px'}
                  required
                  value={email ? email : null}
                  onChange={e => setEmail(e.target.value)}
                />
                <InputText place={'Введите Nickname'} type={'text'} height={'50px'}
                           value={nickname ? nickname : null}
                           required
                           onChange={e => setNickname(e.target.value)}
                />
                <InputDporDown data={items} required
                               value={sex ? sex : null}
                               onChange={e => setSex(e.target.value)}
                />
                <InputText type={'date'} height={'50px'}
                           value={DR ? DR : null}
                           required
                           onChange={e => setDR(e.target.value)}

                />
                <InputText place={'Введите Пароль'} type={'password'} height={'50px'}
                           value={password ? password : null}
                           required
                           onChange={e => setPassword(e.target.value)}
                />
                <InputText place={'Повторите Пароль'} type={'password'} height={'50px'}
                           value={password1 ? password1 : null}
                           required
                           onChange={e => setPassword1(e.target.value)}
                />
                <div className={`${global.flex} ${global.f_end} ${global.f_a_center}`}>

                  <div className={global.d2}>
                    <Link to={'/login'}>
                      Уже есть аккаунт?
                    </Link>
                  </div>
                </div>
                <GreenButton type={'submit'} text={'Зарегестрироваться'} unique/>
              </form>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default Registration