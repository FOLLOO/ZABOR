import React from 'react'

import styles from './select-group-tags.module.css'
import global from '../../../../global.module.css'
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SelectGroupTags from '../../../../components/settings/GroupTags/SelectGroupTags'

function SelectGroupTagsPage () {
  return (
    <div className={global.pad}>
      <BackCreate />
      <SelectGroupTags/>
    </div>
  )
}

export default SelectGroupTagsPage