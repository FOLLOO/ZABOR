import React, {useEffect, useState} from 'react'

import styles from './my-profile-settings.module.css'
import global from '../../../../global.module.css'
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SettingsTitle from '../../../../components/toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../../../components/toolbar/settings-block/SettingsBlock'
import InputText from '../../../../components/ui/input/input-text/InputText'
import Textarea from '../../../../components/ui/input/textarea/Textarea'
import InputDporDown from '../../../../components/ui/input/input-dropdown/InputDporDown'

//img
import vk from '../../../../asserts/icons/update/vk.svg'
import twitch from '../../../../asserts/icons/update/twitch.svg'
import mail from '../../../../asserts/icons/mail.svg'
import telegram from '../../../../asserts/icons/telegram.svg'
import tikTok from '../../../../asserts/icons/update/tiktok.svg'
import youtube from '../../../../asserts/icons/update/youtube.svg'
import link from '../../../../asserts/icons/update/link-2.svg'

import {useAuth} from '../../../../provider/AuthProvider'
import {useDispatch} from 'react-redux'
import {getUserData} from '../../../../redux/slices/user'
import Button from "../../../../components/ui/buttons/button/Button";

function MyProfileSettings() {

    const {user, updateUser} = useAuth()

    const dispatch = useDispatch()

    // const { userData } = useSelector(state => state.userR)
    // const formattedDate = user?.date_of_birth ? new Date(user?.date_of_birth).toISOString().slice(0, 10) : '';

    const slectOpotionItems = [
        {
            id: 1,
            title: 'Я парень',
            value: 'м'
        },
        {
            id: 2,
            title: 'Я девушка',
            value: 'ж'
        },
    ]

    const initialSocialMediaData = [
        {
            socialMediumId: 1,
            text: '',
            placeholder: 'Телеграм',
            imgSrc: telegram
        },
        {
            socialMediumId: 2,
            text: '',
            placeholder: 'ВКонтакте',
            imgSrc: vk
        },
        {
            socialMediumId: 3,
            text: '',
            placeholder: 'Email',
            imgSrc: mail
        },
        {
            socialMediumId: 4,
            text: '',
            placeholder: 'Twitch',
            imgSrc: twitch
        },
        {
            socialMediumId: 5,
            text: '',
            placeholder: 'TikTok',
            imgSrc: tikTok
        },
        {
            socialMediumId: 6,
            text: '',
            placeholder: 'YouTube',
            imgSrc: youtube
        },
        {
            socialMediumId: 7,
            text: '',
            placeholder: 'Другое',
            imgSrc: link
        }
    ];


    const [nick, setNick] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const [sex, setSex] = useState('')
    const [birthDay, setBirthDay] = useState(new Date())
    // const [links, setLinks] = useState([])
    const [socialMedia, setSocialMedia] = useState(initialSocialMediaData);

    // const [passwordBefore, setPasswordBefore] = useState('')
    // const [passwordAfter, setPasswordAfter] = useState('')
    // const [passwordRepeat, setPasswordRepeat] = useState('')

    const getUser = () => {
        try {
            dispatch(getUserData(user.id))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (user === undefined) {
            getUser()
        }
        setNick(user?.nickname)
        setAboutMe(user?.aboutMe)
        setBirthDay(user?.date_of_birth)
        setSex(user?.sex)
        const result = initialSocialMediaData.map(item1 => {
            const item2 = user?.usersSocialMedia.find(item => item.id === item1.id)
            return {
                ...item1,
                text: item1.text ? item1.text : (item2 ? item2.text : '')
            }
        })
        setSocialMedia(result)
    }, [user])


    const handleChange = (id, value) => {
        setSocialMedia((prevSocialMedia) =>
            prevSocialMedia.map((item) =>
                item.socialMediumId === id ? {...item, text: value,} : item
            )
        );
    };


    function saveUser(e) {
        e.preventDefault()

        const data = {
            nickname: nick,
            sex: sex,
            date_of_birth: birthDay,
            aboutMe: aboutMe,
            socialMedia: socialMedia
        }

        try {
            updateUser(data)
        } catch (err) {
            console.log(err)
        }
    }

    // приход данных при загрузке страницы
    // useMemo(() => {
    //
    //     setNick(user.nickname)
    //     setAboutMe(user.aboutMe)
    //     setBirthDay(user.date_of_birth)
    //     setSex(user.sex)
    // }, )

    return (
        <div className={styles.main}>
            <BackCreate/>
            <SettingsTitle bigTitle={'Мой профиль'}
                           description={'Эти данные отображаются на вашей странице в профиле'}/>
            <hr className={styles.transprent}/>
            <div className={styles.settings}>
                <form id={'user_information'} onSubmit={saveUser}>
                    <SettingsBlock
                        title={'Публичная информация'} descripton={'Эта информация отображается всем. \n' +
                        'На вашей странице профиля'}>
                        <div className={styles.profileInputs}>
                            <InputText place={'Nickname (псевдоним)'}
                                       onChange={e => setNick(e.target.value)}
                                       value={nick ? nick : null}/>
                            {/*<InputText place={'Информация о себе'}/>*/}
                            <Textarea place={'Информация о себе'} rows={10}
                                      value={aboutMe ? aboutMe : null}
                                      onChange={e => setAboutMe(e.target.value)}
                            />
                            {/*<GreenButton text={'Сохранить изменения'} unique/>*/}
                        </div>
                    </SettingsBlock>

                    <SettingsBlock
                        mainWidth={1400}
                        title={'Личная информация'}
                        descripton={'Необходимо для рекомендаций. Не отображается на странице профиля'}>
                        <div className={styles.profileInputs}>
                            <InputDporDown data={slectOpotionItems}
                                           value={sex ? sex : null}
                                           onChange={e => setSex(e.target.value)}
                            />
                            <InputText place={'Дата рождения'} type={'date'}
                                       value={birthDay ? new Date(birthDay).toISOString().slice(0, 10).toString() : null}
                                       onChange={e => setBirthDay(e.target.value)}
                            />
                        </div>
                    </SettingsBlock>
                    <SettingsBlock
                        title={'Социальные сети'}>
                        <div className={styles.profileInputs}>
                            {socialMedia?.map((item) => (
                                <div key={item.socialMediumId} className={`${global.flex} ${styles.social}`}>
                                    <InputText
                                        place={item?.placeholder}
                                        value={item.text}
                                        onChange={(e) => handleChange(item.socialMediumId, e.target.value)}
                                    />
                                    <img src={item?.imgSrc} className={global['h-6']} alt="social"/>
                                </div>
                            ))}
                            <Button variant={'color'}
                                    className={global.f_center}
                                    type={'submit'}
                                    form={'user_information'}>
                                Сохранить изменения
                            </Button>
                        </div>
                    </SettingsBlock>
                </form>
                <hr className={styles.hr}/>
                <form id={'user_login'}>
                    <SettingsBlock
                        title={'Параметры входа'}
                        descripton={'Пароль должен иметь не менее 8 символов, содержать хотя бы одну заглавную букву,' +
                            ' \n' +
                            'и одну цифру'} red>
                        <div className={styles.profileInputs}>
                            <InputText place={'Введите старый пароль'} type={'text'} autocomplete={'new-password'}/>
                            <InputText place={'Введите новый пароль'} type={'password'} autocomplete={'new-password'}/>
                            <InputText place={'Повторите новый пароль'} type={'password'}
                                       autocomplete={'new-password'}/>
                            <Button type={'button'} variant={'color'} className={global.f_center}>
                                Сохранить изменения
                            </Button>
                        </div>
                    </SettingsBlock>
                </form>
            </div>
        </div>
    )
}

export default MyProfileSettings