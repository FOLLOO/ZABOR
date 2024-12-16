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
import {getUserData, postUserPassword} from '../../../../redux/slices/user'
import Button from "../../../../components/ui/buttons/button/Button";

function MyProfileSettings() {

    const {user, updateUser} = useAuth()

    const dispatch = useDispatch()


    const selectOptionItems = [
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

    const [socialMedia, setSocialMedia] = useState(initialSocialMediaData);

    const [passwordBefore, setPasswordBefore] = useState('')
    const [passwordAfter, setPasswordAfter] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    const getUser = () => {
        try {
            dispatch(getUserData(user?.id))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUser()
        setNick(user?.nickname)
        setAboutMe(user?.aboutMe)
        setBirthDay(user?.date_of_birth)
        setSex(user?.sex)

        if(user?.usersSocialMedia){
            const result = initialSocialMediaData.map(baseObj => {
                const userObject = user?.usersSocialMedia.find(item => item.socialMediumId === baseObj.socialMediumId)
                return {...baseObj, text: userObject?.text ? userObject.text : ''
                }
            })
            setSocialMedia(result)
        }
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
            alert('Мы обновили ваши параметры')
        } catch (err) {
            // alert('Возникла ошибка')
            console.log(err)
        }
    }

    function updatePassword(e){
        e.preventDefault()

        if(!passwordBefore && !passwordAfter && !passwordRepeat){
            alert('Не все поля заполнены')
            console.log(passwordRepeat, passwordBefore, passwordAfter)
        }

        if(passwordAfter !== passwordRepeat){
            alert('пароли не совпадают')
        }

        const data = {
            newPassword: passwordAfter,
            oldPassword: passwordBefore,
        }
        try {
            dispatch(postUserPassword(data)).then((response) => {
                if (response.payload?.message.toLowerCase() === 'password updated'){
                    window.location.reload()
                    alert('Пароль успешно изменен')
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

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
                            <Textarea place={'Информация о себе'} rows={10} maxLength={255}
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
                            <InputDporDown data={selectOptionItems}
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
                                        value={item.text ? item.text : null}
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
                <form id={'user_login'} onSubmit={updatePassword}>
                    <SettingsBlock
                        title={'Параметры входа'}
                        descripton={'Пароль должен иметь не менее 8 символов, содержать хотя бы одну заглавную букву,' +
                            ' \n' +
                            'и одну цифру'} red>
                        <div className={styles.profileInputs}>
                            <InputText place={'Введите старый пароль'}   value={passwordBefore ? passwordBefore : null} onChange={(e) => setPasswordBefore(e.target.value)} type={'text'} autocomplete={'new-password'} />
                            <InputText place={'Введите новый пароль'}    value={passwordAfter ? passwordAfter : null} onChange={(e) => setPasswordAfter(e.target.value)} type={'password'} autocomplete={'new-password'}/>
                            <InputText place={'Повторите новый пароль'}  value={passwordRepeat ? passwordRepeat : null} onChange={(e) => setPasswordRepeat(e.target.value)}  type={'password'}
                                       autocomplete={'new-password'}/>
                            <Button type={'submit'} variant={'color'} className={global.f_center}>
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