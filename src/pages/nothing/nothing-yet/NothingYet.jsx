import React from 'react';

//css
import styles from './nothing-yet.module.css';
import global from "../../../global.module.css";

//components
import Button from "../../../components/ui/buttons/button/Button";

export default function NothingYet({isMe, isAuthor, onButtonClick, buttonText, text = 'Мы ничего не смогли найти'}) {
    return (
        <div className={`${styles.main}`}>
            <div className={global.d2}>
                {text}
            </div>
            {isMe &&  (
                <div className={styles.addButton}>
                    <Button
                        variant={'outlet'}
                        click={onButtonClick}
                        className={`${global.f_center} ${global.w100}`}>
                        {isAuthor ? 'Создать свой первый пост' : buttonText}
                    </Button>
                </div>
            )}
        </div>
    );
}

