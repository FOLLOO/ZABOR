//library
import React, {useContext, useEffect, useState} from "react";
import {Outlet, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

//css
import styles from "../profile-page/profile.module.css";
import global from "../../../../global.module.css";


//components
import ProfileCircle from "../../../../components/profile/profile-circle/ProfileCircle";
import WhiteButton from "../../../../components/ui/buttons/white-button/WhiteButton";
import GreenButton from "../../../../components/ui/buttons/green-button/GreenButton";
import Button from "../../../../components/ui/buttons/button/Button";
import Tab from "../../../../components/ui/tab/Tab";

//project functions
import {useAuth} from "../../../../provider/AuthProvider";
import {IMAGE_URL} from "../../../../utils";
import {getUserData, postUserAvatar, postUserCover} from "../../../../redux/slices/user";
import {OverlayContext} from "../../../../context/OverlayContext";

//img
import edit from "../../../../asserts/icons/edit.svg";


export function ProfileLayout() {

    const {overlay, setOverlay} = useContext(OverlayContext)


    const {id} = useParams()
    const {user} = useAuth()

    const [file, setFile] = useState(null)
    const [fileURL, setFileURL] = useState(null)
    const [image, setImage] = useState(false)
    // const [sub, setSub] = useState(false)

    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.userR) //    Не понимаю как можно улучшить потому что в Profile.jsx опять это вызывется

    const formData = new FormData()

    /**
     * Меняет состояние overlay
     * @constructor
     *
     */
    function Over() {
        setImage(!image)
        setOverlay(!overlay)
    }

    /**
     * Этот код предназначен для сохранения изображения в БазеДанных!
     * Принимает тип (type) из localStorage, чтобы сохранить.  либо как аватарку, либо как обложку
     * @constructor
     * @param e - просто event.listener
     */
    const saveImage = (e) => {
        // e.preventDefault()
        // console.log(happy)
        let value = localStorage.getItem('type')
        // console.log(value.toString())
        // alert('value', value)
        if (value === 'avatar') {
            formData.append('avatar', file)
            try {
                dispatch(postUserAvatar(formData))
                Over()
            } catch (err) {
                console.log(err)
            }
        }
        if (value === 'cover') {
            formData.append('cover', file)
            try {
                dispatch(postUserCover(formData))
                Over()
            } catch (err) {
                console.log(err)
            }
        } else {
            alert('💀 Something wrong with your params 💀')
            localStorage.removeItem('type')
        }
    }
    /**
     * Этот код предназначен для сохранения изображения в useState!
     * @constructor
     * @param event - просто event.listener
     */
    const fileChange = (event) => {
        const uploadedFile = event.target.files[0]
        let WIDTH = 1250
        // const AVATAR_WIDTH = 200;
        const type = localStorage.getItem('type')

        switch (type) {
            case 'cover' :
                WIDTH = 1920
                break
            case 'avatar' :
                WIDTH = 400
                break
            default :
                WIDTH = 1250
                break
        }

        if (uploadedFile) {
            const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
            if (!allowedExtensions.exec(uploadedFile.name)) {
                alert('Неверный формат файла. Пожалуйста, загрузите файл в формате .jpg, .jpeg, или .png')
                event.target.value = null // Сбросить значение input
                return
            }
            let reader = new FileReader()
            reader.readAsDataURL(uploadedFile)
            reader.onload = (event) => {
                let image_url = event.target.result
                let image = document.createElement('img')
                image.src = image_url
                image.onload = (e) => {
                    let canvas = document.createElement('canvas')
                    let ratio = WIDTH / e.target.width
                    canvas.width = WIDTH
                    canvas.height = e.target.height * ratio

                    const context = canvas.getContext('2d')
                    context.drawImage(image, 0, 0, canvas.width, canvas.height)

                    let new_image_url = context.canvas.toDataURL('image/jpeg', 90)

                    let new_image = document.createElement('img')
                    new_image.src = new_image_url
                    setFileURL(new_image_url)
                    canvas.toBlob((blob) => {
                        // Создаем новый File объект из Blob
                        const newFile = new File([blob], uploadedFile.name, {type: 'image/jpeg'})
                        setFile(newFile) // Сохраняем File в состоянии
                    }, 'image/jpeg', 1)
                }
            }
        }
    }



    /**
     * Этот код предназначен для подписки!
     * @constructor
     * @example
     * const data = {
     *             authorId: id
     *         }
     *         try {
     *             dispatch(postSubscribe(data))
     *             setSub(!sub)
     *         } catch (e) {
     *             console.log(e)
     *         }
     */
    // function Subscribe () {
    //     const data = {
    //         authorId: id
    //     }
    //     try {
    //         dispatch(postSubscribe(data))
    //         setSub(!sub)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


    const getUser = () => {
            try {
                dispatch(getUserData(id))
            } catch (err) {
                console.log(err)
            }
        }

    useEffect(() => {
        if (userData.status === 'loaded') return
        getUser()
    }, [userData.status])

        //todo: overlay don't work on publication page

        //  Данные для /Tabs
    const tabContent = [
            { title: 'Публикации', url: '.'},
            { title: 'Плейлисты',  url: './playlists'},
            { title: 'Об авторе',  url: './about'},
        ]

    console.log('overlay', overlay ,'\n', 'image', image)
    return (
        <div className={styles.main}>
            <div className={styles.prewieImage}>
                {userData?.items.coverUrl ?
                    <img src={`${IMAGE_URL}${userData?.items.coverUrl}`} alt={'some'} title={'Превью пользователя'}/>
                    :
                    <div className={global.skeleton} title={'Превью пользователя'}></div>
                }
            </div>
            {image ?
                <div className={`${styles.message} ${global.flex} ${global.f_dir_column}`}
                     title={'Форма добавления изображение для ava'}>
                    <form className={styles.delete} id={'uploadImage'} onSubmit={() => saveImage()}>
                        <input type={'file'} id={'input_file'} style={{display: 'none'}} onChange={fileChange}/>
                        <label htmlFor={'input_file'}>
                          <span className={styles.support}>
                              <header>
                              <h5>{fileURL ? 'Изменить изображение' : 'Импортировать новый файл'}</h5>
                              <p className={global.d2}>Допустимые форматы: .jpeg .jpg .png</p>
                              </header>
                          </span>
                        </label>
                    </form>
                    {fileURL ?
                        <img src={fileURL} alt={''} className={styles.editImage}/> : null}
                    <div className={`${global.flex}`} style={{gap: '10px'}}>
                        <WhiteButton text={'Отмена'} click={() => Over()}/>
                        <GreenButton text={'Сохранить'} type={'submit'} form={'uploadImage'}
                            // click={() => saveImage()}
                                     unique
                        />
                    </div>
                </div>
                : null
            }

            <div>
                <div className={styles.content}>
                    <div className={styles.profile}>
                        <div className={styles.nickname}>
                            <ProfileCircle img={userData.items?.avatarUrl ? `${IMAGE_URL}${userData?.items.avatarUrl}` : null}
                                           size={150}
                                           edit={user?.id === Number(id) ? true : null}
                                           click={() => {
                                               new Over()
                                               localStorage.setItem('type', 'avatar')
                                           }}/>
                            <div className={styles.subes}>
                                {userData?.items?.user?.nickname ?
                                    <h1 className={`${global.xl4} ${global.bold}`} title={'Псевдоним пользователя'}>{userData?.items?.user?.nickname}</h1>
                                    :
                                    <h2 className={global.skeleton}>NICKNAME</h2>
                                }
                                {userData?.items?.user?.count_subscribers ?
                                    <div className={global.d2} title={'Количество подписчиков'}>
                                        {userData?.items?.user?.count_subscribers} Подписчик
                                    </div>
                                    :
                                    <div className={global.d2}>
                                        Пока нет подписчиков
                                    </div>
                                }
                            </div>
                        </div>
                        {user?.id === Number(id) ?
                            <div className={styles.edit}>
                                {/*<TransprantButton text={'Изменить обложку'} img={edit} left click={() => {*/}
                                {/*    new Over()*/}
                                {/*    localStorage.setItem('type', 'cover')*/}
                                {/*}}/>*/}
                                <Button img={edit} img_size={'h-5'} variant={'ghost'}
                                        click={() => {
                                    new Over()
                                    localStorage.setItem('type', 'cover')
                                }}> Изменить обложку </Button>
                            </div>
                            :
                            <div className={styles.follow}>
                                <Button> Не работает </Button>
                                {/*{sub ?*/}
                                {/*    <TransprantButton text={'Отписаться'}/> :*/}
                                {/*    <WhiteButton text={'Подписаться'} click={() => Subscribe()}/>}*/}
                            </div>}
                    </div>
                <Tab items={tabContent}/>
                <Outlet/>
                </div>
            </div>
        </div>
    );
}