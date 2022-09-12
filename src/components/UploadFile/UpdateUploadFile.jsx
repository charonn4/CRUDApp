import React, {useEffect, useState} from 'react';
import s from "../Creature/Creature.module.css";

const UpdateUploadFile = ({chosenProduct, setChosenProduct}) => {
    const [images, setImages] = useState([])
    const [imageUrls, setImageUrls] = useState([...chosenProduct.img])

    // когда загружается какой то image то, blob данного image записывается в imageUrls
    useEffect(() => {
        if(images.length < 1) return
        const newImageUrls = []
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
        setImageUrls(prevState => [...newImageUrls, ...prevState])
    }, [images])

    const onImageChange = (event) => {
        setImages([...event.target.files])
    }
    // для удаления какого то image, если его загрузили не правильно или если он не нужен
    const handleDelete = (id) => {
        setImageUrls(imageUrls.filter((url, index) => index !== id ))
    }

    // обязательно нужно нажать на кнопку apply чтоб они сохранились
    const handleApply = () => {
        setChosenProduct({...chosenProduct, img: [...imageUrls]})
    }


    return (
        <div className={s.fileBlock}>
            <input onChange={onImageChange} type="file" hidden id="fileInput" multiple accept="image/*, .png, .jpg"/>
            <span>Image</span>
            <label style={{cursor: "pointer", padding: '20px', border: '1px solid rgb(190 170 170)'}} htmlFor="fileInput">CLICK TO UPLOAD</label>
            <div className={s.file}>
                {imageUrls.length === 0 ? <label htmlFor="fileInput">NO IMAGE</label>
                    :imageUrls.map((imageSrc, index) => <div style={{display: 'flex', flexDirection: 'column'}} key={index}>
                        <img src={imageSrc} alt=""/>
                        <button onClick={() => handleDelete(index)}>delete</button>
                    </div>)}
            </div>
            <button onClick={handleApply}>APPLY CHANGES</button>
        </div>
    );
};

export default UpdateUploadFile;