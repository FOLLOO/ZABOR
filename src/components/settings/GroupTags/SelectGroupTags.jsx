import React, { useEffect, useState } from 'react'

import styles from './select-group-tags.module.css'
import global from '../../../global.module.css'
import SettingsTitle from '../../toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../toolbar/settings-block/SettingsBlock'
import TagCheckBox from '../../ui/input/tag-checkbox/TagCheckBox'
import GreenButton from '../../ui/buttons/green-button/GreenButton'
import { useTags } from '../../../context/TagsContext'
import { useNavigate } from 'react-router-dom'

function SelectGroupTags ({ userChoice = false, tags = [] }) {

  const { addGroupTag } = useTags()
  const navigate = useNavigate()

  const [selectTag , setSelectTag] = useState([])

  const addTag = (id) => {
    if (!selectTag.includes(id)){
      setSelectTag([...selectTag, id])
      // console.log(selectTag)
    }
    else{
      const index = selectTag.indexOf(id);
      if (index > -1) { // only splice array when item is found
        selectTag.splice(index, 1); // 2nd parameter means remove one item only
      }
      // console.log(selectTag)
    }
  }
  const haddleSubmit = () => {
      addGroupTag(selectTag)
    navigate('/tags')
  }

  // useEffect(() => {
  //   console.log(selectTag)
  // },[selectTag])

  return (
    <div>
      <SettingsTitle bigTitle={userChoice ? 'Мои интересы' : 'Расскажите'}
                     title={userChoice ? null : 'На какую тематику будт посты?'}
                     description={userChoice ? 'Изменения сохраняются автоматически' : 'Больше мы это спрашивать не будем. Изменить выбор можно будет в настройках'}/>

      <form onSubmit={haddleSubmit}>
        <SettingsBlock title={'Творческие теги'} button b_type={'submit'} b_text={'Сохранить'}>
          <div className={userChoice ? styles.grid5 : styles.grid}>
            {tags.length > 0 ? tags.map((item) => (
                <TagCheckBox text={item.name} key={item.id} click={() => addTag(item.id)} />
              )) :
              <>
                <TagCheckBox text={'Загрузка...'}/>
                <TagCheckBox text={'Загрузка...'}/>
                <TagCheckBox text={'Загрузка...'}/>
                <TagCheckBox text={'Загрузка...'}/>
              </>
            }
          </div>
        </SettingsBlock>
      </form>

    </div>
  )
}

export default SelectGroupTags