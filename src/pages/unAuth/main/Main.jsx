import React from 'react'
import GlassCard from '../../../components/glasses/glasses-card/GlassCard'

// css
import styles from './main.module.css'
import global from '../../../global.module.css'

// media
import videoo from '../../../asserts/video/HOLA.mp4'

import video_i from '../../../asserts/icons/Видео.svg'
import image from '../../../asserts/icons/Изображение.svg'
import book from '../../../asserts/icons/Книга.svg'
import file from '../../../asserts/icons/Файл.svg'
import course from '../../../asserts/icons/Курсы.svg'
import text from '../../../asserts/icons/Текст.svg'
import link from '../../../asserts/icons/Link.svg'
import GlassBox from '../../../components/glasses/glasses-box/GlassBox'



function Main (props) {
  return (
    <>
      <video className={styles.video} loop autoPlay muted>
        <source src={videoo} type="video/mp4"/>
      </video>
  <div className={styles.back}>
      <div className={styles.title}>
        <h6>Что мы предлагаем?</h6>
        <p>Помочь авторам раскрыть свой
          <br/> потенциал</p>
      </div>

      <div className={`${global.grid} ${styles.grid}`}>
        <div className={styles.column}>
          <div className={styles.row}>
            <GlassCard>
              <div className={`${global.flex} ${global.f_dir_column} ${global.h100}`} style={{padding: "20px"}}>
                <div className={`${global.h100} ${styles.logo}`}>
                  <h3>
                    Выкладывай контент в удобной форме
                  </h3>
                </div>
                <div className={`${global.flex} ${global.h100} ${global.f_center}`}>
                  <ul>
                    <li> <img src={image} alt={'img'}/> Изображения</li>
                    <li> <img src={file} alt={'img'}/> Файлы</li>
                    <li> <img src={book} alt={'img'}/> Книги</li>
                  </ul>
                  <ul>
                    <li> <img src={video_i} alt={'img'}/> Видео</li>
                    <li> <img src={text} alt={'img'}/> Новости</li>
                    <li> <img src={course} alt={'img'}/> Курсы</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
          <div className={styles.row}>
            <GlassCard>
              <div className={`${styles.logo}`}>
                <div
                  className={`${global.flex} ${global.f_ji_center} ${global.f_center} ${global.f_a_center} ${global.h100}`}>
                  <h3>
                    Смотри свою статистику
                  </h3>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
        <div className={`${styles.column} ${styles.center_col}`}>
          <div className={`${styles.row} ${global.h100}`}>
            <GlassCard>
              <div className={`${styles.logo}`}>
                <div
                  className={`${global.flex} ${global.f_ji_center} ${global.f_center} ${global.f_a_center} ${global.h100}`}>
                  <h2>
                    {/*naZAБORe*/}
                    ZAБOR <br/>
                    O &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <br/>
                    V &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  </h2>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <GlassCard>
              <div className={`${global.flex} ${global.f_dir_column} ${global.h100}`} style={{padding: "20px"}}>
                <div className={`${global.h100} ${styles.logo}`}>
                  <h3>
                    Создавай несколько уровней подписок //Иправить//
                  </h3>
                </div>
                <div className={`${global.flex} ${global.h100} ${global.f_center}`}>
                  <ul>
                    <li> 1 Уровень</li>
                    <li> 2 Уровень</li>
                    <li> 3 Уровень</li>
                  </ul>
                  <ul>
                    <li> 100 Исправить</li>
                    <li> 100 Исправить</li>
                    <li> 100 Исправить</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
          <div className={`${styles.row} ${styles.row2}`}>
            <GlassCard>
              <div className={`${styles.logo}`}>
                <div
                  className={`${global.flex} ${global.f_ji_center} ${global.f_center} ${global.f_a_center} ${global.h100}`}>
                  <h3>
                    Общайся с аудиторией
                  </h3>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

    <div className={styles.title}>
      <h6>Как начать?</h6>
    </div>


      <div className={styles.howITwork}>
        <div className={`${global.flex} ${styles.howITworkFlex}`}>
          <GlassBox>
            <div className={` ${styles.i_glassBox}
            ${global.flex} ${global.f_dir_column} ${global.f_center} ${global.f_a_center}`}>
              <h1>01</h1>
              <h3>Зарегестрируйся</h3>
              <div className={`${global.d1} ${styles.description}`}>
                Если вы не пройдете регистрацию в ближайшие 30 секунд,<br/>
                мы будем вынуждены применить крайние меры!😇 <br/>
                <br/>
                Иначе весь отдел разработки будет плакать 😖
              </div>
            </div>
          </GlassBox>

          <GlassBox>
            <div className={` ${styles.i_glassBox}
            ${global.flex} ${global.f_dir_column} ${global.f_center} ${global.f_a_center}`}>
              <h1>02</h1>
              <h3>Заполни свою страницу</h3>
              <div className={`${global.d1} ${styles.description}`}>
                Нет-нет, дорогие мои!😇 <br/>
                Регистрация - это лишь первый шаг. Теперь вам необходимо заполнить ваши профили на HOLA до последней запятой!<br/>
                <br/>
                Иначе что скажут ваши подписчики? 😯
              </div>
            </div>
          </GlassBox>

          <GlassBox>
            <div className={` ${styles.i_glassBox}
            ${global.flex} ${global.f_dir_column} ${global.f_center} ${global.f_a_center}`}>
              <h1>03</h1>
              <h3>Выложи свой первый пост</h3>
              <div className={`${global.d1} ${styles.description}`}>
                Просто я искренне желаю, чтобы ваше творчество нашло отклик в сердцах читателей.🤗 А для этого вам необходимо начать делиться своими идеями, мыслями и вдохновением на страницах HOLA!
                <br/><br/>
                Вы уже стали ценным пользователем для нашего отдела 💞️
              </div>
            </div>
          </GlassBox>
        </div>

        <div className={styles.lastDescription}>
        <GlassBox>
          <div className={` ${styles.glassBox}
            ${global.flex} ${global.f_dir_column} ${global.f_center} ${global.f_a_center}`}>
            <h1>03</h1>
            <h3>Выложи свой первый пост</h3>
            <div className={`${global.d1} ${styles.descriptionLast}`}>
              Просто я искренне желаю, чтобы ваше творчество нашло отклик в сердцах читателей.🤗 А для этого вам необходимо начать делиться своими идеями, мыслями и вдохновением на страницах HOLA!
              <br/><br/>
              Вы уже стали ценным пользователем для нашего отдела 💞️
            </div>
          </div>
        </GlassBox>
        </div>
      </div>


      <div className={styles.registration}>
        <GlassCard>
          <div className={`${global.flex} ${global.f_center} ${global.f_ji_center} ${styles.register}`} style={{padding: "60px"}}>
            <h2>Пройти регистрацию</h2>
            <img src={link} alt={'link'}/>
          </div>
        </GlassCard>
      </div>

    <div className={styles.registration}>
      <GlassCard>
        <div className={`${global.flex} ${global.f_center} ${global.f_ji_center} ${styles.register}`} style={{padding: "60px"}}>
          <h2>Посмотреть посты пользователей</h2>
          <img src={link} alt={'link'}/>
        </div>
      </GlassCard>
    </div>

  </div>
    </>
  )
}

export default Main