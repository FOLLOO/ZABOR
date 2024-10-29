'use client'
import React from 'react';

import styles from './button.module.css'
import global from '../../../../global.module.css'

export default function Button({
                                   children, click, img, id, text_id, name,
                                   form, className, title, dataIndex, key,
                                   type, size = 'base', img_size = 'base', variant= 'default'
                               }) {
    return (
       <button className={`${styles.button} ${styles[img_size]} ${styles[variant]} ${className}`}
               title={title}
               name={name}
               id={id}
               data-index={dataIndex}
               key={key}
               type={type} form={form} onClick={click}>
           {img ? <img src={img} alt={'.'} className={`${global[img_size]}`}/> : null}
           <span
           id={text_id} className={`${global[size]}`}
           > {children} </span>
       </button>
    );
};

