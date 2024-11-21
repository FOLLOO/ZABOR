import React, {useEffect, useState} from 'react'
import styles from './tab.module.css'
import {useLocation, useNavigate} from 'react-router-dom'

/**
 *
 * @param items  - array
 * @returns {Element}
 * @constructor
 * @example
 *  const tabContent = [
 *       { title: 'Публикации', content: <UserPosts data={userData.items.publications}/> },
 *       { title: 'Плейлисты', content: <Playlists/> },
 *       { title: 'Об авторе', content: <AboutMe data={user ? user : null} social={userData.items.socialMedia}/> },
 *     ]
 *     <Tab items={tabContent}>
 */
function Tab({items = []}) {

    const navigate = useNavigate();
    const {pathname} = useLocation()
    const [active, setActive] = useState('.');

    useEffect(() => {
        const path = pathname.split('/')

        if(path.includes('playlist')){
            setActive('./playlists')
        }
        if (path.length === 4) {
            setActive(`./${path.at(-1)}`)
        }
        if (path.length === 3) {
            setActive('.');
        }
    }, [pathname])



    return (
        <div className={styles.tab}>
            <div className={styles.buttons}>
                {items.map((n, i) => (
                    <button
                        key={i}
                        className={`${styles.button} ${n.url === active ? styles.active : ''} `}
                        onClick={() => navigate(n.url)}
                        title={n.desc || null}
                        data-index={i}
                    >
                        {n.title}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Tab