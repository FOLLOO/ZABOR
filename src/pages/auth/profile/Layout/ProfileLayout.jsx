//library
import React, { useEffect, useState} from "react";
import {Outlet, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

//css
import styles from "../profile-page/profile.module.css";
import global from "../../../../global.module.css";


//components
import ProfileCircle from "../../../../components/profile/profile-circle/ProfileCircle";
import Button from "../../../../components/ui/buttons/button/Button";
import Tab from "../../../../components/ui/tab/Tab";

//project functions
import {useAuth} from "../../../../provider/AuthProvider";
import {IMAGE_URL} from "../../../../utils";
import {getUserData, postUserAvatar, postUserCover} from "../../../../redux/slices/user";

//img
import edit from "../../../../asserts/icons/edit.svg";
import {postSubscribe} from "../../../../redux/slices/sub";


export function ProfileLayout() {

    const {id} = useParams()
    const {user} = useAuth()

    const [file, setFile] = useState(null)
    const [fileURL, setFileURL] = useState(null)


    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.userR) //    Не понимаю как можно улучшить потому что в Profile.jsx опять это вызывется

    const formData = new FormData()

    /**
     * Меняет состояние overlay
     * @constructor
     *
     */
     const over = () => {
         const dialog = document.getElementById('setImage_dialog')
         const isOpen = dialog.open;
         isOpen ?  dialog.close() : dialog.showModal()
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
                over()
            } catch (err) {
                console.log(err)
            }
        }
        if (value === 'cover') {
            formData.append('cover', file)
            try {
                dispatch(postUserCover(formData))
                over()
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
        } catch (e) {
            console.log(e)
        }
    }

    // function some(digits){
    //     if(digits.length <= 0){
    //         return []
    //     }
    //
    //     digits.split('')
    //     const arr = [null, 'abc', 'def', 'ghi' ,'jkl' ,'mno' ,'pqrs','tuv' ,'wxyz'];
    //
    //     const result = []
    //     const first = []
    //     const other = []
    //
    //     first.push(arr[digits[0] - 1].split(''))
    //     for(let i = 1; i < digits.length; i++){
    //         other.push(arr[digits[i] - 1].split(''))
    //     }
    //     for(let p = 0; p < first[0].length; p++){
    //         for (let k = 0; k < other[0].length; k++){
    //             result.push(first[0][p] + other[0][k])
    //         }
    //     }
    //     return result
    // }

    const getUser = () => {
            try {
                dispatch(getUserData(id))
            } catch (err) {
                console.log(err)
            }
        }

    useEffect(() => {
        if (userData.items.id === Number(id)) return;
        // if (userData.status === 'loaded')return;
        getUser()
    }, [])

        //todo: overlay don't work on publication page
        //Данные для /Tabs
    const tabContent = [
            { title: 'Публикации', url: '.'},
            { title: 'Плейлисты',  url: './playlists'},
            { title: 'Автор',  url: './about'},
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

            <dialog  id={'setImage_dialog'} className={styles.dialog} onClick={() => over()}>
                <div className={`${styles.message} ${global.flex} ${global.f_dir_column}`} 
                        title={'Форма добавления изображение для ava'}>
                    <form className={styles.delete} id={'uploadImage'} onSubmit={() => saveImage()}>
                        <input type={'file'} id={'input_file'} style={{display: 'none'}} onChange={fileChange}/>
                        <label htmlFor={'input_file'}>
                          <div className={styles.support}>
                              <h1 className={global.t3}>{fileURL ? 'Изменить изображение' : 'Импортировать новый файл'}</h1>
                              <p className={global.d3}>Допустимые форматы: .jpeg .jpg .png</p>
                          </div>
                        </label>
                    </form>
                    {fileURL ?
                        <img src={fileURL} alt={''} className={styles.editImage}/> : null}
                    <div className={`${global.flex}`} style={{gap: '1rem'}}>
                        <Button variant={'outlet'}
                                className={`${global.w100} ${global.f_center}`} >
                            Отмена
                        </Button>
                         <Button variant={'color'} type={'submit'}
                                 className={`${global.w100} ${global.f_center}`}
                                 form={'uploadImage'}
                                 disabled={!fileURL}
                                 onClick={() =>saveImage()}>
                             Сохранить
                         </Button>
                    </div>
                </div>
            </dialog>

            <div>
                <div className={styles.content}>
                    <div className={styles.profile}>
                        <div className={styles.nickname}>
                            <ProfileCircle img={userData.items?.avatarUrl ? `${IMAGE_URL}${userData?.items.avatarUrl}` : null}
                                           size={150}
                                           edit={user?.id === Number(id) ? true : null}
                                           click={() => {
                                               over()
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
                                <Button img={edit} img_size={'h-5'} variant={'ghost'}
                                        click={() => {
                                            over()
                                            localStorage.setItem('type', 'cover')
                                }}> Изменить обложку </Button>
                            </div>
                            :
                            <div className={styles.follow}>
                                <Button variant={'outlet'}
                                        click={() => subscribe()}>
                                    Подписаться
                                </Button>
                            </div>}
                    </div>
                <Tab items={tabContent}/>
                <Outlet/>
                </div>
            </div>
        </div>
    );
}