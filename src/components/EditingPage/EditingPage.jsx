import React, {useEffect, useRef, useState} from 'react';
import CreatureHeader from "../CreatureHeader/CreatureHeader";
import s from '../Creature/Creature.module.css'
import { Editor } from '@tinymce/tinymce-react';
import {useDispatch, useSelector} from "react-redux";
import {updateCurrentProduct} from "../../store/actions/products";
import {Link, useNavigate} from "react-router-dom";
import {updatedSuccess} from "../../store/reducers/productsReducer";
import UpdatePriceBlock from "../PriceBlock/UpdatePriceBlock";
import UpdateUploadFile from "../UploadFile/UpdateUploadFile";


const EditingPage = () => {
    const item = useSelector(state => state.products.item)
    let isUpdatedSuccess = useSelector(state => state.products.isUpdatedSuccess)
    const dispatch = useDispatch()
    const [chosenProduct, setChosenProduct] = useState({...item[0]})
    let navigate = useNavigate();

    const handleUpdate = (event) => {
        setChosenProduct({...chosenProduct, [event.target.name]: event.target.value,
            })
    }

    // с валидацией проблемы некоторые случились, из-за input type file, нужно было изначально какую то библиотеку заюзать наверно
    // валидация с блюром только на поле название товара
    const updateProduct = () => {
        if(chosenProduct.name.length !== 0 && chosenProduct.price.length !== 0 && chosenProduct.img.length !== 0){
            dispatch(updateCurrentProduct(chosenProduct.id, chosenProduct))
            dispatch(updatedSuccess(true))
        }else{
            alert('not all fields are filled in')
        }
    }

    // tinymce value
    const handleEditorChange = (content) => {
        setChosenProduct( {...chosenProduct, aboutProduct:content})
    }

    // при isUpdatedSuccess перекидывает user-а на главную страницу продуктов
    useEffect(() => {
        if (isUpdatedSuccess){
            return navigate("/products");
        }
    },[isUpdatedSuccess])

    // validation
    const [nameDirty, setNameDirty] = useState(false)
    const blurHandler = (e) => {
        setNameDirty(true)
    }

    return (
        <>
            <CreatureHeader text={'Изменить товар'}></CreatureHeader>
            <div className={s.formContainer}>
                <div className={s.formInner}>
                    <div className={s.inputWrap}>
                        <label htmlFor="name">Введите название товара:</label>
                        <input onBlur={blurHandler} onChange={handleUpdate} value={chosenProduct.name} name="name" type="text"/>
                        {(nameDirty && chosenProduct.name.length === 0) && <div style={{color: 'red'}}>Заполните название товара</div>}
                    </div>
                    <div className={s.inputWrap}>
                        <label htmlFor="status">Выберите статус:</label>
                        <select onChange={handleUpdate} value={chosenProduct.status} name="status">
                            <option value="active">active</option>
                            <option value="archive">archive</option>
                        </select>
                    </div>
                    <UpdateUploadFile chosenProduct={chosenProduct} setChosenProduct={setChosenProduct}/>
                </div>

                <Editor onEditorChange={handleEditorChange}
                        apiKey='jqbwk4fswt7rjtrhbmmzcec61wo95vrvc2qlhtqa1rhrd0as'
                        value={chosenProduct.aboutProduct}
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
                <UpdatePriceBlock chosenProduct={chosenProduct} setChosenProduct={setChosenProduct} />
                <div className={s.buttons}>
                    <button onClick={updateProduct}>Edit</button>
                    <button><Link to={'/products'}>Back to products</Link></button>
                </div>
            </div>


        </>
    );
};

export default EditingPage;