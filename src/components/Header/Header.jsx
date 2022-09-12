import React from 'react';
import s from './Header.module.css'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


const Header = () => {
    const totalCount = useSelector(state=> state.products.totalCount)
    return (
        <div>
            <div className={s.header}>
                <h3>Товары {totalCount}</h3>
                <Link className={s.button} to={'/products/create'}>Добавить товар</Link>
            </div>
        </div>
    );
};

export default Header;