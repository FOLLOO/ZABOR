import React from 'react';

import styles from './documentation-layout.module.css'
import {Outlet} from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function DocumentationLayout() {
    return (
        <>
            <div className={styles.margin}>
                <Header type={'documentation'}/>
                <Outlet/>
            </div>
            <Footer/>
        </>
    );
};

