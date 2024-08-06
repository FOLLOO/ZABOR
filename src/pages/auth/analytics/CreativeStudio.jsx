import React from 'react';
import styles from './creative-studio.module.css';
import global from '../../../global.module.css';
import BackCreate from "../../../components/toolbar/backCreate-toolbar/BackCreate";
import SettingsTitle from "../../../components/toolbar/settings-title/SettingsTitle";
import ActionCard from "../../../components/settings/ActionCard/ActionCard";
import CardDefault from "../../../components/post/post-cards/card-default/CardDefault";
import {useNavigate} from "react-router-dom";
import Notification from "../../../components/notifications/Notification";
import ContextGroup from "../../../components/context-drop/context-group/ContextGroup";


function CreativeStudio(props) {
    const navigate = useNavigate();
    return (
        <div className={`${global.padLeft}`}>
            <BackCreate/>
            <SettingsTitle bigTitle={'Панель управления'}
                           description={'Следите за аналитикой на вашей старнице автора'}
            />
            <div className={`${styles.grid}`}>
                <div className={`${styles.column}`}>
                    <ActionCard title={'Последняя публикация'} click_nav={() => navigate('/')}>
                        <CardDefault/>
                    </ActionCard>
                    <ActionCard title={'Опрубликованные посты'} back
                                click_nav={() => navigate('/')}>
                        <Notification/>
                        <Notification/>
                        <Notification/>
                        <Notification/>
                        <Notification/>
                    </ActionCard>
                </div>
                <div className={`${styles.column}`}>
                    <ActionCard back title={'Аналитика'} click_nav={() => navigate('/')}>
                        <ContextGroup>
                            <div className={`${global.flex} ${global.f_a_center} ${global.f_s_between}`}>
                                <h5>
                                    Число подписчиков
                                </h5>
                                <h1>
                                    10K
                                </h1>
                            </div>
                            <div className={`${global.flex} ${global.f_a_center} ${global.f_s_between}`}>
                                <h5>
                                    Количество купленных <br/> постов за все время
                                </h5>
                                <h1>
                                    100K
                                </h1>
                            </div>
                        </ContextGroup>
                        <ContextGroup>
                            <h4>Лучшее видео</h4>
                            <div className={`${global.d3}`}>
                                За последние 28 дней
                            </div>
                        </ContextGroup>
                        <ContextGroup noafter>
                            <Notification />
                            <Notification />
                        </ContextGroup>
                    </ActionCard>

                    <ActionCard title={'Последние комментарии'} back
                                click_nav={() => navigate('/')}>
                        <Notification type={'com-post'}/>
                        <Notification type={'com-post'}/>
                        <Notification type={'com-post'}/>
                        <Notification type={'com-post'}/>
                        <Notification type={'com-post'}/>
                    </ActionCard>
                </div>
                <div className={`${styles.column}`}>
                    <ActionCard title={'Доход'} back click_nav={() => navigate('/')}>
                        <div className={`${global.flex} ${global.f_a_center} ${global.f_s_between}`}>
                            <h5>
                                За все время
                            </h5>
                            <h1>
                                10K
                            </h1>
                        </div>
                        <div className={`${global.flex} ${global.f_a_center} ${global.f_s_between}`}>
                            <h5>
                                За все месяц
                            </h5>
                            <h1>
                                10K
                            </h1>
                        </div>
                        <div className={`${global.flex} ${global.f_a_center} ${global.f_s_between}`}>
                            <h5>
                                За все день
                            </h5>
                            <h1>
                                10K
                            </h1>
                        </div>
                    </ActionCard>

                    <ActionCard title={'Новости'} click_nav={() => navigate('/')}>
                        <CardDefault/>
                    </ActionCard>
                </div>
            </div>
        </div>
    );
}

export default CreativeStudio;