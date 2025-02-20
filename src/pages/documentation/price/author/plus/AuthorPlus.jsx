import React from 'react';

import styles from '../../becomeIP/become-author-plus.module.css'

import SettingsTitle from "../../../../../components/toolbar/settings-title/SettingsTitle";
import PartnerCard from "../../../../../components/author/PartnerCard";


export default function AuthorPlus() {

    return (
        <div className={styles.documentation_main}>
            <SettingsTitle bigTitle={'Стать автором'} description={'Важно! ' +
                'Все данные, которые вы предоставляете, будут храниться в ' +
                'строгом соответствии с нашими правилами конфиденциальности.' +
                'Мы гарантируем безопасность и защиту вашей личной информации.'}/>
            <PartnerCard/>
        </div>
    );
};

