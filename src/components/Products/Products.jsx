import React from 'react';
import Header from "../Header/Header";
import Content from "../Content/Content";
import s from './Products.module.css'

const Products = () => {
    return (
        <>
            <Header/>
            <div className={s.mainContent}>
                <Content/>
            </div>
        </>
    );
};

export default Products;