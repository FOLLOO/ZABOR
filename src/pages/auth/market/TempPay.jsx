import React from 'react';
import styles from './market.module.css'

import SettingsTitle from "../../../components/toolbar/settings-title/SettingsTitle";
import Button from "../../../components/ui/buttons/button/Button";
import fire from "../../../asserts/emoji/Fire.svg";
import global from "../../../global.module.css";
import axios from "../../../r-axios/axios";
import {SITE_URL} from "../../../utils";
function TempPay() {

    async function Pay(){
        // let cot = [];
        // cartItems.items.map(item => cot.push(item.id))
        //
        let tID = localStorage.getItem("transaction")

        const data = {
            ID: Number(tID),
            transaction: true,
        }

        try{
            const response = await axios.post(`/pay/transaction/temp`, data );
            if(response){
                window.open(response.data?.url)
            } // Возвращаем данные из ответа
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.main}>
                <SettingsTitle bigTitle={'Оплатить'}/>
            <Button img={fire} img_size={'h-5'} click={() => Pay()}
                    variant={'outlet'} className={`${global.f_center}`}>
                Оплатить
            </Button>
        </div>
    );
}

export default TempPay;