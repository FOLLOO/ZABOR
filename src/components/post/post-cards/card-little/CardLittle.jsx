import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'


import styles from './card-little.module.css'
import global from '../../../../global.module.css'


import basket from '../../../../asserts/icons/basket.svg'
import lock from '../../../../asserts/icons/Lock.svg'
import plus from '../../../../asserts/icons/plus.svg'
import added from '../../../../asserts/icons/update/chevron-down.svg'

import playlist from '../../../../asserts/icons/update/folder-input.svg'
import edit from '../../../../asserts/icons/edit.svg'
import deleteThis from '../../../../asserts/icons/contextMenu/trash red.svg'

//utils
import {IMAGE_URL, toggleOverlay} from '../../../../utils'
import {addPostToBasket} from "../../../../redux/slices/basketAPI";

import ProfileCircle from '../../../profile/profile-circle/ProfileCircle'
import Button from "../../../ui/buttons/button/Button";
import ContextDrop from "../../../context-drop/ContextDrop";
import ContextGroup from "../../../context-drop/context-group/ContextGroup";
import {deltePost} from "../../../../redux/slices/post";



//todo: уменьшить количество парметров компонента
function CardLittle({

                        title,
                        img,
                        avatar,
                        views,
                        price,
                        userID,
                        time,
                        data,
                        editable,
                        blur = false
                    }) {

    const dispatch = useDispatch();
    const [inBasket, setInBasket] = useState(null);
    const [open, setOpen] = useState(false);

    const addToBasket = (e, id) => {
        e.preventDefault()
        if (!id) {
            console.log('where is ID')
        }
        try {
            dispatch(addPostToBasket(id));
            toggleOverlay('addToBasket')
            setInBasket(!inBasket)
        } catch (e) {
            console.log('something wrong', e)
        }
    }

    const agreeToDelete = (id) => {
        let agreeToDelete = window.confirm("Вы точно желаете удалить этот пост?");
        if (agreeToDelete) {
            try {
                dispatch(deltePost(id))
                alert('Публикация удалена')
                window.location.reload()
            } catch (e) {
                alert('Ошибка исполнения, попробуйте позже');
            }
        }
    }

    const addEvent = () => {
        window.localStorage.setItem('publictionToAddOn', data.id);
        toggleOverlay('add-this-to-playlist')
    }

    return (
        <div className={styles.card}>
            <div className={`${styles.main}`}>
                <Link to={`/publication/${data?.id}`}
                      className={`${styles.actions} ${global.flex} ${global.f_dir_column}`}>
                    <div className={`${styles.profile} ${global.flex} ${global.f_end}`}>
                        <Link to={`/profile/${userID}`}>
                            <ProfileCircle size={30} img={avatar ? `${IMAGE_URL}${avatar}` : null}/>
                        </Link>
                    </div>

                    <div className={`${styles.lock} ${global.flex} ${global.f_center}`}>
                        {blur && !editable ?
                            <img src={lock} alt={'lock'}/>
                            :
                            <img src={lock} alt={'lock'} style={{opacity: "1%"}}/>
                        }
                    </div>

                    <div className={`${styles.basket} ${global.flex} ${global.f_start}`}>
                        {editable ? null :
                            <button className={inBasket ? styles.green : styles.button}
                                    disabled={inBasket}
                                    onClick={(e) => addToBasket(e, data?.id)}>
                                <div
                                    className={`${global.flex} ${global.f_a_center} ${global.f_center} ${styles.buttonCon}`}>
                                    {inBasket ?
                                        <img src={added} alt={'img'}/>
                                        :
                                        <>
                                            <img src={basket} alt={'img'}/>
                                            <img src={plus} alt={'img'}/>
                                        </>}
                                </div>
                            </button>}
                    </div>
                </Link>


                <div className={`${styles.content} ${global.flex} `}>
                    <div className={`${styles.epigraph} ${global.flex} ${global.f_s_between}`}>
                        <Link to={`/publication/${data?.id}`} className={`${global.t3} ${styles.title}`}>
                            {title ? title :
                                <div className={global.skeleton}>
                                    Пришла и оторвало голову нам сумасшедшая весна
                                </div>
                            }
                        </Link>
                        <div className={`${global.t3} ${styles.price}`}>
                            {price > 0 ? new Intl.NumberFormat('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB'
                                }).format(price) :
                                // <div className={global.skeleton}>
                                'Бесплатно'
                                // </div>
                            }
                        </div>
                    </div>
                    <div className={`${styles.analytych} ${global.flex} ${global.f_s_between} ${global.f_a_center}`}>

                        <div className={`${global.d3} ${styles.views}`}>
                            {views ? views + ' просмотров' :
                                <div className={global.skeleton}>
                                    1000 просмотров
                                </div>
                            }
                        </div>

                        <div className={global.d3}>
                            {time ? new Intl.DateTimeFormat('ru-RU').format(new Date(time)) :
                                <div className={global.skeleton}>
                                    '2 часа назад'
                                </div>
                            }
                        </div>
                        {editable ? <button className={styles.editableButton}
                                            onClick={() => setOpen(!open)}>...</button> : null}
                    </div>
                </div>
                {img ?
                    <img className={`${styles.cardImage}  ${blur ? null : null}`} src={`${IMAGE_URL}${img}`}
                         alt={'temp'}/>
                    :
                    <div className={`${global.skeleton} ${styles.noImage}`}>

                    </div>
                }
            </div>
            {editable && open ?
                <div className={styles.editContext}>
                    <ContextDrop>
                        <ContextGroup>
                            <Button variant={'ghost'} img={edit} img_size={'h-6'} className={global.w100}>
                                Редактировать
                            </Button>
                        </ContextGroup>
                        <ContextGroup noafter>
                            <div className={`${global.flex} ${global.f_dir_column}`}>
                                <Button variant={'ghost'} img={playlist}
                                        click={() => addEvent(data.id)}>
                                    Добавить в плейлист
                                </Button>
                                <Button variant={'red-text'} img={deleteThis} img_size={'h-6'} className={global.w100}
                                        click={() => agreeToDelete(data?.id)}>
                                    Удалить
                                </Button>
                            </div>
                        </ContextGroup>
                    </ContextDrop>
                </div> : null}
        </div>
    )
}

export default CardLittle