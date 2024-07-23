import React from 'react'

import styles from './market.module.css'
import global from '../../../global.module.css'
import SettingsTitle from '../../../components/toolbar/settings-title/SettingsTitle'
import SettingsBlock from '../../../components/toolbar/settings-block/SettingsBlock'
import PlaylistsPost from '../../../components/post/post-cards/card-for-playlist/PlaylistsPost'
import GreenButton from '../../../components/ui/buttons/green-button/GreenButton'
import temp from '../../../asserts/temp/top-view-over-chinese-hot-pot.jpg'

function Market (props) {
  return (
    <div className={global.pad}>
      <SettingsTitle bigTitle={'Корзина'} title={`В корзине ? постов`}
                     description={'После оплаты пост станет доступным навсегда'}/>
      <div className={`${global.flex} ${styles.check}`}>

        <div className={styles.posts}>
          <PlaylistsPost title={'Рудлоыфвлдао'}
                         image={temp}
                         views={1000}
                         description={'Этаф ичстывоалдофыврафывоар фывалдо ыфвладо фыовало лывоало лыфовал олфыова лфывал фылваол фылаво лфыолва оо'}/>
          <PlaylistsPost title={'Рудлоыфвлдао'}
                         image={temp}
                         views={1000}
                         description={'alksdjflkaskdf'}/>
          <PlaylistsPost title={'Рудлоыфвлдао'}
                         image={temp}
                         views={1000}
                         description={'alksdjflkaskdf'}/>
          <PlaylistsPost title={'Рудлоыфвлдао'}
                         image={temp}
                         views={1000}
                         description={'alksdjflkaskdf'}/>
          <PlaylistsPost title={'Рудлоыфвлдао'}
                         image={temp}
                         views={1000}
                         description={'alksdjflkaskdf'}/>
          <PlaylistsPost title={'Рудлоыфвлдао'}
                         image={temp}
                         views={1000}
                         description={'alksdjflkaskdf'}/>
          <PlaylistsPost title={'Рудлоыфвлдао'}
                         image={temp}
                         views={1000}
                         description={'alksdjflkaskdf'}/>


        </div>

        <div className={`${styles.bascket} `}>
          {/*<div className={styles.bascket_content}>*/}
          <div className={styles.call}>
            <h4>
              Итог
            </h4>
            <h3>
              {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(1200000)}
            </h3>
          </div>

          <div className={styles.call}>
            <h4>
              Постов
            </h4>
            <h3>
              12 шт.
            </h3>
          </div>

          <GreenButton text={'Перейти к оплате'}/>
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}

export default Market