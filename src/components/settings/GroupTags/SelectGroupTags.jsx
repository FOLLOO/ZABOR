import React, { useEffect, useState } from 'react'

import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom'

//css
import global from '../../../global.module.css'
import styles from './select-group-tags.module.css'

//utils
import { useTags } from '../../../context/TagsContext'
import {fetchTags} from "../../../redux/slices/tag";

//Components
import SettingsTitle from '../../toolbar/settings-title/SettingsTitle'
import TagCheckBox from '../../ui/input/tag-checkbox/TagCheckBox'
import Loading from '../../../pages/loading/Loading'
import Button from "../../ui/buttons/button/Button";

/**
 *
 * @param userChoice
 * @param first
 * @param type
 * @returns {Element}
 * @constructor
 * @code
 * ```js
 * switch (type) {
 *       case 'user-first':
 *         return navigate('/select/tags')
 *       case 'user-edit':
 *         return navigate('/select/edit/tags/')
 *       case 'user-to-author':
 *         return navigate('/select/author/tags/')
 *       default:
 *         return console.error('Unknown user type')
 *     }
 * ```
 */
export default function SelectGroupTags({ data, userChoice = false, type = 'user-first' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addGroupTag, groupTags, setGroupTags } = useTags();
  const { tags } = useSelector(state => state.allTags);

  const [selectTag, setSelectTag] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchTags()).then(() => {
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching tags:', err);
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    // Initialize selected tags from groupTags and data
    const initialSelectedTags = [];
    if (groupTags.length > 0) {
      initialSelectedTags.push(...groupTags);
    }
    if (data && data.length > 0) {
      initialSelectedTags.push(...data);
    }
    setSelectTag(initialSelectedTags);
  }, [groupTags, data]);

  const addTag = (id) => {
    if (selectTag.includes(id)) {
      // Remove tag if already selected
      setSelectTag(selectTag.filter(tagId => tagId !== id));
    } else {
      // Add tag if not already selected
      setSelectTag([...selectTag, id]);
    }
  };

  const navigateByType = () => {
    switch (type) {
      case 'user-first':
        return navigate('/select/tags');
      case 'user-edit':
        return navigate('/settings/tags/');
      case 'user-to-author':
        return navigate('/select/author/tags/');
      case 'user-update-author':
        return navigate('/settings/author/tags');
      default:
        console.error('Unknown user type');
    }
  };

  const titleTextByType = () => {
    switch (type) {
      case 'user-first':
      case 'user-edit':
        return 'Мои теги';
      case 'user-to-author':
      case 'user-update-author':
        return 'Расскажите на какую тематику будут посты?';
      default:
        console.error('Unknown user type');
    }
  };

  const setTags = (event) => {
    event.preventDefault();
    setGroupTags([])
    // Add selectTag to groupTags
    selectTag.forEach(tagId => {
      if (!groupTags.includes(tagId)) {
        addGroupTag(tagId);
      }
    });
    navigateByType();
  };

  const checkedContext = (id) => {
    if(!selectTag.includes(id)) {
      return false;
    }
    return groupTags.includes(id) || selectTag.includes(id) || (data && data.includes(id));
  };

  return (
      <div className={styles.main}>
        <div className={styles.padding}>
          <SettingsTitle bigTitle={titleTextByType()} description="Больше мы это спрашивать не будем. Изменить выбор можно будет в настройках" />
        </div>
        <form onSubmit={setTags}>
          {tags?.items?.length > 0 ? (
              <div className={userChoice ? styles.grid5 : styles.grid}>
                {tags.items.map(item => (
                    <TagCheckBox
                        key={item.id}
                        id={item.id}
                        text={item.name}
                        img={item.file || null}
                        click={() => addTag(item.id)}
                        checked={checkedContext(item.id)}
                    />
                ))}
              </div>
          ) : (
              <Loading />
          )}
          <div className={styles.saveButton}>
            <Button type="submit" variant={type === 'user-to-author' || type === 'user-update-author' ? 'color' : 'outlet'} className={`${global.f_center} ${global.w100}`}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
  );
}

