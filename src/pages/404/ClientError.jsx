import React from 'react'

import styles from './client-error.module.css'
import global from '../../global.module.css'
import notFound from '../../asserts/loading/404.svg'
import TransprantButton from '../../components/ui/buttons/transprant-button/TransprantButton'
import WhiteButton from '../../components/ui/buttons/white-button/WhiteButton'
import GreenButton from '../../components/ui/buttons/green-button/GreenButton'
import { useNavigate } from 'react-router-dom'

function ClientError (props) {
  const navigate = useNavigate()
  return (
    <div className={styles.main}>
      <img src={notFound} alt={'Client Error'} className={styles.img}/>
      <h3>
        Страница не найдена, или ее не существует
      </h3>
      <div className={styles.button}>
      <GreenButton text={'На главную'} click={() => navigate('/')}/>
      </div>
    </div>
  )
}

export default ClientError