import React from 'react';

import styles from './atuhor-partner.module.css'

import SettingsTitle from "../../../../components/toolbar/settings-title/SettingsTitle";
import PartnerCard from "../../../../components/author/PartnerCard";

function SettingsPay() {
    return (
        <div className={styles.main}>
            <SettingsTitle bigTitle={'Автор Plus'} description={'Важно! ' +
                'Все данные, которые вы предоставляете, будут храниться в ' +
                'строгом соответствии с нашими правилами конфиденциальности.' +
                'Мы гарантируем безопасность и защиту вашей личной информации.'}/>
            <PartnerCard/>
        </div>
    );
}

export default SettingsPay;