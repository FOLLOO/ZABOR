'use client'
import React from 'react';

import styles from './file-input.module.css'
import global from '../../../../global.module.css';
import duble from '../../../../duble.module.css'
import Button from "../../buttons/button/Button";
export default function InputFile({onChange, value, id,
}) {

    return (
        <div className={styles.fileUpload}>
            <div className={styles.buttonWidth}>
            <Button type={'button'} variant={'color'} className={global.f_center}
                    click={() => document.getElementById(`${id}`).click()}
            >{!value ? 'Выбрать фото' : 'Изменить фото'}</Button>
            </div>
            <div className={styles.imageUploadWrap}>
                <input
                    id={id}
                    className={styles.fileUploadInput}
                    type="file"
                    onChange={onChange}
                    accept="image/*"
                />
                {!value ? (
                    <div className={`${global.d1} ${duble.delete}`}>Или перетащите фото сюда</div>
                ) : null}
            </div>
                {value ? (
                    <div className={styles.fileUploadContent}>
                        <div>
                            <img className={styles.fileUploadImage} src={value} alt="image"/>
                        </div>
                    </div>
                ) : null}
        </div>
    );
};

