import React from 'react'

import styles from './my-subscribe-settings.module.css'

import temp from '../../../../asserts/temp/2.jpg'

import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SettingsTitle from '../../../../components/toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../../../components/toolbar/settings-block/SettingsBlock'
import ProfileCard from '../../../../components/profile/profile-card/ProfileCard'
import Search from '../../../../components/layout/search/Search'

function MySubscribeSettings ({}) {
  return (
    <div className={styles.main}>
      <BackCreate sticky/>
      <SettingsTitle bigTitle={'Мой подписки'} description={'Изменения сохраняются автоматически'}/>

      <div className={styles.settings}>
        <SettingsBlock
          titleWidth={400}
          // mainWidth={1400}
          title={'Ваши подписки'} >
          <div className={styles.search}>
            <Search/>
          </div>
          <div className={styles.grid}>
            <ProfileCard description={'Да, я знаю, что ты душка, но от сиг отдышка\n' +
              'Ты любишь-любишь танцы в клубах, а я курю сиги\n' +
              'Ты хочешь трахаться с типами после первой зипки\n' +
              'И ты заразна, будто вирус, в голове зависла\n' +
              'Да, я знаю, что ты душка, но от сиг отдышка\n' +
              'Ты любишь-любишь танцы в клубах, а я курю сиги\n' +
              'Ты хочешь трахаться с типами после первой зипки\n' +
              'И ты заразна, будто вирус, в голове зависла\n'} image={temp} nickname={'Пользователь'}/>

            <ProfileCard description={'Да, я знаю, что ты душка, но от сиг отдышка\n' +
              'Ты любишь-любишь танцы в клубах, а я курю сиги\n' +
              'Ты хочешь трахаться с типами после первой зипки\n' +
              'И ты заразна, будто вирус, в голове зависла\n' +
              'Да, я знаю, что ты душка, но от сиг отдышка\n' +
              'Ты любишь-любишь танцы в клубах, а я курю сиги\n' +
              'Ты хочешь трахаться с типами после первой зипки\n' +
              'И ты заразна, будто вирус, в голове зависла\n'} image={temp} nickname={'Пользователь'}/>

            <ProfileCard description={'Да, я знаю, что ты душка, но от сиг отдышка\n' +
              'Ты любишь-любишь танцы в клубах, а я курю сиги\n' +
              'Ты хочешь трахаться с типами после первой зипки\n' +
              'И ты заразна, будто вирус, в голове зависла\n' +
              'Да, я знаю, что ты душка, но от сиг отдышка\n' +
              'Ты любишь-любишь танцы в клубах, а я курю сиги\n' +
              'Ты хочешь трахаться с типами после первой зипки\n' +
              'И ты заразна, будто вирус, в голове зависла\n'} image={temp} nickname={'Пользователь'}/>

            <ProfileCard description={'Да, я знаю, что ты душка, но от сиг отдышка\n' +
              'Ты любишь-любишь танцы в клубах, а я курю сиги\n' +
              'Ты хочешь трахаться с типами после первой зипки\n' +
              'И ты заразна, будто вирус, в голове зависла\n' +
              'Да, я знаю, что ты душка, но от сиг отдышка\n' +
              'Ты любишь-любишь танцы в клубах, а я курю сиги\n' +
              'Ты хочешь трахаться с типами после первой зипки\n' +
              'И ты заразна, будто вирус, в голове зависла\n'} image={temp} nickname={'Пользователь'}/>

            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />

          </div>
        </SettingsBlock>
      </div>
    </div>
  )
}

export default MySubscribeSettings