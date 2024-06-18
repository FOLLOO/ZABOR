import React from 'react'

import styles from './authorization.module.css'
import global from '../../../global.module.css'
import GlassCard from '../../../components/glasses/glasses-card/GlassCard'
function Authorization (props) {
  return (
    <div className={styles.back}>
      <div className={styles.state}>
        <GlassCard>
          <div className={global.flex}>
          <div className={`${styles.logo}`}>
            <div
              className={`${global.flex} ${global.f_ji_center} ${global.f_center} ${global.f_a_center} ${global.h100}`}>
              <h2>
                {/*naZAБORe*/}
                ZAБOR <br/>
                O &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <br/>
                V &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              </h2>
            </div>
          </div>
            <div className={styles.from}>

            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default Authorization