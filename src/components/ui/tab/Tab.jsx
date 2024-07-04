import React from 'react'
import styles from './tab.module.css'


const TabContent = (props) => (
  <div className={styles.tabcontent}>
    {props.children}
  </div>
);

function Tab ({items = []}) {

  const [ active, setActive ] = React.useState(0);
  const openTab = e => setActive(+e.target.dataset.index);

  return (
    <div>
      <div className={styles.tab}>
        <div className={styles.buttons}>
        {items.map((n, i) => (
          <button
            className={`${styles.tablinks} ${i === active ? styles.active : ''}`}
            onClick={openTab}
            data-index={i}
          >{n.title}</button>
        ))}
        </div>
      </div>

      {items[active] && (
        <TabContent>
          {items[active].content}
        </TabContent>
      )}
    </div>

  )
}

export default Tab