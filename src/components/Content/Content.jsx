import React, {useEffect, useState} from 'react';
import {
    Alert,
    Checkbox,
    Paper, Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import s from './Content.module.css'
import {useDispatch, useSelector} from "react-redux";
import {deleteCurrentProduct, getProducts, getTotalCount} from "../../store/actions/products";
import {setCurrentProduct, setPage} from "../../store/reducers/productsReducer";
import {createPages} from "../../funcs/createPages";
import {Link} from "react-router-dom";

const Content = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.products.items)
    const isFetching = useSelector( state => state.products.isFetching)
    const currentPage = useSelector( state => state.products.currentPage)
    const limit = useSelector( state => state.products.limit)
    const totalCount = useSelector( state => state.products.totalCount)
    const pagesCount = Math.ceil(totalCount / limit)
    const pages = []
    createPages(pages, pagesCount, currentPage)

    const [searchValue, setSearchValue] = useState('')

    // запрос на сервер не будет происходить при каждом вводе символа в поиск
    useEffect(() => {
            const delayDebounceFn = setTimeout(() => {
                dispatch(getProducts(currentPage, limit, searchValue))
                dispatch(getTotalCount(searchValue))
            }, 500)

            return () => clearTimeout(delayDebounceFn)
        },
        [currentPage, searchValue])

    // при поиске user-a перекидывает на первую страницу
    const handleSearch = (event) => {
        setSearchValue(event.target.value)
        dispatch(setPage(1))
    }

    const deleteProduct = (id) => {
        dispatch(deleteCurrentProduct(id))
        dispatch(setPage(1))
    }

    return (
        <div>
            <TextField onChange={handleSearch} value={searchValue} sx={{width: '100%', mb: 4}} id="standard-basic" label="Поиск по названию" variant="standard" />
            { isFetching
                ? <div className={s.loader}>loading</div>
                : items.length === 0 ? <div className={s.loader}>Ничего не найдено!</div>
                    : <TableContainer className={s.container} component={Paper}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Действия
                                    </TableCell>
                                    <TableCell align="right">Фото</TableCell>
                                    <TableCell align="right">Название</TableCell>
                                    <TableCell align="right">Статус</TableCell>
                                    <TableCell align="right">Цена</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow
                                        key={item.id}>
                                        <TableCell component="th" scope="row">
                                            <div className={s.buttons}>
                                                <button onClick={() => dispatch(setCurrentProduct(item.id))}><Link to={'/products/edit/' + item.id}>Edit current product</Link></button>
                                                <button onClick={() => deleteProduct(item.id)}>Delete current product</button>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <img src={item.img[0]} alt=""/>
                                        </TableCell>
                                        <TableCell align="right">{item.name}</TableCell>
                                        <TableCell align="right">{item.status}</TableCell>
                                        <TableCell align="right">
                                            {/*преобразование массива цен так чтоб его можно было в таблице адекватно показывать*/}
                                            {item.price.map(obj =>
                                                ({
                                                    name: Object.keys(obj),
                                                    value: Object.values(obj).toString()
                                                })
                                            ).filter((city) => city.value.length > 0).map((data, index) =>
                                            <div key={index}>
                                                <span>{data.name}: </span>
                                                <span>{data.value}</span>
                                            </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
            <div className={s.pages}>
                {/*dispatch страницы при клике на пагинацию + пагинация зависит от поиска*/}
                {pages.map((page, index) =>
                    <button onClick={() => dispatch(setPage(page))}
                        className={ page == currentPage ? `${s.page} ${s.currentPage}` : s.page} key={index}>{page}</button>
                )}
            </div>
        </div>
    );
};

export default Content