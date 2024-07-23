import React, { useEffect, useState } from 'react'

import styles from './userInterstings.module.css'
import global from '../../../../../global.module.css'
import BackCreate from '../../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SelectGroupTags from '../../../../../components/settings/GroupTags/SelectGroupTags'

import { useDispatch, useSelector } from 'react-redux'
import { fetchTags } from '../../../../../redux/slices/tag'

function UserInterstings () {

  const dispatch = useDispatch()

  const { tags } = useSelector(state => state.allTags)
  // const [loading, setLoading] = useState()
  const getTags = () => {
    try{
      dispatch(fetchTags())
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getTags()
  }, [])


  return (
    <div className={global.pad}>
      {/*<BackCreate />*/}
      <SelectGroupTags userChoice first tags={tags.items}/>
    </div>
  )
}

export default UserInterstings