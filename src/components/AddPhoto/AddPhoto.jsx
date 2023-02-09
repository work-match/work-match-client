import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Register/Loading'
import style from '../Register/buttons.module.css'

export default function AddPhoto({ uploadPhoto, image, setImage, defaultImage }) {
  const { user } = useSelector(state => state.user)
  const [ load, setLoad ] = useState(false)

  const prevImage = user.image
  
  const handlerImage = async event => {
    const tempImage = event.target.files[0]
    const data = new FormData()
    data.append('file', tempImage)
    data.append('upload_preset', 'Images')
    setLoad(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/djr3toaxt/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const img_url = await res.json()
    setImage(img_url.secure_url)
    setLoad(false)
  };

  const addImageHandler = (event) => {
    event.preventDefault()
    document.getElementById('modalProfile').showModal()
    document.getElementById('modalProfile').classList.add('showModal')
  }

  const exitModal = (event) => {
    event.preventDefault()
    setImage(!prevImage ? defaultImage : prevImage)
    document.getElementById('modalProfile').close()
    document.getElementById('modalProfile').classList.remove('showModal')
  }

  return (
    <>
      <dialog id='modalProfile'>
        <h3>Elige una imagen de perfil</h3>
        <input type="file" name="upload-image" className={style['upload-image']} onChange={handlerImage}/>
        {load ? <Loader width={true} preview={'preview'}/> : <img src={image} width='300' alt='profile'/>}
        <div className={style['buttons-container']}>
        <button
          className={`${style['exit-modal']}`}
          onClick={exitModal}>
            Cancelar
        </button>
        <button
          className={`${style['success-upload']}`}
          onClick={uploadPhoto}>
            Cargar
        </button>
        </div>
      </dialog>
      <button
        className={`${style['add-photo']}`}
        onClick={addImageHandler}>
          +
      </button>
    </>
  )
}