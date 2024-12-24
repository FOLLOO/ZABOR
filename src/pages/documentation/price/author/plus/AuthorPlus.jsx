import React from 'react';

import styles from '../../becomeIP/become-author-plus.module.css'
import SettingsTitle from "../../../../../components/toolbar/settings-title/SettingsTitle";
import global from "../../../../../global.module.css";
import InputText from "../../../../../components/ui/input/input-text/InputText";
import InputDporDown from "../../../../../components/ui/input/input-dropdown/InputDporDown";

export default function AuthorPlus() {
    const [value, setValue] = React.useState(0);

    const selectOptionItems = [
        {
            id: 1,
            title: 'ООО (Общество с ограниченной ответственностью)',
            value: 'OOO'
        },
        {
            id: 2,
            title: 'ИП (Индивидуальный предприниматель)',
            value: 'IP'
        },
    ]

    const ipDefaults = [
        {
            type: 'string',
            title: 'Полное наименование',
            template: 'Индивидуальный предприниматель Иванов Иван Иванович'
        },
        {
            type: 'string',
            title: 'Краткое наименование',
            template: 'ИП Иванов И. И.'
        },
        {
            type: 'string',
            title: 'Юридический адрес',
            template: ' 119048 г.Москва, ул. Усачева, 25'
        },
        {
            type: 'string',
            title:'Фактический адрес',
            template:'Совпадает с юридическим'
        },
        {
            type: 'string',
            title:'ИНН',
            template:502805064090
        },
        {
            type: 'string',
            title: 'ОГРНИП',
            template: 314505309900027
        },
        {
            type: 'string',
            title:'Система налогообложения',
            template:'УСН'
        },
        {
            type: 'string',
            title: 'Наименование банка',
            template: 'Филиал «Центральный» ПАО «Совкомбанк»'
        },
        {
            type: 'string',
            title:'БИК',
            template:'045004763'
        },
        {
            type: 'number',
            title: 'Расчетный счет',
            template: '40702810330000100078'
        },
        {
            type: 'number',
            title:'Корреспондентский счет',
            template:'30101810150040000763'
        },
        {
            type: 'string',
            title:'ОКВЭД',
            template:'52.10'
        },
        {
            type: 'string',
            title: 'E-mail',
            template: 'superskladmsk@yandex.ru'
        },
        {
            type: 'string',
            title: 'Контактный телефон',
            template: '+79171234567'
        }
    ]

    const OOODefaults = [
        {
            type: 'string',
            title: 'Полное наименование',
            template: 'Индивидуальный предприниматель Иванов Иван Иванович'
        },
        {
            type: 'string',
            title: 'Краткое наименование',
            template: 'ИП Иванов И. И.'
        },
        {
            type: 'string',
            title: 'Юридический адрес',
            template: ' 119048 г.Москва, ул. Усачева, 25'
        },
        {
            type: 'string',
            title:'Фактический адрес',
            template:'Совпадает с юридическим'
        },
        {
            type: 'string',
            title:'ИНН',
            template:502805064090
        },
        {
            type: 'string',
            title: 'ОГРНИП',
            template: 314505309900027
        },
        {
            type: 'string',
            title:'Система налогообложения',
            template:'УСН'
        },
        {
            type: 'string',
            title: 'Наименование банка',
            template: 'Филиал «Центральный» ПАО «Совкомбанк»'
        },
        {
            type: 'string',
            title:'БИК',
            template:'045004763'
        },
        {
            type: 'number',
            title: 'Расчетный счет',
            template: '40702810330000100078'
        },
        {
            type: 'number',
            title:'Корреспондентский счет',
            template:'30101810150040000763'
        },
        {
            type: 'string',
            title:'ОКВЭД',
            template:'52.10'
        },
        {
            type: 'string',
            title: 'E-mail',
            template: 'superskladmsk@yandex.ru'
        },
        {
            type: 'string',
            title: 'Контактный телефон',
            template: '+79171234567'
        }
    ]

    const IP = () => {
        return (
            <>
                {ipDefaults.map((item, index) => (
                    <div className={`${global.flex} ${global.f_dir_column} ${styles.gap05}`}>
                        <div className={`${global.flex} ${global.f_dir_column} ${styles.gap05}`}>
                            <p className={global.sm}>{item.title}</p>
                            <p className={global.d3}>Пример: {item.template}</p>
                        </div>
                        <InputText place={item.template} type={item.type} value={item.value} />
                    </div>
                ))}

            </>
        )
    }
    const OOO = () => {
        return (
            <>
                {ipDefaults.map((item, index) => (
                    <div className={`${global.flex} ${global.f_dir_column} ${styles.gap05}`}>
                        <div className={`${global.flex} ${global.f_dir_column} ${styles.gap05}`}>
                            <p className={global.sm}>{item.title}</p>
                            <p className={global.d3}>Пример: {item.template}</p>
                        </div>
                        <InputText place={item.template} type={item.type} value={item.value} />
                    </div>
                ))}
            </>
        )
    }

    return (
        <div className={styles.documentation_main}>
            <SettingsTitle bigTitle={'Стать автором'} description={'Важно! ' +
                'Все данные, которые вы предоставляете, будут храниться в ' +
                'строгом соответствии с нашими правилами конфиденциальности.' +
                ' Мы гарантируем безопасность и защиту вашей личной информации.'}/>

            {/*<hr/>*/}
            <form className={styles.form}>

                <InputDporDown text={'Тип'} data={selectOptionItems} onChange={(e) => setValue(e.target.value)}/>

                {value === 'OOO' ? <OOO/> : value === 'IP' ? <IP/> : null}
            </form>
        </div>
    );
};

