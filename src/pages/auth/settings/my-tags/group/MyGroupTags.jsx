import React from 'react'

import styles from './my-group-tags.module.css'
import global from '../../../../../global.module.css'
import BackCreate from '../../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SelectGroupTags from '../../../../../components/settings/GroupTags/SelectGroupTags'

function MyGroupTags (props) {
  return (
    <div className={global.padLeft}>
      <BackCreate />
      <SelectGroupTags userChoice/>
    </div>
  )
}

export default MyGroupTags