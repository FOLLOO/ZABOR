import React, { useEffect, useState } from 'react'

import styles from './comment-form.module.css'
import global from '../../../global.module.css'

import Textarea from '../../ui/input/textarea/Textarea'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createComment } from '../../../redux/slices/comments'
import Button from "../../ui/buttons/button/Button";

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
        alert('Комментарий опубликован')
        setValue('')
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
                  // rows={1}
                  req
                  onChange={(e) => setValue(e.target.value)}
                  back={false}/>
      </div>
      <div className={styles.flex}>
        <div className={styles.button}>
          <Button click={click}>Отмена</Button>
        </div>
        <div className={styles.button}>
          {/*<button type="submit" form={'HORVA'}>Отправить</button>*/}
          <Button variant={'color'} type={'submit'} form={'HORVA'}>Отправить</Button>
        </div>
      </div>
    </form>
</>
)
}

export default CommnetForm