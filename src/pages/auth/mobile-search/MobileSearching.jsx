import React from 'react';
import styles from './mobile-search.module.css';
import Search from "../../../components/layout/search/Search";
function MobileSearching() {
    return (
        <div className={styles.main}>
            <Search main/>
        </div>
    );
}

export default MobileSearching;