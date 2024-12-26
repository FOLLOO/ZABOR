import React from 'react';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import styles from "../../pages/documentation/price/becomeIP/become-author-plus.module.css";
import global from "../../global.module.css";

import InputDporDown from "../ui/input/input-dropdown/InputDporDown";
import Button from "../ui/buttons/button/Button";
import DataSendLoading from "../STATUS/loading/DataSendLoading";
import PartnerCardList from "./partner-card-list/PartnerCardList";

import {ORG_EMAIL} from "../../utils";
import {createPartner} from "../../redux/slices/partner";

function PartnerCard({serverData}) {

    const [partnerCard, setPartnerCard] = React.useState(serverData || {
        fullName: null,
        shortName: null,
        legalAddress: null,
        actualAddress: null,
        inn: null,
        taxationSystem: null,
        okved: null,
        ogrnip: null,
        kpp: null,
        ogrn: null,
        director: null,
        bankName: null, bic: null,
        accountNumber: null,
        correspondentAccount: null,
        email: null,
        phone: null,
        site: null,
    })

    const [value, setValue] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);


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

    const defalut = {
        header: value === 'IP' ? 'ИП' : 'OOO',
        items: [
            {
                type: 'string',
                title: 'Полное наименование',
                data_title: 'fullName',
                required: true,
                template: value === 'IP' ? 'Индивидуальный предприниматель Иванов Ян Иванович' : 'Общество с ограниченной ответственностью «Триада»'
            },
            {
                type: 'string',
                required: true,
                data_title: 'shortName',
                title: 'Краткое наименование',
                template: value === 'IP' ? 'ИП Иванов И. И.' : 'OOO «Триада»'
            },
            {
                required: true,
                type: 'string',
                data_title: 'legalAddress',
                title: 'Юридический адрес',
                template: '119048 г.Москва, ул. Усачева, 25'
            },
            {
                required: true,
                type: 'string',
                data_title: 'actualAddress',
                title: 'Фактический адрес',
                template: value === 'IP' ? 'Совпадает с юридическим' : '191040 г. Казань, ул. Военная, 18к2, строение 1, офис 403'
            },
            {
                type: 'number',
                data_title: 'inn',
                required: true,
                title: 'ИНН',
                template: 502805064090
            },
            {
                type: 'string',
                required: true,
                data_title: 'taxationSystem',
                title: 'Система налогообложения',
                template: 'УСН'
            },
            {
                type: 'string',
                required: true,
                data_title: 'okved',
                title: 'ОКВЭД',
                template: '52.10'
            },

        ],
    }
    const ip = [{
        type: 'number',
        required: true,
        data_title: 'ogrnip',
        title: 'ОГРНИП',
        template: 314505309900027
    }]
    const ooo = [
        {
            data_title: 'kpp',
            type: 'string',
            required: true,
            title: 'КПП',
            template: 314505309900027
        },
        {
            data_title: 'ogrn',
            type: 'string',
            required: true,
            title: 'ОГРН',
            template: 314505309900027
        },
        {
            type: 'string',
            data_title: 'director',
            required: true,
            title: 'Руководитель',
            template: 'Сидоров Владимир Викторович'
        }
    ]
    const bank = {
        header: 'Банковские реквизиты',
        items: [
            {
                type: 'string',
                required: true,
                data_title: 'bankName',
                title: 'Наименование банка',
                template: 'Филиал «Центральный» ПАО «Совкомбанк»'
            },
            {
                type: 'number',
                data_title: 'bic',
                title: 'БИК',
                required: true,
                template: '045004763'
            },
            {
                type: 'number',
                required: true,
                data_title: 'accountNumber',
                title: 'Расчетный счет',
                template: '40702810330000100078'
            },
            {
                type: 'number',
                data_title: 'correspondentAccount',
                required: true,
                title: 'Корреспондентский счет',
                template: '30101810150040000763'
            },
        ]
    }
    const contact = {
        header: 'Контактные данные',
        items: [
            {
                type: 'string',
                required: true,
                data_title: 'email',
                title: 'E-mail',
                template: 'superskladmsk@yandex.ru'
            },
            {
                data_title: 'phone',
                type: 'string',
                required: true,
                title: 'Контактный телефон',
                template: '+79171234567'
            }
        ]
    }
    const additional = {
        header: 'Дополнительная информация',
        items: [
            {
                data_title: 'site',
                type: 'string',
                required: false,
                title: 'Сайт (при наличии)',
                template: 'https://aimani.org/'
            },
        ],
    }

    const handleOnChange = event => {
        const { name, value } = event.target;
        setPartnerCard(prevData => ({
            ...prevData,   // Копируем все предыдущее состояние
            [name]: value  // Обновляем только нужное свойство
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await dispatch(createPartner(partnerCard));
        } catch (e) {
            console.error('Error creating partner:', e);
            setError('Ошибка при создании партнера. Пожалуйста, попробуйте еще раз.');
        } finally {
            setIsLoading(false);
            setPartnerCard({
                fullName: null,
                shortName: null,
                legalAddress: null,
                actualAddress: null,
                inn: null,
                taxationSystem: null,
                okved: null,
                ogrnip: null,
                kpp: null,
                ogrn: null,
                director: null,
                bankName: null, bic: null,
                accountNumber: null,
                correspondentAccount: null,
                email: null,
                phone: null,
                site: null,
            })

            let USS = localStorage.getItem('user');
            if(USS){
                USS = JSON.parse(USS)
                USS.roleId = 3;
                localStorage.setItem('user', JSON.stringify(USS));
            }
            window.location.reload()
            navigate('/publications')
        }
    };

    if(isLoading){
        return <DataSendLoading/>;
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
            {value ? <div className={styles.grid}>
                <div>
                    <PartnerCardList partnerCard={partnerCard} onChange={handleOnChange}
                              data={value === 'IP'
                                  ? {...defalut, items: [...defalut.items, ...ip]} // Копирование и добавление элементов
                                  : {...defalut, items: [...defalut.items, ...ooo]}}
                    />
                </div>
                <div>
                    <PartnerCardList data={bank} partnerCard={partnerCard} onChange={handleOnChange}/>
                    <PartnerCardList data={contact} partnerCard={partnerCard} onChange={handleOnChange}/>
                    {value === 'IP' ?
                        null :
                        <PartnerCardList data={additional} partnerCard={partnerCard} onChange={handleOnChange}/>}
                </div>
            </div> : null}
            <p className={`${global.red} ${global.d3}`}>{error}</p>
            <Button type={'submit'} className={`${global.flex} ${global.f_center}`} variant={'outlet'}>
                Отправить
            </Button>
        </form>
    );
}

export default PartnerCard;