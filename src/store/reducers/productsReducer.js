const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const SET_PAGE = 'SET_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS'
const DELETED_SUCCESS = 'DELETED_SUCCESS'
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT'
const UPDATED_SUCCESS = 'UPDATED_SUCCESS'


const initialState = {
    items: [],
    isFetching: true,
    currentPage: 1,
    limit: 5,
    totalCount: 0,
    searchText: '',
    isAddedSuccess : false,
    isDeletedSuccess: false,
    isUpdatedSuccess: false,
    item: []
}

export const productsReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_PRODUCTS:
            return {
                ...state,
                items: action.payload,
                isFetching: false,
                searchText: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                isAddedSuccess: action.payload
            }
        case DELETED_SUCCESS:
            return {
                ...state,
                isDeletedSuccess: action.payload
            }
        case SET_CURRENT_PRODUCT:
            return {
                ...state,
                item: state.items.filter(p=> p.id === action.payload)
            }
        case UPDATED_SUCCESS:
            return {
                ...state,
                isUpdatedSuccess: action.payload
            }
        default:
            return state
    }
}

export const setProducts = (products) => ({ type: SET_PRODUCTS, payload: products })
export const setIsFetching = (bool) => ({ type: SET_IS_FETCHING, payload: bool })
export const setPage = (page) => ({ type: SET_PAGE, payload: page })
export const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, payload: totalCount })
export const addProductSuccess = (bool) => ({ type: ADD_PRODUCT_SUCCESS, payload: bool })
export const deletedSuccess = (bool) => ({ type: DELETED_SUCCESS, payload: bool })
export const setCurrentProduct = (productId) => ({ type: SET_CURRENT_PRODUCT, payload: productId })
export const updatedSuccess = (bool) => ({ type: UPDATED_SUCCESS, payload: bool })