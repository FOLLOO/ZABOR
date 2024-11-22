import React from 'react'
import {useNavigate} from 'react-router-dom'

// css
import styles from './main.module.css'
import global from '../../../global.module.css'

// media
import videoo from '../../../asserts/video/infinty.mp4'

//components
import GlassBox from '../../../components/glasses/glasses-box/GlassBox'
import Button from "../../../components/ui/buttons/button/Button";
import Footer from "../../../components/layout/footer/Footer";

//DATA_CONST
const opportunities = [
    {
        number: '1.',
        title: 'Публикуйте посты',
        description: 'Зарабатывайте с каждой публикации'
    },
    {
        number: '2.',
        title: 'Закрытые публикации',
        description: 'Зарабатывайте с каждой публикации'
    },
    {
        number: '3.',
        title: 'Следите за статистикой',
        description: 'Зарабатывайте с каждой публикации'
    },
    {
        number: '4.',
        title: 'Общайтесь с аудиторией',
        description: 'Зарабатывайте с каждой публикации'
    }
]
const getStart = [
    {
        title: 'Зарегистрируйся',
        description: ' Если вы не пройдете регистрацию ' +
            'в ближайшие 30 секунд, мы будем вынуждены применить' +
            ' крайние меры!😇 Иначе весь отдел разработки будет плакать 😖'
    },
    {
        title: 'Заполни свою страницу',
        description: ' Нет-нет, дорогие мои!😇 ' +
            'Регистрация - это лишь первый шаг. Теперь вам' +
            ' необходимо заполнить ваши профили на ZABOR до ' +
            'последней запятой! Иначе что скажут ваши подписчики? 😯'
    },
    {
        title: 'Выложи свой первый пост',
        description: 'Просто я искренне желаю, чтобы ваше творчество нашло отклик в ' +
            'сердцах читателей.🤗 А для этого вам необходимо начать делиться ' +
            'своими идеями, мыслями и вдохновением на страницах HOLA! Вы уже стали ' +
            'ценным пользователем для нашего отдела 💞️'
    },
    {
        title: 'Зарегистрируйся',
        description: 'Поделитесь с миром этой замечательной новостью! Пусть ' +
            'ваши друзья и подписчики знают,' +
            ' что вы стали частью уникального сообщества авторов и блогеров. 🙌'
    },
]
function Main() {

    const navigate = useNavigate()

    return (
        <div className={styles.back}>
            <div className={styles.title}>
                <h2>ZABOR</h2>
            </div>
            <video className={styles.video} loop autoPlay muted>
                <source src={videoo} type="video/mp4"/>
            </video>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>Чем мы занимаемся?</h1>
                    <p className={global.xl}>На нашем сайте мы, безусловно,<br/> помогаем авторам раскрыть свой
                        потенциал</p>
                </div>

                <div className={`${global.flex} ${global.f_center} ${styles.navigation}`}>
                    <Button variant={'color'}>
                        Начать
                    </Button>
                    <Button variant={'outlet'} onClick={navigate}>
                        Подробнее
                    </Button>
                </div>

                <div className={`${global.flex}  ${styles.about}`}>
                    <div className={styles.leftTitle}>
                        <h2>Возможности  сайта</h2>
                        <p className={global.base}>На нашем сайте мы, безусловно,<br/> помогаем авторам раскрыть свой
                            потенциал</p>
                    </div>

                    <div className={styles.grid}>
                        {opportunities.map((opport) => (
                            <GlassBox>
                                <div className={styles.actions}>
                                    <h1 className={`${global.medium} ${styles.header}`}>{opport.number}</h1>
                                    <p className={`${global.medium} ${styles.littleHeader}`}>
                                        {opport.title}
                                    </p>
                                    <p className={styles.description}>
                                        {opport.description}
                                    </p>
                                </div>
                            </GlassBox>
                        ))}
                    </div>
                </div>

                <div className={styles.centerLittle}>
                    <h2>Как начать?</h2>
                    <p className={global.base}>Главное ведь начать, а дальше положитесь на нас!</p>
                </div>

                <div className={`${styles.grid} ${styles.container}`}>
                    {getStart.map((start, i) => (
                            <div className={styles.form}>
                                <div className={`${styles.round}`}>
                                    {i + 1}
                                </div>
                                <h2 className={`${global.xl3} ${global.medium}`} >{start.title}</h2>
                                <p className={styles.littleHeader}>
                                    {start.description}
                                </p>
                            </div>
                        ))}
                </div>

                <Button variant={'outlet'} onClick={navigate} size={'xl2'}>
                    Пройти регистрацию
                </Button>
            </div>
            <Footer/>
        </div>
    )
}

export default Main