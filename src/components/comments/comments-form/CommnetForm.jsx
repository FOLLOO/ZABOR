import React, { useEffect, useState } from 'react'

import styles from './comment-form.module.css'
import global from '../../../global.module.css'

import Textarea from '../../ui/input/textarea/Textarea'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createComment } from '../../../redux/slices/comments'
import Button from "../../ui/buttons/button/Button";

function CommnetForm ({ click, main = false, parrentID }) {

  const { id } = useParams()
  const [value, setValue] = useState('')
  const [err, setError] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted');
    if (id) {
      const isEmpty = value.trim().length === 0;
      if (isEmpty) return setError('Комментарий не может быть пустым');

      let data;

      if(parrentID){
        data = {
          text: value,
          publicationId: id,
          commentId: parrentID,
        };
      }else{
        data = {
          text: value,
          publicationId: id,
        };
      }

      try {
        dispatch(createComment(data));
        setValue(null)
        // window.location.reload()
      } catch (e) {
        console.error('Error:', e);
      }
    }
  };

  useEffect(() => {
    // console.log(value)
  },[value, err])

  return (
    <>
      <form id={parrentID ? parrentID : 'main'}
            className={`${global.flex} ${global.f_dir_column} ${styles.hell}`} onSubmit={handleSubmit}>
        <p className={global.d3}>{value ? value?.trim()?.length : 0} / 255</p>

        <div className={styles.input}>
          <Textarea type={'text'}
                    place={'Оставить комментарий'}
              // rows={1}
                    value={value} maxLength={255}
                    req
                    onChange={(e) => setValue(e.target.value)}
                    back={false}/>
        </div>
        <p className={styles.error}>{err}</p>
        <div className={styles.flex}>
          {main ? null :
              <div className={styles.button}>
                <Button size={'h-3'} img_size={'h-3'} className={global.sm} click={click}>Отмена</Button>
              </div>}
          <div className={styles.button}>
            {/*<button type="submit" form={'HORVA'}>Отправить</button>*/}
            <Button size={'h-3'} img_size={'h-3'} className={global.sm} variant={'color'} type={'submit'}
                    form={parrentID ? parrentID : 'main'}>Отправить</Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CommnetForm