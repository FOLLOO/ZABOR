import React from 'react';
import server from '../../asserts/loading/serverError.jpg'
import styles from './server.module.css';
function ServerError() {
    return (
        <div className={styles.main}>
            <div className={styles.image}>
            <img src={server} alt="Server Error" />
            </div>
            <h4 className={styles.title}>500 Server Error</h4>
            <p className={styles.description}>
                Ошибка 500 (Internal Server Error) — это когда сайт упал и
                пока его никто не смог поднять. Вообще, все ошибки, коды которых
                начинаются с пятёрки, указывают на вину разработчиков.
            </p>
        </div>
    );
}

export default ServerError;