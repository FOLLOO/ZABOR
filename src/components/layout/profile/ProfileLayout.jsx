//library
import React, {useEffect, useState} from "react";
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

//css
import styles from "../../../pages/auth/profile/profile-page/profile.module.css";
import global from "../../../global.module.css";
import dialog from '../../../pages/auth/profile/profile-page/profile.module.css'


//components
import ProfileCircle from "../../profile/profile-circle/ProfileCircle";
import Button from "../../ui/buttons/button/Button";
import Tab from "../../ui/tab/Tab";

//project functions
import {useAuth} from "../../../provider/AuthProvider";
import {handleDialogClick, IMAGE_URL, toggleOverlay} from "../../../utils";
import {getUserData, postUserAvatar, postUserCover} from "../../../redux/slices/user";

//img
import edit from "../../../asserts/icons/edit.svg";
import {postSubscribe} from "../../../redux/slices/sub";
import SelectPost from "../../post/post-playlist/select-postORplaylist/SelectPost";
import {putPublicationToFolder} from "../../../redux/slices/folder";
import NothingYet from "../../../pages/nothing/nothing-yet/NothingYet";
import ImageEditor from "../../cropper/ImageEditor";


export function ProfileLayout() {

    const {id, playlistID} = useParams()
    const {user} = useAuth()

    const [file, setFile] = useState(null)
    const [fileURL, setFileURL] = useState(null)
    const [cropper, setCropper] = useState(false)

    const [publications, setPublications] = useState([])


    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.userR) //    Не понимаю как можно улучшить потому что в Profile.jsx опять это вызывется
    const {userFolder} = useSelector(state => state.folder)

    const [sub, setSub] = useState(userData.items?.user?.isSub)
    const formData = new FormData()

    const addPublicationToState = (value, isChecked) => {
        if (isChecked) {
            if (!publications.includes(value)) {
                setPublications(prevPlaylist => [...prevPlaylist, value])
                // console.log('Added to playlist:', value)
            }
        } else {
            setPublications(prevPlaylist => prevPlaylist.filter(item => item !== value))
        }
    }

    const addPublicationsToPlaylist = () => {
        if (!playlistID) {
            alert('Ошибка исполнения. Попробуйте позже')
            console.log('Нет playlistID', playlistID)
        }
        if (publications.length <= 0) {
            alert('Выберете плейлист')
        }
        for (let i = 0; i < publications.length; i++) {
            try {
                const data = {
                    publicationId: Number(publications[i]),
                    folderOfPublicationId: playlistID
                }
                dispatch(putPublicationToFolder(data))
            } catch (e) {
                console.log(e)
            }
        }
        toggleOverlay('add-publication-to-playlist')
        // setPublicationsOver()
        window.location.reload()
    }

    const addPublicationOnPlaylist = () => {
        let id = window.localStorage.getItem('publictionToAddOn')

        if(!id){
            alert('Ошибка исполнения. Попробуйте позже')
            console.log('Нет publicationID', id)
        }
        if (publications.length <= 0) {
            alert('Выберете посты')
        }
        for (let i = 0; i < publications.length; i++) {
            try {
                const data = {
                    publicationId: id,
                    folderOfPublicationId: Number(publications[i])
                }
                dispatch(putPublicationToFolder(data))
            } catch (e) {
                console.log(e)
            }
        }
        toggleOverlay('add-this-to-playlist')
        window.location.reload()

    }

    /**
     * Этот код предназначен для сохранения изображения в БД!
     * Принимает тип (type: cover || avatar) из localStorage, чтобы сохранить.  либо как аватарку, либо как обложку
     * @constructor
     */
    const saveImage = () => {
        // e.preventDefault()
        let value = localStorage.getItem('type')
        if (value === 'avatar') {
            formData.append('avatar', file)
            try {
                dispatch(postUserAvatar(formData))
                toggleOverlay('setImage_dialog')
                setFileURL(null)
                setFile(null)
            } catch (err) {
                console.log(err)
            }
        }
        if (value === 'cover') {
            formData.append('cover', file)
            try {
                dispatch(postUserCover(formData))
                toggleOverlay('setImage_dialog')
            } catch (err) {
                console.log(err)
            }
        }
        localStorage.removeItem('type')
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
                        setCropper(!cropper)
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
    const subscribe = () => {
        const data = {
            authorId: id
        }
        try {
            dispatch(postSubscribe(data))
            setSub(!sub)
        } catch (e) {
            console.log(e)
        }
    }

    const getUser = () => {
        try {
            dispatch(getUserData(id))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUser()
        setSub(userData.items?.user?.isSub)
        //todo: нет идей как это реализовать при изменении пользователя не обновляется localStorage()
    }, [id])

    //Данные для /Tabs
    const tabContent = [
        {title: 'Публикации', url: '.'},
        {title: 'Плейлисты', url: './playlists'},
        {title: 'Автор', url: './about'},
    ]
    return (
        <div className={styles.main}>

            <div className={styles.prewieImage}>
                {userData?.items.coverUrl ?
                    <img src={`${IMAGE_URL}${userData?.items.coverUrl}`} alt={'some'} title={'Превью пользователя'}/>
                    :
                    <div className={global.skeleton} title={'Превью пользователя'}></div>
                }
            </div>

            <dialog id={'setImage_dialog'} className={styles.dialog} >
                <div className={`${styles.message} ${global.flex} ${global.f_dir_column}`}
                     title={'Форма добавления изображение для ava'}>
                    <form className={styles.delete} id={'uploadImage'} onSubmit={saveImage}>
                        <input type={'file'} id={'input_file'} style={{display: 'none'}} onChange={fileChange} />
                        <label htmlFor={'input_file'}>
                            <div className={styles.support}>
                                <h1 className={global.t3}>{fileURL ? 'Изменить изображение' : 'Импортировать новый файл'}</h1>
                                <p className={global.d3}>Допустимые форматы: .jpeg .jpg .png</p>
                            </div>
                        </label>
                    </form>


                    {cropper && fileURL ?
                        <>
                        <ImageEditor src={fileURL} setFile={setFile} setFileUrl={setFileURL} setCropper={setCropper} />
                        {/*<img src={fileURL} alt={''} className={styles.editImage}/>*/}
                        </>
                        :
                        <img src={fileURL} alt={''} className={styles.editImage}/>
                    }

                    <div className={`${global.flex}`} style={{gap: '1rem'}}>
                        <Button variant={'outlet'} click={() => toggleOverlay('setImage_dialog')}
                                className={`${global.w100} ${global.f_center}`}>
                            Отмена
                        </Button>
                        {!cropper ?
                        <Button variant={'color'} type={'submit'}
                                className={`${global.w100} ${global.f_center}`}
                                form={'uploadImage'}
                                disabled={!fileURL}
                                onClick={() => saveImage()}>
                            Сохранить
                        </Button> : null}
                    </div>
                </div>
            </dialog>

            <div>
                <div className={styles.content}>
                    <div className={styles.profile}>
                        <div className={styles.nickname}>
                            <ProfileCircle
                                img={userData.items?.avatarUrl ? `${IMAGE_URL}${userData?.items.avatarUrl}` : null}
                                size={150}
                                edit={user?.id === Number(id) ? true : null}
                                click={() => {
                                    toggleOverlay('setImage_dialog')
                                    localStorage.setItem('type', 'avatar')
                                }}/>
                            <div className={styles.subes}>
                                {userData?.items?.user?.nickname ?
                                    <h1 className={`${global.xl4} ${global.bold}`}
                                        title={'Псевдоним пользователя'}>{userData?.items?.user?.nickname}</h1>
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
                                <Button img={edit} img_size={'h-5'} variant={'ghost'}
                                        click={() => {
                                            toggleOverlay('setImage_dialog')
                                            localStorage.setItem('type', 'cover')
                                        }}> Изменить обложку </Button>
                            </div>
                            :
                            <div className={styles.follow}>
                                <Button variant={sub ? 'ghost' :  'outlet'}
                                        click={() => subscribe()}>
                                    {sub ? 'Отписаться' : 'Подписаться'}
                                </Button>
                            </div>}
                    </div>
                    <Tab items={tabContent}/>
                    <Outlet/>
                </div>
            </div>
            {/*todo: нужно сделать проверку на уже наличие в плейлисте поста  */}
            <dialog id={'add-publication-to-playlist'} className={dialog.dialog} onClick={(e) => handleDialogClick(e, 'add-publication-to-playlist')}>
                <div className={`${dialog.message} ${global.flex} ${global.f_dir_column}`}>
                    <h3 className={global.bold}> Выберете публикацию</h3>
                    <div className={dialog.addPostsCarda}>
                        {userData?.items?.publications?.map((item, i) => (
                            <SelectPost title={item?.title} key={i}
                                        onChange={(event) => addPublicationToState(item?.id, event.target.checked)}
                                        id={item?.id}
                                        img={item?.coverUrl}
                                        description={item?.description}/>
                        ))}
                    </div>
                    <div className={`${global.flex} ${dialog.gap}`}>
                        <Button variant={'outlet'}
                                className={`${global.w100} ${global.f_center}`}
                                // click={() => setPublicationsOver()}>
                                click={() => toggleOverlay('add-publication-to-playlist')}>
                            Отмена
                        </Button>
                        <Button variant={'color'}
                                className={`${global.w100} ${global.f_center}`}
                                click={() => addPublicationsToPlaylist()}>
                            Сохранить
                        </Button>
                    </div>
                </div>
            </dialog>


            <dialog id={'add-this-to-playlist'} className={dialog.dialog}
                    onClick={(e) => handleDialogClick(e, 'add-this-to-playlist')}>
                <div className={`${dialog.message} ${global.flex} ${global.f_dir_column}`}>
                    <h3 className={global.bold}>Выберете плейлист</h3>
                    {userFolder?.items !== 'У пользователя нет плейлистов' && userFolder?.items.length > 0 ?
                        <>
                            <div className={dialog.addPostsCarda}>
                                {userFolder?.items?.map((item) => (
                                    <SelectPost title={item?.name} key={item.id}
                                                onChange={(event) => addPublicationToState(item?.id, event.target.checked)}
                                                id={item?.id}
                                                img={item?.latest_publication[0]?.publication?.coverUrl}
                                                description={item?.description}/>
                                ))}
                            </div>
                            <div className={`${global.flex} ${dialog.gap}`}>
                                <Button variant={'outlet'}
                                        className={`${global.w100} ${global.f_center}`}
                                        click={() => toggleOverlay('add-this-to-playlist')}>
                                    Отмена
                                </Button>
                                <Button variant={'color'}
                                        className={`${global.w100} ${global.f_center}`}
                                        click={() => addPublicationOnPlaylist()}>
                                    Сохранить
                                </Button>
                            </div>
                        </>
                        : <NothingYet isMe={true} buttonText={'Создать плейлист'}
                                      onButtonClick={() => navigate('./playlists/create')}/>}
                </div>
            </dialog>
        </div>
    );
}