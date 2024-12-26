import React from 'react';

import styles from "../../../pages/documentation/price/becomeIP/become-author-plus.module.css";
import global from "../../../global.module.css";

import InputText from "../../ui/input/input-text/InputText";

export const PartnerCardList = ({data, onChange, partnerCard}) => {
    return (
        <div className={styles.list}>
            <h5 className={styles.titleplus}>
                {data.header}
            </h5>
            {data.items.map((item) => (
                <div className={`${global.flex} ${global.f_dir_column} ${styles.gap05}`}>
                    <div className={`${global.flex} ${global.f_dir_column} ${styles.gap05}`}>
                        <p className={global.sm}>{item.title}</p>
                        <p className={global.d3}>Пример: {item.template}</p>
                    </div>
                    <InputText
                        required={item.required}
                        place={item.template}
                        name={item.data_title}
                        value={partnerCard[item.data_title]}
                        onChange={onChange}
                        type={item.type}/>
                </div>
            ))}
        </div>
    )
}

export default PartnerCardList;