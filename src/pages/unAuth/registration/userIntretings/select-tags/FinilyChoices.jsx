import React, { useEffect, useState } from 'react'

import styles from './finaly-choces.module.css'
import global from '../../../../../global.module.css'
import BackCreate from '../../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SelectTags from '../../../../../components/settings/Tags/SelectTags'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreativeTags } from '../../../../../redux/slices/tag'
import { useTags } from '../../../../../context/TagsContext'

function FinilyChoices (props) {

  const { groupTags } = useTags()
  const dispatch = useDispatch()

  const { creative_tags } = useSelector(state => state.allTags)

  const [loading, setLoading] = useState(true)


  const getTags = () => {

    const data = {
      groups : groupTags.join(',')
    }
    try{

    dispatch(fetchCreativeTags(data))
    }
    catch (err){
      console.log(err)
    }
  }

  useEffect(() => {
    getTags()
    console.log(groupTags)
  }, [loading])

  // console.log(groupTags)

  return (
    <div className={global.pad}>
      <BackCreate />
      <SelectTags userChoice first tags={creative_tags.items}/>
    </div>
  )
}

export default FinilyChoices