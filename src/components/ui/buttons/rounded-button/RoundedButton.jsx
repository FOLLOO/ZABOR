'use client'
import React from 'react';

import styles from './rounded-button.module.css'
import global from "../../../../global.module.css";
import {Link} from "react-router-dom";

export default function RoundButton ({onClick, img, text, variant= 'base', link}) {
    return (
        <div className={`${global.flex} ${global.f_dir_column} ${styles.buttonsParent} ${global.f_a_center}`}>
            {link ?
                <Link to={link} className={`${styles.button} ${styles[variant]}`}>
                    <div className={`${global.flex} ${global.f_dir_column} ${global.f_a_center}`}>
                        <img className={global['h-5']} src={img} alt={link}/>
                    </div>
                </Link> :
                <button type="button" className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
                    <div className={`${global.flex} ${global.f_dir_column} ${global.f_a_center}`}>
                    <img className={global['h-5']}  src={img} alt={text}/>
                </div>
            </button> }

            <div className={global.d3}>
                {text}
            </div>
        </div>
    )
}

