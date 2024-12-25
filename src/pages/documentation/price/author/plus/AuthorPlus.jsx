import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import styles from '../../becomeIP/become-author-plus.module.css'
import global from "../../../../../global.module.css";

import SettingsTitle from "../../../../../components/toolbar/settings-title/SettingsTitle";
import InputText from "../../../../../components/ui/input/input-text/InputText";
import InputDporDown from "../../../../../components/ui/input/input-dropdown/InputDporDown";
import {ORG_EMAIL} from "../../../../../utils";
import Button from "../../../../../components/ui/buttons/button/Button";

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
            header: 'ИП',
            items: [
                {
                    type: 'string',
                    title: 'Полное наименование',
                    required: true,
                    template: 'Индивидуальный предприниматель Иванов Ян Иванович'
                },
                {
                    type: 'string',
                    required: true,
                    title: 'Краткое наименование',
                    template: 'ИП Иванов И. И.'
                },
                {
                    required: true,
                    type: 'string',
                    title: 'Юридический адрес',
                    template: ' 119048 г.Москва, ул. Усачева, 25'
                },
                {
                    required: true,
                    type: 'string',
                    title: 'Фактический адрес',
                    template: 'Совпадает с юридическим'
                },
                {
                    type: 'number',
                    required: true,
                    title: 'ИНН',
                    template: 502805064090
                },
                {
                    type: 'string',
                    required: true,
                    title: 'Система налогообложения',
                    template: 'УСН'
                },
                {
                    type: 'string',
                    required: true,
                    title: 'ОКВЭД',
                    template: '52.10'
                },
                {
                    type: 'number',
                    required: true,
                    title: 'ОГРНИП',
                    template: 314505309900027
                },
            ],
        },
        {
            header: 'Банковские реквизиты',
            items: [
                {
                    type: 'string',
                    required: true,
                    title: 'Наименование банка',
                    template: 'Филиал «Центральный» ПАО «Совкомбанк»'
                },
                {
                    type: 'number',
                    title: 'БИК',
                    required: true,
                    template: '045004763'
                },
                {
                    type: 'number',
                    required: true,
                    title: 'Расчетный счет',
                    template: '40702810330000100078'
                },
                {
                    type: 'number',
                    required: true,
                    title: 'Корреспондентский счет',
                    template: '30101810150040000763'
                },
                {
                    header: 'Контактные данные',
                    items: [
                        {
                            type: 'string',
                            required: true,
                            title: 'E-mail',
                            template: 'superskladmsk@yandex.ru'
                        },
                        {
                            type: 'string',
                            required: true,
                            title: 'Контактный телефон',
                            template: '+79171234567'
                        }
                    ]
                }

            ]
        },
    ]

    const OOODefaults = [
        {
            header: 'ООО',
            items: [
                {
                    type: 'string',
                    required: true,
                    title: 'Полное наименование',
                    template: 'Общество с ограниченной ответственностью «Триада»'
                },
                {
                    type: 'string',
                    title: 'Краткое наименование',
                    required: true,
                    template: 'ООО «Триада»'
                },
                {
                    type: 'string',
                    required: true,
                    title: 'Юридический адрес',
                    template: '192241 г. Санкт-Петербург, ул. Белы Куна, 15'
                },
                {
                    type: 'string',
                    required: true,
                    title: 'Фактический адрес',
                    template: '191040 г. Казань, ул. Военная, 18к2, строение 1, офис 403'
                },
                {
                    type: 'number',
                    required: true,
                    title: 'ИНН',
                    template: 502805064090
                },
                {
                    type: 'string',
                    required: true,
                    title: 'Система налогообложения',
                    template: 'УСН'
                },
                {
                    type: 'string',
                    required: true,
                    title: 'ОКВЭД',
                    template: '33.13'
                },
                {
                    type: 'string',
                    required: true,
                    title: 'КПП',
                    template: 314505309900027
                },
                {
                    type: 'string',
                    required: true,
                    title: 'ОГРН',
                    template: 314505309900027
                },
                {
                    type: 'string',
                    required: true,
                    title: 'Руководитель',
                    template: 'Сидоров Владимир Викторович'
                }
            ],
        },
        {
            header: 'Банковские реквизиты',
            items: [
                {
                    type: 'string',
                    required: true,
                    title: 'Наименование банка',
                    template: 'Филиал «Центральный» ПАО «Совкомбанк»'
                },
                {
                    type: 'number',
                    required: true,
                    title: 'БИК',
                    template: '045004763'
                },
                {
                    type: 'number',
                    required: true,
                    title: 'Расчетный счет',
                    template: '40702810330000100078'
                },
                {
                    type: 'number',
                    required: true,
                    title: 'Корреспондентский счет',
                    template: '30101810150040000763'
                },
                {
                    header: 'Контакты данные',
                    items: [
                        {
                            type: 'string',
                            required: true,
                            title: 'E-mail',
                            template: 'superskladmsk@yandex.ru'
                        },

                        {
                            type: 'string',
                            title: 'Контактный телефон',
                            required: true,
                            template: '+79171234567'
                        }
                    ],
                },
                {
                    header: 'Дополнительная информация',
                    items: [
                        {
                            type: 'string',
                            required: false,
                            title: 'Сайт (при наличии)',
                            template: 'https://aimani.org/'
                        },
                    ],
                },
            ],
        },
    ]

    const [data, setData] = useState( [
       {
           table: 'base',
           header: value === 'IP' ? 'ИП' : value === 'OOO' ? 'OOO' : null,
           items: [
               {
                   type: 'string',
                   required: true,
                   title: 'Полное наименование',
                   template: value === 'OOO' ? 'Общество с ограниченной ответственностью «Триада»'
                       : 'Индивидуальный предприниматель Иванов Ян Иванович' ,
                   data_title: 'fullName',
                   content: null
               },
               {
                   type: 'string',
                   title: 'Краткое наименование',
                   required: true,
                   template: value === 'OOO' ? 'ООО «Триада»'
                   : 'ИП Иванов И.И.',
                   data_title: 'shortName',
                   content: null
               },
               {
                   type: 'string',
                   required: true,
                   title: 'Юридический адрес',
                   template: '192241 г. Санкт-Петербург, ул. Белы Куна, 15',
                   data_title: 'legalAddress',
                   content: null
               },
               {
                   type: 'string',
                   required: true,
                   title: 'Фактический адрес',
                   template: value === 'OOO' ? '191040 г. Казань, ул. Военная, 18к2, строение 1, офис 403' : 'Совпадает с юридическим',
                   data_title: 'actualAddress',
                   content: null
               },
               {
                   type: 'number',
                   required: true,
                   title: 'ИНН',
                   template: 502805064090,
                   data_title: 'inn',
                   content: null
               },
               {
                   type: 'string',
                   required: true,
                   title: 'Система налогообложения',
                   template: 'УСН',
                   data_title: 'taxationSystem',
                   content: null
               },
               {
                   type: 'string',
                   required: true,
                   title: 'ОКВЭД',
                   template: '33.13',
                   data_title: 'okved',
                   content: null
               },
               {
                   type: 'string',
                   required: true,
                   title: 'ОГРНИП',
                   template: 314505309900027,
                   data_title: 'ogrnip',
                   content: null
               },
               {
                   type: 'string',
                   required: true,
                   title: 'КПП',
                   template: 314505309900027,
                   data_title: 'kpp',
                   content: null
               },
               {
                   type: 'string',
                   required: true,
                   title: 'ОГРН',
                   template: 314505309900027,
                   data_title: 'ogrn',
                   content: null
               },
               {
                   type: 'string',
                   required: true,
                   title: 'Руководитель',
                   template: 'Сидоров Владимир Викторович',
                   data_title: 'director',
                   content: null
               }
           ],
       },
       {
           table: 'bank',
           header: 'Банковские реквизиты',
           items: [
               {
                   type: 'string',
                   required: true,
                   title: 'Наименование банка',
                   template: 'Филиал «Центральный» ПАО «Совкомбанк»',
                   data_title: 'bankName',
                   content: null
               },
               {
                   type: 'number',
                   required: true,
                   title: 'БИК',
                   template: '045004763',
                   data_title: 'bic',
                   content: null
               },
               {
                   type: 'number',
                   required: true,
                   title: 'Расчетный счет',
                   template: '40702810330000100078',
                   data_title: 'accountNumber',
                   content: null
               },
               {
                   type: 'number',
                   required: true,
                   title: 'Корреспондентский счет',
                   template: '30101810150040000763',
                   data_title: 'correspondentAccount',
                   content: null
               },
           ],
       },
       {
           table: 'contacts',
           header: 'Контакты данные',
           items: [
               {
                   type: 'string',
                   required: true,
                   title: 'E-mail', // bigIndex 1 littleIndex 4 smIndex 0
                                    // bigIndex 2 littleIndex 0
                   template: 'superskladmsk@yandex.ru',
                   data_title: 'email',
                   content: null
               },
               {
                   type: 'string',
                   title: 'Контактный телефон', // bigIndex 1 littleIndex 4 smIndex 1
                                                // bigIndex 2 littleIndex 1
                   required: true,
                   template: '+79171234567',
                   data_title: 'phone',
                   content: null
               }
           ],
       },
       {
           table: 'additional',
           header: 'Дополнительная информация',
           items: [
               {
                   type: 'string',
                   required: false,
                   title: 'Сайт (при наличии)',
                   template: 'https://aimani.org/',
                   data_title: 'site',
                   content: null
               },
           ],
       },
   ])

    //  todo: Class

    const ListData = () => {

        const bem = value === 'IP' ? ipDefaults : value === 'OOO' ? OOODefaults : [];

        return (
            <div className={styles.grid}>
                {bem.map((item, bigIndex) => (
                    <div className={styles.list}>
                        <h5 className={styles.titleplus}>
                            {item.header}
                        </h5>
                        {item.items.map((item, littleIndex) => (
                            item.header ?
                                <div className={styles.list}>
                                    <h5 className={styles.titleplus}>
                                        {item.header}
                                    </h5>
                                    {item.items.map((item, smIndex) => (
                                        <div className={`${global.flex} ${global.f_dir_column} ${styles.gap05}`}>
                                            <div className={`${global.flex} ${global.f_dir_column} ${styles.gap05}`}>
                                                <p className={global.sm}>{item.title}</p>
                                                <p className={global.d3}>Пример: {item.template}</p>
                                            </div>
                                            <InputText required={item.required} place={item.template} type={item.type}
                                                       value={item.value}
                                                       // value={data[littleIndex - (bigIndex + 1)].items[smIndex].content}
                                                       // onChange={(e) => {
                                                       //     const temp = [...data];
                                                       //     temp[littleIndex - (bigIndex + 1)].items[smIndex].content = e.target.value;
                                                       //     setData(temp);
                                                       // }}
                                                       // onChange={(e) => handleChange(e, littleIndex - (bigIndex + 1), smIndex)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                :
                                <div className={`${global.flex} ${global.f_dir_column} ${styles.gap05}`}>
                                    <div className={`${global.flex} ${global.f_dir_column} ${styles.gap05}`}>
                                        <p className={global.sm}>{item.title}</p>
                                        <p className={global.d3}>Пример: {item.template}</p>
                                    </div>
                                    <InputText
                                        required={item.required}
                                        place={item.template}
                                        type={item.type} value={item.value}/>
                                </div>
                        ))}
                    </div>
                ))}
            </div>
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

                <h4 className={styles.titleplus}>
                    Карта партера
                </h4>
                <div className={styles.grid}>

                <InputDporDown text={'Тип'} data={selectOptionItems}
                               onChange={(e) => setValue(e.target.value)}/>
                    <></>
                </div>

                <p className={styles.block}>
                    Заполните и отправьте данные карты партера, как только будет проверено,
                    ответ будет выслан вам на электронную почту, указанную в разделе "Контактные данные".
                    Наша почта для обратной связи <Link className={global.underline}
                                                        to={`mailto:${ORG_EMAIL}`}> {ORG_EMAIL} </Link>
                </p>

                <ListData/>

                <Button type={'submit'} className={`${global.flex} ${global.f_center}`} variant={'outlet'}>
                    Отправить
                </Button>
            </form>
        </div>
    );
};

