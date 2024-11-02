'use client'
import React from 'react';

import styles from './file-input.module.css'
import global from '../../../../global.module.css';
export default function InputFile({onChange, value}) {

    return (
        <div className={`${global.flex} ${global.f_dir_row}`}>
            <label className={styles.input_file}>
                <span className={value ? `${styles.input_file_text}` : `${styles.input_file_text} ${global.d3}`}>
                   {value ? value : 'Прикрепите фото или видео'}
                </span>
                <input type={"file"} name={"file"} onChange={onChange} />
                    <span className={styles.input_file_btn}>
                        Выберите файл
                    </span>
            </label>
        </div>
    );
};

