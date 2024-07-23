import React, { useEffect, useState } from 'react'

import styles from './select-tags.module.css'
import global from '../../../global.module.css'
import SettingsTitle from '../../toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../toolbar/settings-block/SettingsBlock'
import TagCheckBox from '../../ui/input/tag-checkbox/TagCheckBox'
import WhiteButton from '../../ui/buttons/white-button/WhiteButton'
import { useTags } from '../../../context/TagsContext'
import { useNavigate } from 'react-router-dom'
import registration from '../../../pages/unAuth/registration/Registration'
import { useDispatch } from 'react-redux'
import { createUserInterests } from '../../../redux/slices/tag'

function SelectTags ({ userChoice = false, tags = [], first }) {

  const { addCreativeTag, creativeTags  } = useTags()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [creativeeTags, setCreativeeTags] = useState([])

  const addTag = (id) => {
    if (!creativeeTags.includes(id)){
      setCreativeeTags([...creativeeTags, id])
      // console.log(selectTag)
    }
    else{
      const index = creativeeTags.indexOf(id);
      if (index > -1) { // only splice array when item is found
        creativeeTags.splice(index, 1); // 2nd parameter means remove one item only
      }
      // console.log(creativeeTags)
    }
  }
  // useEffect(() => {
  //   console.log(creativeeTags)
  // },[creativeeTags])
  const haddleSubmit = () => {
    addCreativeTag(creativeeTags)
    navigate('/create/post')
  }

  const RegistrationInterestings = (e) => {
    e.preventDefault()
    // console.log(creativeeTags)
    try{
      const transformedData = creativeeTags.map(tag => ({ id: tag }));
    dispatch(createUserInterests(transformedData))
    }catch (err){
      console.log(err)
    }

  }

  return (
    <div>
      <SettingsTitle bigTitle={userChoice ? 'Определите интересующие вас теги' : 'Определите теги'}
                     description={'Это необходимо для рекомендации. Больше мы это спрашивать не будем. Изменить выбор можно будет в настройках'}/>
      <form onSubmit={first ? RegistrationInterestings : haddleSubmit}>
        <SettingsBlock  title={'Творческие теги'} button b_type={'submit'} b_text={'Сохранить'}>
          <div className={styles.grid}>
            {
              tags.length > 0 ? tags.map((item) => (
                  <TagCheckBox text={item.name} click={() => addTag(item.id)}/>
                ))
                : null
            }
            {/*<WhiteButton text={'инфа'}/>*/}
            {/*<WhiteButton text={'инфа'}/>*/}
            {/*<WhiteButton text={'инфа'}/>*/}
            {/*<WhiteButton text={'инфа'}/>*/}
          </div>
        </SettingsBlock>
      </form>

    </div>
  )
}

export default SelectTags