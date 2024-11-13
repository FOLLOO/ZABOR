import React from 'react';

//css
import styles from './nothing-yet.module.css';
import global from "../../../global.module.css";

//components
import Button from "../../../components/ui/buttons/button/Button";

export default function NothingYet({isMe, isAuthor, onButtonClick, buttonText}) {
    return (
        <div className={`${styles.main}`}>
            <div className={global.d2}>
                Мы ничего не смогли найти
            </div>
            {isMe && (
                <div className={styles.addButton}>
                    <Button
                        variant={'outlet'}
                        click={onButtonClick}
                        className={`${global.f_center} ${global.w100}`}>
                        {isAuthor ? 'Стать автором' : buttonText}
                    </Button>
                </div>
            )}
        </div>
    );
}

