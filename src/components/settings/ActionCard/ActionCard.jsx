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
            <h4 className={`${global.t5} ${global.bold}`}>{title}</h4>
            <div>
                {children}
            </div>
          {b_text ?
            <TransprantButton unique text={b_text} click={click_nav} /> : null}
        </div>
    );
}

export default ActionCard;