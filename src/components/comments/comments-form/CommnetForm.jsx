import React, { useEffect, useState } from 'react'

import styles from './comment-form.module.css'
import global from '../../../global.module.css'

import GreenButton from '../../ui/buttons/green-button/GreenButton'
import Textarea from '../../ui/input/textarea/Textarea'
import TransprantButton from '../../ui/buttons/transprant-button/TransprantButton'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createComment } from '../../../redux/slices/comments'

function CommnetForm ({ click }) {

  const { id } = useParams()
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted');
    if (id) {
      const data = {
        text: value,
        publicationId: id,
      };
      try {
        dispatch(createComment(data));
      } catch (e) {
        console.error('Error:', e);
      }
    }
  };

  useEffect(() => {
    // console.log(value)
  },[value])

  return (
    <>
    <form id={'HORVA'}
      className={`${global.flex} ${global.f_dir_column} ${styles.hell}`} onSubmit={handleSubmit}>
      <div className={styles.input}>
        <Textarea type={'text'}
                  place={'Оставить комментарий'}
                  rows={1}
                  req
                  onChange={(e) => setValue(e.target.value)}
                  back={false}/>
      </div>
      <div className={styles.flex}>
        <div className={styles.button}>
          <TransprantButton text={'Отмена'} click={click}/>
        </div>
        <div className={styles.button}>
          {/*<button type="submit" form={'HORVA'}>Отправить</button>*/}
          <GreenButton text={'Отправить'} type={'submit'} form={'HORVA'}/>
        </div>
      </div>
    </form>
</>
)
}

export default CommnetForm