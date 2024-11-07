import React, {useEffect} from 'react'

import styles from './aboutMe.module.css'
import global from '../../../../global.module.css'

//image
import vk from '../../../../asserts/icons/update/vk.svg' //vk
import twitch from '../../../../asserts/icons/update/twitch.svg'
import mail from '../../../../asserts/icons/mail.svg'
import telegram from '../../../../asserts/icons/telegram.svg' //telegram
import tiktok from '../../../../asserts/icons/update/tiktok.svg'
import youtube from '../../../../asserts/icons/update/youtube.svg' //youtube
import link from '../../../../asserts/icons/update/link-2.svg'

// import GlassCard from '../../../../components/glasses/glasses-card/GlassCard'
// import GreenButton from '../../../../components/ui/buttons/green-button/GreenButton'
import {useNavigate, useParams} from 'react-router-dom'
import RoundButton from "../../../../components/ui/buttons/rounded-button/RoundedButton";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../../../../redux/slices/user";

function AboutMe () {
    const {id} = useParams()

    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const {userData} = useSelector(state => state.userR) //    Не понимаю как можно улучшить потому что в Profile.jsx опять это вызывется

    const getUser = () => {
        try {
            dispatch(getUserData(id))
        } catch (err) {
            console.log(err)
        }
    }

    function setImageToButton(name) {
        switch (name) {
            case 'twitch':
                return twitch;
            case 'mail':
                return mail;
            case 'telegram':
                return telegram;
            case 'vk':
                return vk;
            case 'youtube':
                return youtube;
            case 'tiktok':
                return tiktok;
            default: return link;
        }
    }

    useEffect(() => {
        if (userData.status === 'loaded') return
        getUser()
    },[userData.status])

  return (
    // margin потому что там ток один атрибут
      <div className={styles.main}>
          <section className={styles.descriptionBlock}>
              <h1 className={global.t5}>Обо мне</h1>
              <p className={`${styles.description} ${global.t2}`}>
                {userData?.items?.user?.aboutMe}
              </p>
              <div className={styles.userSocialLinks}>
                  {userData?.items?.socialMedia?.map((item, index) => (
                      item.text === '' ? null :
                    <RoundButton text={item.socialMedium.name} img={setImageToButton(item.socialMedium.name)} variant={'black'}/>
                  ))}
              </div>
          </section>
          <hr/>
          <secition className={styles.achievementsBlock}>

          </secition>
          <hr/>
          <section className={styles.goalsBlock}>

          </section>
      </div>
  )
}

export default AboutMe