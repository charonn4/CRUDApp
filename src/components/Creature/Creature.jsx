import React, {useEffect, useRef, useState} from 'react';
import CreatureHeader from "../CreatureHeader/CreatureHeader";
import s from './Creature.module.css'
import { Editor } from '@tinymce/tinymce-react';
import PriceBlock from "../PriceBlock/PriceBlock";
import {useDispatch, useSelector} from "react-redux";
import {getNewProduct} from "../../store/actions/products";
import {addProductSuccess} from "../../store/reducers/productsReducer";
import {Link, useNavigate} from "react-router-dom";
import UploadFile from "../UploadFile/UploadFile";


const Creature = () => {
    const dispatch = useDispatch()
    const isAddedSuccess = useSelector(state => state.products.isAddedSuccess)

    let navigate = useNavigate();

    const [product, setProduct] = useState({
        id: null,
        name: '',
        status: 'active',
        price: [],
        img: [],
        aboutProduct: ''
    })

    const handleChange = (event) => {
        setProduct({
            ...product, [event.target.name]: event.target.value
        })
    }

    // при IsAddedSuccess перекидывает user-а на главную страницу продуктов
    useEffect(() => {
        if (isAddedSuccess){
            return navigate("/products");
        }
    },[isAddedSuccess])

    // с валидацией проблемы некоторые случились, из-за input type file, нужно было изначально какую то библиотеку заюзать наверно
    // валидация с блюром только на поле название товара
    const addNewProduct = () => {
        if(product.name.length !== 0 && product.img.length !== 0 && product.price.length !== 0){
            dispatch(getNewProduct(product))
            dispatch(addProductSuccess(true))
        }else{
            alert('not all fields are filled in')
        }
    }

    // tinymce value
    const handleEditorChange = (content) => {
        setProduct({...product, aboutProduct: content})
    }

    // validation
    const [nameDirty, setNameDirty] = useState(false)
    const blurHandler = (e) => {
        setNameDirty(true)
    }

    return (
        <>
            <CreatureHeader text={'Добавить товар'}></CreatureHeader>
            <div className={s.formContainer}>
                    <div className={s.formInner}>
                        <div className={s.inputWrap}>
                            <label htmlFor="name">Введите название товара:</label>
                            <input onBlur={blurHandler} value={product.name} onChange={handleChange} name="name" type="text"/>
                            {(nameDirty && product.name.length === 0) && <div style={{color: 'red'}}>Заполните название товара</div>}
                        </div>
                        <div className={s.inputWrap}>
                            <label htmlFor="status">Выберите статус:</label>
                            <select value={product.status} onChange={handleChange} name="status">
                                <option value="active">active</option>
                                <option value="archive">archive</option>
                            </select>
                        </div>
                        <UploadFile product={product} setProduct={setProduct}/>
                    </div>

                    <Editor onEditorChange={handleEditorChange}
                        apiKey='jqbwk4fswt7rjtrhbmmzcec61wo95vrvc2qlhtqa1rhrd0as'
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                <PriceBlock product={product} setProduct={setProduct} />
                <div className={s.buttons}>
                    <button onClick={addNewProduct}>Add</button>
                    <button><Link to={'/products'}>Back to products</Link></button>
                </div>

            </div>


        </>
    );
};

export default Creature;