import React, { useState } from 'react'

import styles from './tab.module.css'
import global from '../../../global.module.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import * as PropTypes from 'prop-types'

const TabContent = (props) => (
  <div className={styles.tabcontent}>
    {props.children}
  </div>
);
//todo: Дубль: Таб ТабМейн Аналитика- Пост и Автор
function TabMain ({items = []}) {
  const {pathname} = useLocation()
  const { id } = useParams();
  // const [active, setActive] = useState(0);
  const navigate = useNavigate()
  function openTab(e) {
    const index = e.target.dataset.index
    // setActive(index)
    navigate(`${pathname.replace(`/${id}`, '')}/${index}`)
  }

  return (
    <div>
      <div className={styles.tab}>
        <div className={styles.buttons}>

          {items.map((n, i) => (
            <button
              key={n.id || i}
              className={`${styles.tablinks} ${i === Number(id) ? styles.active : ''} `}
              onClick={openTab}
              title={n.desc || null}
              data-index={n?.id || i}
            >
              {n.title}
            </button>
          ))}
        </div>
      </div>
      {items[id] && (
        <TabContent>
          {items[id].content}
        </TabContent>
      )}
    </div>
  )
}

export default TabMain