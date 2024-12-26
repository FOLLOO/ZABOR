import React from 'react';
import styles from './loading.module.css'
function DataSendLoading() {
    return (
        <div className={`${styles.spinner} ${styles.center}`}>
            <div className={styles.spinner_blade}></div>
            <div className={styles.spinner_blade}></div>
            <div className={styles.spinner_blade}></div>
            <div className={styles.spinner_blade}></div>
            <div className={styles.spinner_blade}></div>
            <div className={styles.spinner_blade}></div>
            <div className={styles.spinner_blade}></div>
            <div className={styles.spinner_blade}></div>
            <div className={styles.spinner_blade}></div>
            <div className={styles.spinner_blade}></div>
            <div className={styles.spinner_blade}></div>
            <div className={styles.spinner_blade}></div>
        </div>
    );
}

export default DataSendLoading;