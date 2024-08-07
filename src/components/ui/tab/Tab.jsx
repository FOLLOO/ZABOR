import React, { useEffect, useState } from 'react'
import styles from './tab.module.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'


const TabContent = (props) => (
  <div className={styles.tabcontent}>
    {props.children}
  </div>
);

function Tab({ items = [] , nav = '/profile', tit = false}) {
  const { id } = useParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const [active, setActive] = useState(0);

  // Set active tab based on hash when component mounts or hash changes
  useEffect(() => {
    if (hash) {
      const hashIndex = parseInt(hash.replace('#', ''), 10);
      if (!isNaN(hashIndex) && hashIndex >= 0 && hashIndex < items.length) {
        setActive(hashIndex);
      }
      // if (hash)
    }
  }, [hash, items.length]);

  const openTab = (e) => {
    const index = +e.target.dataset.index;
    setActive(index);
    navigate({
      pathname: `${pathname}`,
      hash: `#${index}`
    });
  };

  return (
    <div>
      <div className={styles.tab}>
        <div className={styles.buttons}>
          {items.map((n, i) => (
            <button
              key={i}
              className={`${styles.tablinks} ${i === active ? styles.active : ''} `}
              onClick={openTab}
              title={n.desc || null}
              data-index={i}
            >
              {n.title}
            </button>
          ))}
        </div>
      </div>
      {items[active] && (
        <TabContent>
          {items[active].content}
        </TabContent>
      )}
    </div>
  );
}

export default Tab