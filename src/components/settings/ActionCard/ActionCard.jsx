import React from 'react';
import styles from './action-card.module.css'
import global from '../../../global.module.css';
import TransprantButton from "../../ui/buttons/transprant-button/TransprantButton";


function ActionCard({   children,
                        back = false,
                        b_text,
                        title,
                        click_nav}) {
    return (
        <div className={back ? `${styles.main} ${styles.back}` : `${styles.main}`}>
            <h4>{title}</h4>
            <div>
                {children}
            </div>
            <TransprantButton unique text={'Еще'} click={click_nav} />
        </div>
    );
}

export default ActionCard;