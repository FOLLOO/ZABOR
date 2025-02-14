import React from 'react';
import styles from './action-card.module.css'
import global from '../../../global.module.css';


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
        </div>
    );
}

export default ActionCard;