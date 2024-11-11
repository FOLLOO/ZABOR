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

export default function SelectGroupTags ({ userChoice = false, first }) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { addGroupTag } = useTags()
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

  useEffect(() => {
    getTags()
  }, [loading]);

  const addTag = (id) => {
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
  const setTags = () => {
      addGroupTag(selectTag)
      navigate(first ? '/select/tags' : '/tags')
  }

  return (
    <div>
      <SettingsTitle bigTitle={userChoice ? 'Мои интересы' : 'Расскажите'}
                     title={userChoice ? null : 'На какую тематику будут посты?'}
                     description={'Больше мы это спрашивать не будем. Изменить выбор можно будет в настройках'}/>
      <form onSubmit={setTags}>
          {tags?.items?.length > 0 ?
          <div className={userChoice ? styles.grid5 : styles.grid}>
            {tags?.items.map((item) => (
                // <TagCheckBox text={item.name} key={item.id} id={item.id} click={() => addTag(item.id)} />
                <TagCheckBox text={item.name} key={item.id} id={item.id}  />
              ))}
          </div>
              : <Loading/>
          }
          <div className={styles.saveButton}>
            <Button type={'submit'} variant={'outlet'} className={`${global.f_center} ${global.w100}`}>
              Сохранить
            </Button>
          </div>
        {/*</SettingsBlock>*/}
      </form>
    </div>
  )
}

