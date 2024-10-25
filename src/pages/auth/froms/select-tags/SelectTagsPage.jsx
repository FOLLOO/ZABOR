import React, { useEffect, useState } from 'react'

// import styles from './select-tags.module.css'
import global from '../../../../global.module.css'
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SelectTags from '../../../../components/settings/Tags/SelectTags'
import { useTags } from '../../../../context/TagsContext'
import { useDispatch } from 'react-redux'
import { fetchCreativeTags, fetchTags } from '../../../../redux/slices/tag'

function SelectTagsPage (props) {

  const { groupTags } = useTags()
  const dispatch = useDispatch()

  const [errMes, setErrMes] = useState()
  const [tags, setTags] = useState()
  const [loading, setLoading] = useState(true)


  const getTags = () => {

    const data = {
      groups : groupTags.join(',')
    }

    dispatch(fetchCreativeTags(data))
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

  // console.log(groupTags)

  return (
    <div className={global.pad}>
      <BackCreate />
      <SelectTags tags={tags}/>
    </div>
  )
}

export default SelectTagsPage