import React, { useEffect, useState } from 'react'
import styles from './registration.module.css'
import GlassCard from '../../../components/glasses/glasses-card/GlassCard'
import global from '../../../global.module.css'
import InputText from '../../../components/ui/input/input-text/InputText'
import InputCheckbox from '../../../components/ui/input/input-toggle/InputCheckbox'
import { Link } from 'react-router-dom'
import GreenButton from '../../../components/ui/buttons/green-button/GreenButton'
import InputDporDown from '../../../components/ui/input/input-dropdown/InputDporDown'
import axios from '../../../r-axios/axios'

function Registration (props) {

  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [sex, setSex] = useState("")
  const [password, setPassword] = useState("")
  const [password1, setPassword1] = useState("")
  const [DR, setDR] = useState("")

  const [errMes, setErrMes] = useState("")


  // useEffect(() => {
  //   axios.get('/publication/getMainPublications');
  // })

  const items = [
    {
      id: 1,
      title: 'Мужской'
    },
    {
      id: 2,
      title: 'Женский'
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password1){
      return setErrMes("Пароли не совпадают")
    }

    try {
      const response = await axios.post('/auth/registration',
        { email,
          password,
          username : nickname,
          sex,
          date_of_birth : DR,
        });
      console.log(response)
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        // router.push('/posts');
      } else {
        console.log('ошибка', response.data.message);
      }
    } catch (error) {
      console.log(error);
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
            <div className={`${styles.form} ${global.flex} ${global.f_dir_column} ${global.f_ji_center}`} style={{width: "100%"}}>
              <div className={styles.title}>
                <h1>
                  Регистрация
                </h1>
              </div>
              <form className={styles.signIn} onSubmit={handleSubmit}>
                <InputText
                  place={'Введите Email'} type={'text'} height={"50px"}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputText place={'Введите Nickname'} type={'text'} height={"50px"}/>
                <InputDporDown data={items}/>
                <InputText place={'Введите Пароль'} type={'date'} height={"50px"}/>
                <InputText place={'Введите Пароль'} type={'password'} height={"50px"}/>
                <InputText place={'Повторите Пароль'} type={'password'} height={"50px"}/>
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