import React, { useState } from 'react'

import styles from './my-profile-settings.module.css'
import global from '../../../../global.module.css'
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SettingsTitle from '../../../../components/toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../../../components/toolbar/settings-block/SettingsBlock'
import InputText from '../../../../components/ui/input/input-text/InputText'
import GreenButton from '../../../../components/ui/buttons/green-button/GreenButton'
import Textarea from '../../../../components/ui/input/textarea/Textarea'
import InputDporDown from '../../../../components/ui/input/input-dropdown/InputDporDown'
import ProfileCard from '../../../../components/profile/profile-card/ProfileCard'

//img
import vk from '../../../../asserts/icons/VK.svg'
import twich from '../../../../asserts/icons/twich.svg'
import mail from '../../../../asserts/icons/mail.svg'
import telegram from '../../../../asserts/icons/Telegram.svg'
import tikTok from '../../../../asserts/icons/tikTok.svg'
import a_link from '../../../../asserts/icons/Another Link (Link).svg'

import temp from '../../../../asserts/temp/full-shot-people-training-together.jpg'
import { useAuth } from '../../../../provider/AuthProvider'

// console.log(user)
function MyProfileSettings ({}) {

  const { user } = useAuth()

  const formattedDate = user?.date_of_birth ? new Date(user?.date_of_birth).toISOString().slice(0, 10) : '';
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

  const [nick, setNick] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [sex, setSex] = useState('')
  const [birthDay, setBirthDay] = useState()
  const [links, setLinks] = useState([])

  const [passwordBefore, setPasswordBefore] = useState('')
  const [passwordAfter, setPasswordAfter] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')


  return (
    <div className={styles.main}>
      <BackCreate sticky/>
      <SettingsTitle bigTitle={'Мой профиль'} description={'Эти данные отображаются на вашей странице в профиле'}/>

      <div className={styles.settings}>
        <SettingsBlock
          mainWidth={1400}
          title={'Публичная информация'} descripton={'Эта информация отображается всем. \n' +
          'На вашей странице профиля'} >
          <div className={styles.profileInputs}>
            <InputText place={'Nickname (псевдоним)'} value={user?.nickname}/>
            {/*<InputText place={'Информация о себе'}/>*/}
            <Textarea place={'Информация о себе'} rows={15} value={user?.aboutMe}/>
            {/*<GreenButton text={'Сохранить изменения'} unique/>*/}
          </div>
        </SettingsBlock>

        <SettingsBlock
          mainWidth={1400}
          title={'Личная информация'} descripton={'Необходимо для рекомендаций. Не отображается на странице профиля'} >
          <div className={styles.profileInputs}>
            <InputDporDown data={items} value={user?.sex} />
            <InputText place={'Дата рождения'} type={'date'} value={formattedDate}/>
            {/*<InputText place={'Информация о себе'}/>*/}
            {/*<Textarea place={'Информация о себе'} rows={15}/>*/}
            <GreenButton text={'Сохранить изменения'} unique/>
          </div>
        </SettingsBlock>

        <SettingsBlock
          mainWidth={1400}
          title={'Социальные сети'} >
          <div className={styles.profileInputs}>
            <div className={`${global.flex} ${styles.social}`}>
            <InputText place={'Телеграм'} width={"50%"}/>
              <img src={telegram} alt={'social'}/>
            </div>

            <div className={`${global.flex} ${styles.social}`}>
              <InputText place={'ВКонтакте'} width={"50%"} />
              <img src={vk} alt={'social'}/>
            </div>

            <div className={`${global.flex} ${styles.social}`}>
              <InputText place={'Email'} width={"50%"}/>
              <img src={mail} alt={'social'}/>
            </div>

            <div className={`${global.flex} ${styles.social}`}>
              <InputText place={'Twich'} width={"50%"}/>
              <img src={twich} alt={'social'}/>
            </div>

            <div className={`${global.flex} ${styles.social}`}>
              <InputText place={'TikTok'} width={"50%"}/>
              <img src={tikTok} alt={'social'}/>
            </div>

            <div className={`${global.flex} ${styles.social}`}>
              <InputText place={'Другое'} width={"50%"}/>
              <img src={a_link} alt={'social'}/>
            </div>

            {/*<InputText place={'Информация о себе'}/>*/}
            {/*<Textarea place={'Информация о себе'} rows={15}/>*/}
            <GreenButton text={'Сохранить изменения'} unique />
          </div>
        </SettingsBlock>

        <SettingsBlock
          mainWidth={1400}
          title={'Параметры входа'} descripton={'Пароль должен иметь не менее 8 символов, содержать хотя бы одну заглавную букву,' +
          ' \n' +
          'и одну цифру'} red>
          <div className={styles.profileInputs}>
            <InputText place={'Введите старый пароль'} type={'text'}/>
            <InputText place={'Введите новый пароль'} type={'password'}/>
            <InputText place={'Повторите новый пароль'} type={'password'}/>
            {/*<InputText place={'Информация о себе'}/>*/}
            {/*<Textarea place={'Информация о себе'} rows={15}/>*/}
            <GreenButton text={'Сохранить изменения'} unique />
          </div>
        </SettingsBlock>
        {/*<ProfileCard nickname={'Егор Антонов'}*/}
        {/*             image={temp}*/}
        {/*             description={'Я целеустремленный и креативный специалист, ' +*/}
        {/*               'который постоянно находится в поиске новых возможностей для самореализации.' +*/}
        {/*               'С радостью делюсь своими идеями и знаниями со всеми, кто меня окружает.' +*/}
        {/*               ' Стремлюсь к постоянному саморазвитию и совершенствованию своих навыков'}/>*/}
        {/*<ProfileCard />*/}
      </div>
    </div>
  )
}

export default MyProfileSettings