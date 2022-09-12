import React from 'react';
import s from './CreatureHeader.module.css'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {Link} from "react-router-dom";

const CreatureHeader = ({text}) => {
    return (
        <div className={s.header}>
            <Link className={s.button} to={'/products'}>
                <ArrowBackIosNewOutlinedIcon/>
            </Link>
            <h3>{text}</h3>
        </div>
    );
};

export default CreatureHeader;