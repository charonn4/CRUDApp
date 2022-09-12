import React from "react";
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Products from "./components/Products/Products";
import Creature from "./components/Creature/Creature";
import EditingPage from "./components/EditingPage/EditingPage";
import {useSelector} from "react-redux";

const App = () =>  {
    // в случае если в редактировании страницы user обновит страницу его перекидывает на главную страницу продуктов
    const item = useSelector(state => state.products.item)
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/products'} element={<Products/>}></Route>
                    <Route path={'/products/create'} element={<Creature/>}></Route>
                    <Route path={'/'} element={ <Navigate to="/products" />} />
                    <Route path={'/products/edit/:productId'} element={ item.length === 0 ? <Navigate to="/products" /> :  <EditingPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
