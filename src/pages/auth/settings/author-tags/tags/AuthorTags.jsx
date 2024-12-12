import React from 'react'

// import styles from './my-tags.module.css'
import global from '../../../../../global.module.css'
import BackCreate from '../../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SelectTags from '../../../../../components/settings/Tags/SelectTags'

function AuthorTags () {
  return (
    <div className={global.padLeft}>
      <BackCreate />
      <SelectTags type={'user-update-author'}/>
    </div>
  )
}

export default AuthorTags