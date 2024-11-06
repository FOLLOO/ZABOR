import React from 'react'

import styles from './client-error.module.css'
import global from '../../global.module.css'
import notFound from '../../asserts/loading/404.svg'
import { useNavigate } from 'react-router-dom'
import Button from "../../components/ui/buttons/button/Button";

function ClientError () {
  const navigate = useNavigate()

  return (
    <div className={styles.main}>
      <img src={notFound} alt={'Client Error'} className={styles.img}/>
      <h3 className={`${global.t3}`}>
        Страница не найдена, или ее не существует
      </h3>
      <div className={styles.button}>
          <Button variant={'outlet'} className={`${global.f_center} ${global.w100}`}
                  click={() => navigate(-1)}>
              Вернуться
          </Button>
      </div>
    </div>
  )
}

export default ClientError