import React, {useEffect, useState} from 'react';

import styles from './atuhor-partner.module.css'
import global from '../../../../global.module.css'

import SettingsTitle from "../../../../components/toolbar/settings-title/SettingsTitle";
import PartnerCard from "../../../../components/author/PartnerCard";
import {useDispatch, useSelector} from "react-redux";
import {getPartnerCard} from "../../../../redux/slices/partner";
import Button from "../../../../components/ui/buttons/button/Button";
import {useNavigate} from "react-router-dom";

function SettingsPay() {
    const [read, setRead] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {items, status} = useSelector(state=>state.partner.partnerCard);
    function partnerCardData(){
        try {
            dispatch(getPartnerCard());
        }catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if(status === 'loaded') return;
        partnerCardData();
    }, []);

    return (
        <div className={styles.main}>
            <SettingsTitle bigTitle={'Автор Plus'} description={'Важно! ' +
                'Все данные, которые вы предоставляете, будут храниться в ' +
                'строгом соответствии с нашими правилами конфиденциальности.' +
                'Мы гарантируем безопасность и защиту вашей личной информации.'}/>
            <div className={`${global.flex} ${global.f_end} ${global.gap}`}>
                <Button type={'button'} className={`${global.flex} ${global.f_center}`} variant={'outlet'}
                        click={() => setRead(!read)}>
                    {read ? 'Редактировать' : 'Отменить' }
                </Button>
                <Button type={'button'} className={`${global.flex} ${global.f_center}`} variant={'ghost'}
                        click={() => navigate('/documentation/pay')}>
                   Подробнее
                </Button>
            </div>
            <PartnerCard serverData={items} read={read}   />
        </div>
    );
}

export default SettingsPay;