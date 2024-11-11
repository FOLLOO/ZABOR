import React from 'react'

// import styles from './my-tags.module.css'
import global from '../../../../../global.module.css'
import BackCreate from '../../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SelectTags from '../../../../../components/settings/Tags/SelectTags'

function MyTags () {
  return (
    <div className={global.padLeft}>
      <BackCreate />
      <SelectTags userChoice/>
    </div>
  )
}

export default MyTags