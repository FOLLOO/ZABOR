import React, { useEffect, useState } from 'react'

import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom'

//css
import global from '../../../global.module.css'
import styles from './select-group-tags.module.css'

//utils
import { useTags } from '../../../context/TagsContext'
import {fetchTags} from "../../../redux/slices/tag";

//Components
import SettingsTitle from '../../toolbar/settings-title/SettingsTitle'
import TagCheckBox from '../../ui/input/tag-checkbox/TagCheckBox'
import Loading from '../../../pages/loading/Loading'
import Button from "../../ui/buttons/button/Button";

/**
 *
 * @param userChoice
 * @param first
 * @param type
 * @returns {Element}
 * @constructor
 * @code
 * ```js
 * switch (type) {
 *       case 'user-first':
 *         return navigate('/select/tags')
 *       case 'user-edit':
 *         return navigate('/select/edit/tags/')
 *       case 'user-to-author':
 *         return navigate('/select/author/tags/')
 *       default:
 *         return console.error('Unknown user type')
 *     }
 * ```
 */
export default function SelectGroupTags ({data, userChoice = false, type= 'user-first' }) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { addGroupTag, groupTags } = useTags()
  const { tags } = useSelector(state => state.allTags)

  const [selectTag , setSelectTag] = useState([])
  const [loading, setLoading] = useState(true)

  const getTags = () => {
    try{
      dispatch(fetchTags()).then((response) => {
        if(response){
          setLoading(false)
        }
      })
    }
    catch(err){
      console.log(err)
    }
  }

  // console.log(groupTags)

  useEffect(() => {
    if(groupTags.length > 0){
      groupTags?.map(tag => addTag(tag))
      data?.map(tag => addTag(tag))
    }else if(data?.length > 0){
      data.map((tag) => addTag(tag))
    }
  }, [data, groupTags]);

  useEffect(() => {
    getTags()
  }, [loading]);

  const addTag = (id) => {
    if(id !== undefined){
      if (!selectTag.includes(id)){
        setSelectTag([...selectTag, id])
      }
      else{
        const index = selectTag.indexOf(id);
        if (index > -1) { // only splice array when item is found
          selectTag.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    }
  }

  const navigateByType = () => {
    switch (type) {
      case 'user-first':
        return navigate('/select/tags')
      case 'user-edit':
        return navigate('/settings/tags/')
      case 'user-to-author':
        return navigate('/select/author/tags/')
      case 'user-update-author':
        return navigate('/settings/author/tags')
      default:
        return console.error('Unknown user type')
    }
  }

  const titleTextByType = () => {
    switch (type) {
      case 'user-first':
        return 'Мои теги'
      case 'user-edit':
        return 'Мои теги'
      case 'user-to-author':
        return 'Расскажите На какую тематику будут посты?'
      case 'user-update-author':
        return 'Расскажите На какую тематику будут посты?'
      default:
        return console.error('Unknown user type')
    }
  }

  const setTags = () => {
      for(let i = 0; i < selectTag.length; i++){
        if(!groupTags.includes(selectTag[i])){
          addGroupTag(selectTag[i])
        }
      }
      navigateByType()
  }

  const checkedContext = (id) => {
    if(groupTags.length > 0){
      return groupTags.includes(id) || selectTag.includes(id)
    } else if(selectTag.length > 0 ){
      return selectTag?.includes(id)
    } else if(data?.length > 0){
      return data?.includes(id)
    }else{
      return false;
    }
  }

  // console.log('selectTag', selectTag, 'data', data)

  return (
    <div className={styles.main}>
      <div className={styles.padding}>

      <SettingsTitle bigTitle={titleTextByType()}
                     description={'Больше мы это спрашивать не будем. Изменить выбор можно будет в настройках'}/>
      </div>
      <form onSubmit={setTags}>
          {tags?.items?.length > 0 ?
          <div className={userChoice ? styles.grid5 : styles.grid}>
            {tags?.items.map((item) => (
                <TagCheckBox text={item.name} key={item.id} id={item.id} click={() => addTag(item.id)} checked={checkedContext(item.id)}  />
                // <TagCheckBox text={item.name} key={item.id} id={item.id}  />
              ))}
          </div>
              : <Loading/>
          }
          <div className={styles.saveButton}>
            <Button type={'submit'} variant={type === 'user-to-author' || type === 'user-update-author' ? 'color' : 'outlet'} className={`${global.f_center} ${global.w100}`}>
              Сохранить
            </Button>
          </div>
        {/*</SettingsBlock>*/}
      </form>
    </div>
  )
}

