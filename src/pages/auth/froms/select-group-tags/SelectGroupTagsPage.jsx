import React, { useEffect, useState } from 'react'

import styles from './select-group-tags.module.css'
import global from '../../../../global.module.css'
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SelectGroupTags from '../../../../components/settings/GroupTags/SelectGroupTags'
import { fetchTags } from '../../../../redux/slices/tag'
import { useDispatch } from 'react-redux'

function SelectGroupTagsPage () {

  const dispatch = useDispatch()
  const [errMes, setErrMes] = useState()
  const [tags, setTags] = useState()
  const [loading, setLoading] = useState(true)
  const getTags = () => {
    dispatch(fetchTags())
      .then((res) => {
        if (res.error) {
          setErrMes(res.error.message)
          setLoading(true)
        }
        if (res.error === undefined) {
          setTags(res.payload)
          // console.log(tags)
          setLoading(false)
        }
      })
  }

  useEffect(() => {
    getTags()
  }, [loading])


  return (
    <div className={global.pad}>
      <BackCreate />
      <SelectGroupTags tags={tags}/>
    </div>
  )
}

export default SelectGroupTagsPage