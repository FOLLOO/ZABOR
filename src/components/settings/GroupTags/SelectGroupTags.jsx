import React from 'react'

import styles from './select-group-tags.module.css'
import global from '../../../global.module.css'
import SettingsTitle from '../../toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../toolbar/settings-block/SettingsBlock'
import TagCheckBox from '../../ui/input/tag-checkbox/TagCheckBox'

function SelectGroupTags ({userChoice = false}) {
  return (
    <div>
      <SettingsTitle bigTitle={userChoice ? 'Мои интересы' : 'Расскажите'} title={userChoice ? null : 'На какую тематику будт посты?'} description={userChoice ? 'Изменеия сохраняются автоматически' :'Больше мы это спрашивать не будем. Изменить выбор можно будет в настройках'}/>

      <SettingsBlock title={'Творческие теги'}>
        <div className={userChoice ? styles.grid5 : styles.grid}>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
          <TagCheckBox text={'Кавкая то инфа'}/>
        </div>
      </SettingsBlock>
    </div>
  )
}

export default SelectGroupTags