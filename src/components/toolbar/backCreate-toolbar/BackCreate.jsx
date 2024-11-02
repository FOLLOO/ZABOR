import React from 'react'

import global from '../../../global.module.css'
import styles from './back-create.module.css'

import arrowBack from '../../../asserts/icons/Arrow back.svg'

import GreenButton from '../../ui/buttons/green-button/GreenButton'
import { useNavigate } from 'react-router-dom'
import Button from "../../ui/buttons/button/Button";
function BackCreate ({description, greenText, button, sticky, click, greenButtonForm}) {
  //todo: лучше опрделять или props-ами прописывать?

  const navigate = useNavigate()
  return (
    <div className={sticky ? `${styles.main} ${styles.sticky}` : styles.main}>
      <div className={`${global.flex} ${global.f_a_center} ${global.f_s_between}`}>
        <div className={styles.back}>
          <Button img={arrowBack} className={global.p0} img_size={'h-5'} click={() => navigate(-1)}>
              Назад
          </Button>
        </div>
        {button ?
          <div className={`${styles.create} ${global.flex} ${global.f_a_center}`}>
            <div className={`${styles.desc} ${global.d2} `}>
              {description}
            </div>
            {/*<GreenButton text={greenText} click={click} unique form={greenButtonForm}/>*/}
              <Button variant={'color'} click={click} form={greenButtonForm}>
              {greenText}
              </Button>
          </div>
          : null }
      </div>
    </div>
  )
}

export default BackCreate