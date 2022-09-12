import axios from "axios";
import {
    addProductSuccess,
    deletedSuccess,
    setIsFetching,
    setProducts,
    setTotalCount, updatedSuccess
} from "../reducers/productsReducer";

export const getProducts = (currentPage, limit, searchText) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const response = await axios.get(`http://localhost:3001/products?name_like=${searchText}&_page=${currentPage}&_limit=${limit}`)
        dispatch(setProducts(response.data))
    }
}

export const getTotalCount = (searchText) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/products?name_like=${searchText}`)
        dispatch(setTotalCount(response.data.length))
    }
}

export const getNewProduct = (product) => {
    return async (dispatch) => {
        const response = await axios.post('http://localhost:3001/products', {...product})
        if(response.status === 201){
            dispatch(addProductSuccess(false))
        }
    }
}

export const deleteCurrentProduct = (id) => {
    return async (dispatch) => {
        const response = await axios.delete(`http://localhost:3001/products/${id}`)
        dispatch(deletedSuccess(true))
        if(response.status === 200){
            dispatch(deletedSuccess(false))
        }
    }
}

export const updateCurrentProduct = (id, product) => {
    return async (dispatch) => {
        const response = await axios.put(`http://localhost:3001/products/${id}`, {...product})
        if(response.status === 200){
            dispatch(updatedSuccess(false))
        }
    }
}