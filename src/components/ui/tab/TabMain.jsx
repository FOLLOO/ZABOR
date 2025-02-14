import React from 'react'

import styles from './tab.module.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const TabContent = (props) => (
  <div className={styles.tabcontent}>
    {props.children}
  </div>
);
//todo: Дубль: Таб ТабМейн Аналитика- Пост и Автор
function TabMain ({items = []}) {
  const {pathname} = useLocation()
  const { id } = useParams();
  const navigate = useNavigate()
  function openTab(e) {
    const index = e.target.dataset.index
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