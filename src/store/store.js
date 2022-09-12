import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {productsReducer} from "./reducers/productsReducer";
import thunk from "redux-thunk";



const rootReducer = combineReducers({
    products: productsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))