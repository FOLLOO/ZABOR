import React from 'react';
import global from '../../global.module.css'
import styles from './style.module.css'
function Like({stroke = 'var(--black)', fill = 'transparent'}) {
    return (
        <div className={`${global.flex} ${global.f_center}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" className={` ${styles.like}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20.4201 4.58045C19.9184 4.07702 19.3223 3.67758 18.6659 3.40503C18.0095 3.13248 17.3058 2.99219 16.5951 2.99219C15.8844 2.99219 15.1806 3.13248 14.5243 3.40503C13.8679 3.67758 13.2718 4.07702 12.7701 4.58045L12.0001 5.36045L11.2301 4.58045C10.7284 4.07702 10.1323 3.67758 9.47591 3.40503C8.81953 3.13248 8.1158 2.99219 7.40509 2.99219C6.69437 2.99219 5.99065 3.13248 5.33427 3.40503C4.67789 3.67758 4.08176 4.07702 3.58009 4.58045C1.46009 6.70045 1.33009 10.2804 4.00009 13.0004L12.0001 21.0004L20.0001 13.0004C22.6701 10.2804 22.5401 6.70045 20.4201 4.58045Z"
                    stroke={stroke} strokeWidth="2" fill={fill} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
            );
}

export default Like;