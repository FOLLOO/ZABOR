import React from 'react';
import {Link} from "react-router-dom";

import styles from './become-author-plus.module.css'
import global from '../../../../global.module.css'

import SettingsTitle from "../../../../components/toolbar/settings-title/SettingsTitle";
import SettingsBlock from "../../../../components/toolbar/settings-block/SettingsBlock";

export default function BecomeAuthorPlus() {

    function setSelection(id) {
        let target = document.getElementById(id);
        let rng, sel;
        if (document.createRange) {
            rng = document.createRange();
            rng.selectNode(target)
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(rng);
        } else {
            let rng = document.body.createTextRange();
            rng.moveToElementText(target);
            rng.select();
        }
    }

    return (
        <div className={styles.documentation_main}>
            <SettingsTitle bigTitle={'Документация - Платежи'} description={'Важно! ' +
                'Все данные, которые вы предоставляете, будут храниться в ' +
                'строгом соответствии с нашими правилами конфиденциальности.' +
                ' Мы гарантируем безопасность и защиту вашей личной информации.'}/>

            <hr/>


            <SettingsBlock title={'Почему нельзя добавить цену для публикации? '}>
                <blockquote>
                    Для того чтобы установить цену на публикацию на нашем сайте и получать заработанные средства,
                    необходимо предоставить нам платежные реквизиты через &nbsp;
                    <Link className={global.underline} to={'#КартаПартнера'}
                          onClick={() => setSelection('КартаПартнера')}>
                        карту партнера
                    </Link>.
                    Это нужно для того, чтобы мы могли корректно перевести средства, полученные за ваши публикации
                </blockquote>
            </SettingsBlock>

            <hr/>

            <SettingsBlock title={'Что такое карта партнера? '}>
                <blockquote id={'КартаПартнера'}>
                    Это документ, который содержит информацию о компании, необходимую партнерам для эффективного
                    сотрудничества.
                </blockquote>
            </SettingsBlock>

            <hr/>

            <SettingsBlock title={'Как отправить данные? '}>
                <blockquote>
                    Чтобы отправить &nbsp;
                    <Link className={global.underline} to={'#КартаПартнера'}
                          onClick={() => setSelection('КартаПартнера')}>
                        карту партнера
                    </Link>
                    , перейдите в раздел «<Link className={global.underline} to={'/settings/pay'}>Платежные
                    настройки </Link>» в вашем профиле.
                    Введите данные карты, на которую должны поступать средства.
                    Убедитесь, что указаны все необходимые данные, включая номер карты, имя владельца и другие
                    обязательные реквизиты.
                </blockquote>
            </SettingsBlock>

            <hr/>

            <SettingsBlock title={'Где будут храниться данные?'}>
                <blockquote>
                    Все данные, которые вы предоставляете, будут храниться в строгом соответствии
                    с нашими <Link className={global.underline} to={'/documentation/config'}> правилами
                    конфиденциальности</Link>.
                    Мы гарантируем безопасность и защиту вашей личной информации
                </blockquote>
            </SettingsBlock>

            <hr/>


            <SettingsBlock title={'При удалении страницы данные тоже удалятся?'}>
                <blockquote>
                    Да, при удалении страницы все ваши личные данные тоже удалятся
                </blockquote>
            </SettingsBlock>
        </div>
    );
};

