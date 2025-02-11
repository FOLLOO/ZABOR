import React from 'react';
import { useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

import styles from '../404/client-error.module.css';
import global from "../../../global.module.css";

import lock from '../../../asserts/loading/Lock.svg'

import Button from "../../ui/buttons/button/Button";

import {addPostToBasket} from "../../../redux/slices/basketAPI";
import {toggleOverlay} from "../../../utils";
function NotAvaliblePost() {
    const {id} = useParams();

    const dispatch = useDispatch();
    const addToBasket = (e) => {
        e.preventDefault()
        if (!id) {
            console.log('where is ID')
        }
        try {
            dispatch(addPostToBasket(id));
            toggleOverlay('addToBasket')
        } catch (e) {
            console.log('something wrong', e)
        }
    }

    return (
        <div className={styles.main}>
            <img src={lock} alt={'Нет доступа'} className={styles.img}/>
            <h2 className={`${global.xl3} ${global.bold}`}>
                Публикация недоступна
            </h2>
            <p className={global.d3}>Приобретите пост для просмотра</p>
            <div className={styles.button400}>
                <Button variant={'outlet'} className={`${global.f_center} ${global.w100}`}
                        click={(e) => addToBasket(e)}>
                    Купить
                </Button>
            </div>
        </div>
    );
}

export default NotAvaliblePost;