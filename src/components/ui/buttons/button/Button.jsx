'use client'
import React from 'react';

import styles from './button.module.css'
import global from '../../../../global.module.css'

/**
 *
 * @param children
 * @param click
 * @param img
 * @param id
 * @param text_id
 * @param name
 * @param disabled
 * @param componentImage
 * @param form
 * @param className
 * @param title
 * @param dataIndex
 * @param key
 * @param type
 * @param size
 * @param img_size
 * @param variant
 * @returns {Element}
 * @constructor
 * variant - ghost, color, base, default, outlet
 */
export default function Button({
                                   children, click, img, id, text_id, name, disabled, componentImage,
                                   form, className, title, dataIndex,
                                   type, size = 'base', img_size = 'base', variant= 'default'
                               }) {
    return (
       <button className={`${styles.button} ${styles[img_size]} ${styles[variant]} ${className}`}
               title={title}
               disabled={disabled}
               name={name}
               id={id}
               data-index={dataIndex}
               type={type} form={form} onClick={click}>
           {img && componentImage ? img : img ?
               <img src={img} alt={'.'} className={`${global[img_size]}`}/> : null}
           <span id={text_id} className={`${global[size]} ${global.medium} ${styles.text}`}
           > {children} </span>
       </button>
    );
};

