import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

//css
import global from "../../../global.module.css";
import component from '../GroupTags/select-group-tags.module.css'

import {createUserInterests, fetchCreativeTags, updateAuthorInterests} from '../../../redux/slices/tag'

//utils
import { useTags } from '../../../context/TagsContext'

//components
import SettingsTitle from '../../toolbar/settings-title/SettingsTitle'
import TagCheckBox from '../../ui/input/tag-checkbox/TagCheckBox'
import Button from "../../ui/buttons/button/Button";

function SelectTags ({  type = 'user-first' }) {

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
    navigate('/publications/create')
  }

  const updatingAuthor = async () => {
    try{
      const transformedData = tags.map(tag => ({ id: tag }));
      await dispatch(updateAuthorInterests(transformedData)).then((response) => {
        if(response){
          navigate('/settings')
        }
      })
    }catch (err){
      console.log(err)
    }
  }

  const postNewUserTags = async () => {
    try{
      const transformedData = tags.map(tag => ({ id: tag }));
      await dispatch(createUserInterests(transformedData)).then((response) => {
        if(response){
          navigate('/settings/config')
        }
      })
    }catch (err){
      console.log(err)
    }
  }

  const submitByType = (event) => {
    event.preventDefault();
    switch (type) {
      case 'user-first':
        return postNewUserTags()
      case 'user-edit':
        return postNewUserTags()
      case 'user-to-author':
        return postAuthorTags()
      case 'user-update-author':
        return updatingAuthor()
      default:
        return console.error('Unknown user type')
    }
  }

  const titleTextByType = () => {
    switch (type) {
      case 'user-first':
        return 'Определите интересующие вас теги'
      case 'user-edit':
        return 'Изменение интересующих тегов'
      case 'user-to-author':
        return 'На какую тематику будут посты?'
      case 'user-update-author':
        return 'На какую тематику будут посты?'
      default:
        return console.error('Unknown user type')
    }
  }



  useEffect(() => {
    getTags()
  }, [])

  return (
      <div className={component.main}>
        <div className={component.padding}>

          <SettingsTitle bigTitle={titleTextByType()}
                         description={'Это необходимо для рекомендации. Больше мы это спрашивать не будем. Изменить выбор можно будет в настройках'}/>
        </div>
        <form onSubmit={submitByType}>
            <div className={component.grid}>
              {
                creative_tags?.items?.length > 0 ? creative_tags?.items?.map((item) => (
                        <TagCheckBox id={item.id} key={item.id}
                            text={item.name}
                            click={() => addTag(item.id)}/>
                    ))
                    : null
              }
            </div>
          <div className={component.saveButton}>
            <Button type={'submit'} variant={type === 'user-to-author' || type === 'user-update-author' ? 'color' : 'outlet'} className={`${global.f_center} ${global.w100}`}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
  )
}

export default SelectTags