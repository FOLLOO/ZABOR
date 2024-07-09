import React from 'react'

import styles from './select-tags.module.css'
import global from '../../../global.module.css'
import SettingsTitle from '../../toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../toolbar/settings-block/SettingsBlock'
import TagCheckBox from '../../ui/input/tag-checkbox/TagCheckBox'
import WhiteButton from '../../ui/buttons/white-button/WhiteButton'

function SelectTags ({userChoice = false}) {
  return (
    <div>
      <SettingsTitle bigTitle={userChoice ? 'Определите интересующие вас теги' :'Определите теги'} description={'Это необходимо для рекомендации. Больше мы это спрашивать не будем. Изменить выбор можно будет в настройках'}/>
      <SettingsBlock title={'Творческие теги'}>
        <div className={styles.grid}>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
          <WhiteButton text={'инфа'}/>
        </div>
      </SettingsBlock>
    </div>
  )
}

export default SelectTags