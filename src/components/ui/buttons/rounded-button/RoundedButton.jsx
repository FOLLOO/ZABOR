'use client'
import React from 'react';

import styles from './rounded-button.module.css'
import global from "../../../../global.module.css";

export default function RoundButton ({onClick, img, text, variant= 'base'}) {
    return (
        <div className={`${global.flex} ${global.f_dir_column} ${styles.buttonsParent} ${global.f_a_center}`}>

            <button type="button" className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
                <div className={`${global.flex} ${global.f_dir_column} ${global.f_a_center}`}>
                    <img className={global['h-5']}  src={img} alt={'Добавить'}/>
                </div>
            </button>

            <div className={global.d3}>
                {text}
            </div>
        </div>
    )
}

