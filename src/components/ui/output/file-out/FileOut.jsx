import React from 'react'

import styles from './file-out.module.css'
import global from '../../../../global.module.css'
import fileDownload from '../../../../asserts/icons/file-download.svg'
import { Link } from 'react-router-dom'

function FileOut ({ file, title }) {
  return (
    <div className={styles.main}>
      <Link to={fileDownload} target="_blank" download>
        <div className={`${global.flex} ${global.f_a_center} ${styles.file}`}>
          <img src={fileDownload} alt={'download'}/>
          <div className={global.text}>
            {title}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default FileOut