import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'

// css
import styles from './main.module.css'
import global from '../../../global.module.css'

// media
import videoo from '../../../asserts/video/infinty.mp4'
import logo from '../../../logo.svg'

import temp from '../../../asserts/temp/people-doing-outdoor-training.jpg'
import publications from '../../../asserts/main/publications.png'
import user from '../../../asserts/main/user.png'
//components
import GlassBox from '../../../components/glasses/glasses-box/GlassBox'
import Button from "../../../components/ui/buttons/button/Button";
import Footer from "../../../components/layout/footer/Footer";
import {Helmet} from "react-helmet";
import {FULL_TITLE, TITLE} from "../../../utils";

//DATA_CONST
const opportunities = [
    {
        number: '1.',
        title: 'Публикуйте посты',
        description: 'Зарабатывайте с каждой публикации '
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
        id: 1001,
        title: 'Зарегистрируйся',
        description: 'Если вы не пройдете регистрацию ' +
            'в ближайшие 30 секунд, мы будем вынуждены применить' +
            ' крайние меры'
    },
    {
        id: 1002,
        title: 'Заполни свою страницу',
        description: 'Регистрация - это лишь первый шаг. Теперь вам' +
            ' необходимо заполнить ваши профили на ZABOR до ' +
            'последней запятой!'
    },
    {
        id: 1003,
        title: 'Выложи свой первый пост',
        description: 'Просто я искренне желаю, чтобы ваше творчество нашло отклик в ' +
            'сердцах читателей.'
    },
    {
        id: 1004,
        title: 'Расскажи об этом',
        description: 'Пусть ваши друзья и подписчики знают, что вы стали частью уникального сообщества '
    },
]
const images = [
    temp,
    publications,
    user,
]
function Main() {

    const navigate = useNavigate()
    const [image, setImage] = useState(0)

    function handleChangeImage(param) {
        if(param === 'dec'){
            setImage(image - 1)
        }else{
            setImage(image + 1)
        }
    }

    return (
        <div className={styles.back}>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{FULL_TITLE}</title>
                <meta name="description" content="Раскройте ваш творческий потенциал и поделитесь уникальными историями с миром! На нашем сайте мы, безусловно, помогаем авторам раскрыть свой потенциал"/>
                <meta name="keywords" content="HTML, CSS, JavaScript"/>
                <meta name="author" content="Sairommef"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>
            <video className={styles.video} loop autoPlay muted>
                <source src={videoo} type="video/mp4"/>
            </video>
            <div className={styles.content}>
                <div className={`${styles.logoBlock} `}>
                    <img src={logo} alt="" className={styles.logo}/>
                    <h3 className={`${global.xl3} ${global.bold}`}>{TITLE}</h3>
                </div>
                <div className={styles.title}>
                    <h1 className={`${global.xl7} ${global.bold}`}>Привет, это {FULL_TITLE.toUpperCase()}</h1>
                    <p className={global.xl}>
                        Раскройте ваш творческий потенциал и поделитесь <br/> уникальными историями с миром!
                    </p>
                </div>

                <div className={`${global.flex} ${global.f_center} ${styles.navigation}`}>
                    <a href={'#start'}>
                        <Button variant={'color'}>
                            Начать
                        </Button>
                    </a>

                    <a href={'#about'}>
                        <Button variant={'outlet'}>
                            Подробнее
                        </Button>
                    </a>
                </div>

                <div className={`${global.flex}  ${styles.about}`} id={'about'}>
                    <div className={styles.leftTitle}>
                        <h1 className={`${global.xl7} ${global.bold}`}>Подробнее о нас</h1>
                        <p className={global.base}>На нашем сайте мы, безусловно,<br/> помогаем авторам раскрыть свой
                            потенциал</p>
                    </div>

                    <div className={styles.slider}>
                        <div className={styles.slider_content}>
                            <div className={styles.image}>
                                <img id={styles.sliter_image} src={images[image]} alt="Slide Image"/>
                            </div>
                        </div>
                        <div className={`${global.flex} ${styles.buttons}`}>
                            <Button variant={'outlet'}
                                    click={() => handleChangeImage('dec')} disabled={image === 0}>
                                &#10094;
                            </Button>
                            <Button variant={'outlet'} click={() => handleChangeImage('inc')} disabled={image === images.length - 1}>
                                &#10095;
                            </Button>
                        </div>
                    </div>
                </div>


                <div className={`${global.flex}  ${styles.about}`}>
                    <div className={styles.leftTitle}>
                        <h2 className={global.xl7}>Возможности сайта</h2>
                        <p className={global.base}>На нашем сайте мы, безусловно,<br/> помогаем авторам раскрыть свой
                            потенциал</p>
                    </div>

                    <div className={styles.grid}>
                        {opportunities.map((opport, index) => (
                            <GlassBox key={index}>
                                <div className={styles.dep}>
                                    <h1 className={`${global.medium} ${styles.header}`}>+</h1>
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

                <div className={styles.centerLittle} id={'start'}>
                    <h1 className={`${global.xl7} ${global.bold}`}>Как начать?</h1>
                    <p className={global.base}>Главное ведь начать, а дальше положитесь на нас!</p>
                </div>

                <div className={`${styles.flex} ${styles.container}`}>
                    {getStart.map((start, i) => (
                        <GlassBox key={i}>
                            {/*<img /> Илюстрируещее изображение */}
                            <input type="checkbox" className={styles.checkbox} onChange={() => console.log('checked')}
                                   id={start.id}/>
                            <label className={styles.actions} htmlFor={start.id}>
                                <h1 className={`${global.medium} ${styles.header}`}>{i + 1}.</h1>
                                <p className={`${global.medium} ${styles.littleHeader}`}>
                                    {start.title}
                                </p>
                                <p className={styles.description}>
                                    {start.description}
                                </p>
                            </label>
                        </GlassBox>
                    ))}
                </div>

                <Button variant={'color'} click={() => navigate('/registration')}>
                    Пройти регистрацию
                </Button>
            </div>
            <Footer/>
        </div>
    )
}

export default Main