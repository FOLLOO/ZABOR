import React from 'react'

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

import {useNavigate, useParams} from 'react-router-dom'
import RoundButton from "../../../../components/ui/buttons/rounded-button/RoundedButton";
import { useSelector} from "react-redux";
import {useAuth} from "../../../../provider/AuthProvider";
import Loading from "../../../loading/Loading";
import NothingYet from "../../../nothing/nothing-yet/NothingYet";
import {Helmet} from "react-helmet";
import {TITLE} from "../../../../utils";

function AboutMe() {
    const {id} = useParams()
    const {user} = useAuth()


    const navigate = useNavigate()

    const {userData} = useSelector(state => state.userR) //    Не понимаю как можно улучшить потому что в Profile.jsx опять это вызывется



    function setImageToButton(name) {
        switch (name) {
            case 'twitch':
                return twitch;
            case 'email':
                return mail;
            case 'telegram':
                return telegram;
            case 'vk':
                return vk;
            case 'youtube':
                return youtube;
            case 'tiktok':
                return tiktok;
            default:
                return link;
        }
    }

    const isMe = () => { return user?.id === Number(id) }


    if(userData.status !== 'loaded'){
        return <Loading/>
    }

    return (
        // margin потому что там ток один атрибут
        isMe && userData?.items?.user?.aboutMe ?
            <div className={styles.main}>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>{TITLE} | {userData?.items?.user?.nickname}</title>
                    <meta name="description" content={userData?.items?.user?.aboutMe}/>
                    <meta name="keywords" content="HTML, CSS, JavaScript"/>
                    <meta name="author" content="Sairommef"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </Helmet>

                <section className={styles.descriptionBlock}>
                    <h3 className={global.bold}> {isMe ? 'Обо мне' : 'Oб авторе'}</h3>
                    <p className={`${styles.description} ${global.t2}`}>
                        {userData?.items?.user?.aboutMe}
                    </p>
                    <div className={styles.userSocialLinks}>
                        {userData?.items?.socialMedia?.map((item) => (
                            item.text === '' ? null :
                                <RoundButton text={item.socialMedium.name} link={item.text}
                                             img={setImageToButton(item.socialMedium.name)} variant={'black'}/>
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
            :
            <NothingYet
                isMe={isMe()}
                // isAuthor={user?.roleId === 1}
                onButtonClick={() => navigate('/settings/config')}
                buttonText="Рассказать о себе"
            />
    )
}

export default AboutMe