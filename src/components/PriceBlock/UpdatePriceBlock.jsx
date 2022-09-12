import React, {useEffect, useRef, useState} from 'react';
import s from './PriceBlock.module.css'
import {
    Checkbox,
    FormControl,
    Input,
    InputAdornment,
    Table, TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import axios from "axios";

const UpdatePriceBlock = ({chosenProduct, setChosenProduct}) => {
    const [cities, setCities] = useState([])
    const [price, setPrice] = useState([...chosenProduct.price])
    const [visible, setVisible] = useState(price[0]['general'].length > 0)

    const initialState = [
        {"general": ''},
        {"almaty": ''},
        {"aktobe": ''},
        {"taldykorgan": ''}
    ]

    // для того чтобы сохранить цены
    const handleChange = (index) => (event) => {
        let newArr = [...price]
        newArr[index][event.target.name] = event.target.value
        setPrice(newArr)
        setChosenProduct({...chosenProduct, price: [...price]})
    }

    // чтоб показывалось или одна цена для всех городов либо разная для всех
    const handleVisibility = () => {
        setVisible(!visible)
        setPrice(initialState)
    }

    // загрузка городов
    useEffect(()=>{
        const response = axios.get('http://localhost:3001/cities')
            .then(response=> setCities(response.data))
    }, [])

    return (
        <div className={s.wrapper}>
            <div className={s.priceBlock}>
                <span>Цена</span>
                <div className={s.price}>
                    <div>
                        <Checkbox checked={visible} onChange={handleVisibility}></Checkbox>
                        <span>Одна цена для всех городов</span>
                    </div>
                    {visible ? <FormControl fullWidth sx={{ m: 1, width: '200px' }} variant="standard">
                        <Input name='general' value={price[0]['general']} onChange={handleChange(0)} type='number'
                               startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl> : null}
                </div>
            </div>
            {visible ? null : <div>
                <Table sx={{ minWidth: 450, width: '70%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Город</TableCell>
                            <TableCell align="left">Цена</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cities.map((city) => (
                            <TableRow
                                key={city.id}>
                                <TableCell align="left">{city.name}</TableCell>
                                <TableCell align="left">
                                    <FormControl fullWidth sx={{ m: 1, width: '200px' }} variant="standard">
                                        <Input value={price[city.id][city.name]} onChange={handleChange(city.id)} name={city.name} type='number'
                                               startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        />
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>}
        </div>
    );
};

export default UpdatePriceBlock;

