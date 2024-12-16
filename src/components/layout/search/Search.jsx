import React, {useEffect, useRef, useState} from 'react'
import styles from './search.module.css'
import global from '../../../global.module.css'

import search from '../../../asserts/icons/update/search.svg'
import {useDispatch, useSelector} from "react-redux";
import {searchData} from "../../../redux/slices/search";
import NothingYet from "../../../pages/nothing/nothing-yet/NothingYet";
import RenderType from "../../notifications/renderType/RenderType";
function Search ({placeholder = 'Найти...', value, onChange, ref, main = false}) {

    const [open, setOpen] = useState(false)
    const {items} = useSelector(state => state.search.searchData)
    const [inputValue, setInputValue] = useState('');
    const [serverSend, setServerSend] = useState('');
    const dispatch = useDispatch();
    const searchRef = useRef(null)

    useEffect(() => {
        const handler = setTimeout(() => {
            performAction(inputValue);
        }, 2000); // Задержка 2 секунды
        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    const performAction = (value) => {
        const isEmpty = value.trim().length === 0;
        if (isEmpty) return;
        try{
            dispatch(searchData(value))
            setServerSend(value)
            setOpen(true)
        }catch (e) {
            console.error(e);
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };


    function handleClickOutside(event) {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const SearchContent = () => {
        let isEmptyPublications = items.publications.length <= 0,
            isEmptyFolders = items.folders.length <= 0,
            isEmptyUsers = items.users.length <= 0;
        let isEmpty = isEmptyFolders && isEmptyUsers && isEmptyPublications;
        return (
            <div className={styles.content} ref={searchRef}>
                {serverSend ? <p className={styles.descript}>Результаты поиска по запросу:<i style={{fontStyle: 'italic', color: 'var(--accent)'}} onClick={() => setInputValue(serverSend)}> {serverSend} </i></p> : null }
                {isEmpty ? <NothingYet text={'Введите запрос'}/>
                    :
                    <>
                        {items.publications.length > 0 ?
                            <div className={styles.item}>
                                <h5>Публикации </h5>
                                {items.publications.map((item, i) => (
                                    <RenderType
                                        key={i}
                                        link={'/publication/' + item.id}
                                        text={item.title}
                                        postImage={`${item.coverUrl}`}
                                        date={new Date(item.createdAt).toLocaleDateString('ru-RU') }
                                    />
                                ))}
                            </div>
                            : null}
                        {items.folders.length > 0 ?
                            <div className={styles.item}>
                                <h5>Плейлисты </h5>
                                {items.folders.map((item, i) => (
                                    <RenderType
                                        key={i}
                                        link={'profile/' + item.userId + '/playlist/' + item.id}
                                        text={item.name}
                                        date={new Date(item.createdAt).toLocaleDateString('ru-RU')}
                                    />
                                ))}
                            </div>
                            : null}
                        {items.users.length > 0 ?
                            <div className={styles.item}>
                                <h5>Пользователи </h5>
                                {items.users.map((item, i) => (
                                    <RenderType
                                        key={i}
                                        link={'/profile/' + item.id}
                                        avatar={item.files[0]?.url}
                                        text={item.nickname}
                                    />
                                ))}
                            </div>
                            : null}
                    </>
                }
            </div>
        )
    }

    return (
        <div className={styles.parent}>
            <div className={styles.main}>
                <div className={`${global.flex} ${global.f_a_center} ${styles.search}`}>
                    <input className={`${styles.input} ${global.base} `} type={'text'}
                           placeholder={placeholder} ref={ref} onClick={main ? () =>  setOpen(true) : null}
                           value={main ? inputValue : value} onChange={main ? handleChange :onChange}
                  />
                  <img src={search} width={20} height={20} alt={'search icons'}/>
              </div>
          </div>
          {open ?
          <SearchContent/>
          : null }
      </div>
  )
}

export default Search