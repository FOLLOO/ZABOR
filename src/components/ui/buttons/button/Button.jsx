'use client'
import React from 'react';

import styles from './button.module.css'
import global from '../../../../global.module.css'

export default function Button({
                                   children, click, img,
                                   form, className, title, dataIndex, key,
                                   type, size = 'base', variant= 'default'
                               }) {
    return (
       <button className={`${styles.button} ${styles[variant]}`}
               title={title}
               data-index={dataIndex}
               key={key}
               type={type} form={form} onClick={click}>
           {img ? <img src={img} alt={'.'} className={`${global[size]}`}/> : null}
           <span> {children} </span>
       </button>
    );
};

