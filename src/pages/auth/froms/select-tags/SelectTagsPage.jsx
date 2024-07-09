import React from 'react'

import styles from './select-tags.module.css'
import global from '../../../../global.module.css'
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SelectTags from '../../../../components/settings/Tags/SelectTags'

function SelectTagsPage (props) {
  return (
    <div className={global.pad}>
      <BackCreate />
      <SelectTags/>
    </div>
  )
}

export default SelectTagsPage