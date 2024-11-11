import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

//css
import styles from './select-tags.module.css'
import {createUserInterests, fetchCreativeTags} from '../../../redux/slices/tag'

//utils
import { useTags } from '../../../context/TagsContext'

//components
import SettingsTitle from '../../toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../toolbar/settings-block/SettingsBlock'
import TagCheckBox from '../../ui/input/tag-checkbox/TagCheckBox'

function SelectTags ({ userChoice = false, first }) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { addCreativeTag, groupTags  } = useTags()
  const { creative_tags } = useSelector(state => state.allTags)

  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)


  const getTags = () => {
    const data = {
      groups : groupTags.join(',')
    }
    try{
      dispatch(fetchCreativeTags(data)).then((response) => {
        if(response){
          setLoading(false)
        }
      })
    }
    catch (err){
      console.log(err)
    }
  }

  const addTag = (id) => {
    if (!tags.includes(id)){
      setTags([...tags, id])
    }
    else{
      const index = tags.indexOf(id);
      if (index > -1) { // only splice array when item is found
        tags.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  }
  const postAuthorTags = () => {
    addCreativeTag(tags)
    navigate('/create/post')
  }

  const postNewUserTags = (e) => {
    e.preventDefault()
    try{
      const transformedData = tags.map(tag => ({ id: tag }));
      dispatch(createUserInterests(transformedData))
    }catch (err){
      console.log(err)
    }
    navigate('/publications')
  }

  useEffect(() => {
    getTags()
  }, [loading])

  return (
    <div>
      <SettingsTitle bigTitle={userChoice ? 'Определите интересующие вас теги' : 'Определите теги'}
                     description={'Это необходимо для рекомендации. Больше мы это спрашивать не будем. Изменить выбор можно будет в настройках'}/>
      <form onSubmit={first ? postNewUserTags : postAuthorTags}>
        <SettingsBlock  title={'Творческие теги'} button b_type={'submit'} b_text={'Сохранить'}>
          <div className={styles.grid}>
            {
              creative_tags?.items?.length > 0 ? creative_tags?.items?.map((item) => (
                  <TagCheckBox text={item.name} click={() => addTag(item.id)}/>
                ))
                : null
            }
          </div>
        </SettingsBlock>
      </form>

    </div>
  )
}

export default SelectTags