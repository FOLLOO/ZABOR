import React, { useState } from 'react'

import styles from './content-add.module.css'
import global from '../../../../../global.module.css'
import ContextDrop from '../../../../../components/context-drop/ContextDrop'
import text from '../../../../../asserts/icons/contextMenu/Текст.png'
import fule from '../../../../../asserts/icons/contextMenu/Файл.png'
import video from '../../../../../asserts/icons/contextMenu/Видео.png'
import photo from '../../../../../asserts/icons/contextMenu/Фото.png'
import TipTapEditor from '../../../../../components/temp/TipTapEditor'
import TransprantButton from '../../../../../components/ui/buttons/transprant-button/TransprantButton'
import GreenButton from '../../../../../components/ui/buttons/green-button/GreenButton'
import InputText from '../../../../../components/ui/input/input-text/InputText'
import Textarea from '../../../../../components/ui/input/textarea/Textarea'

const ContentAddBlock = ({ id, blockType, content, onUpdate }) => {

  const [type, setType] = useState(blockType)
  const [value, setValue] = useState(content)
  const [fileURL, setFileURL] = useState(null)


  const handleContentChange = (event) => {
    if (event.target === undefined) {
      const newContent = event
      setValue(newContent)
      onUpdate(id, { type: type, content: newContent })
    } else {
      const newContent = event.target.value
      setValue(newContent)
      onUpdate(id, { type: type, content: newContent })
    }
  }

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    const WIDTH = 1250;
    if (uploadedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|)$/i;
      if (!allowedExtensions.exec(uploadedFile.name)) {
        alert('Неверный формат файла. Пожалуйста, загрузите файл в формате .jpg, .jpeg, .png');
        event.target.value = null; // Сбросить значение input
        return;
      }
      let reader = new FileReader()
      reader.readAsDataURL(uploadedFile)

      reader.onload = (event) => {
        let image_url = event.target.result;
        let image =  document.createElement("img")

        image.src = image_url;

        image.onload = (e) => {
          let canvas = document.createElement("canvas");
          let ratio = WIDTH / e.target.width;
          canvas.width = WIDTH;
          canvas.height = e.target.height * ratio;

          const context = canvas.getContext("2d")
          context.drawImage(image, 0, 0, canvas.width, canvas.height)

          let new_image_url = context.canvas.toDataURL("image/jpeg", 90)

          let new_image = document.createElement("img")
          new_image.src = new_image_url;

          setFileURL(new_image_url)

          canvas.toBlob((blob) => {
            // Создаем новый File объект из Blob
            const newFile = new File([blob], uploadedFile.name, { type: 'image/jpeg' });
            // setFile(newFile); // Сохраняем File в состоянии
            onUpdate(id, { type: type, content: newFile }) // Сохраняем File в состоянии
          }, 'image/jpeg', 0.9);
          // console.log(onUpdate)
          console.log(fileURL)
        }
      }
    }
  }

  return (
    <div className={styles.text}>
      {type === undefined ?
      <div className={`${global.flex} ${styles.contextAdd}`}>
        <button type="button" className={styles.buttonToAdd} onClick={() => setType('text')}>
          <div className={`${global.flex} ${global.f_dir_column} ${global.f_a_center}`}>
            <img src={text} alt={'Добавить'}/>
            <div className={global.d3}>
              Текст
            </div>
          </div>
        </button>
        <button type="button" className={styles.buttonToAdd} onClick={() => setType('file')}>
          <div className={`${global.flex} ${global.f_dir_column} ${global.f_a_center}`}>
            <img src={fule} alt={'Добавить'}/>
            <div className={global.d3}>
              Файл
            </div>
          </div>
        </button>
        <button type="button" className={styles.buttonToAdd} onClick={() => setType('video')}>
          <div className={`${global.flex} ${global.f_dir_column} ${global.f_a_center}`}>
            <img src={video} alt={'Добавить'}/>
            <div className={global.d3}>
              Видео
            </div>
          </div>
        </button>
        <button type="button" className={styles.buttonToAdd} onClick={() => setType('image')}>
          <div className={`${global.flex} ${global.f_dir_column} ${global.f_a_center}`}>
            <img src={photo} alt={'Добавить'}/>
            <div className={global.d3}>
              Фото
            </div>
          </div>
        </button>
      </div>
      : null}

      {type === 'text' && (
        <TipTapEditor
          bubble
          place={'Напишите что нибудь'}
          getValue={handleContentChange}
        />
      )}
      {type === 'image' && (
        // <input type="file" accept={'image/*'}  onChange={handleFileChange} />

        <div className={styles.fileUpload}>
          <GreenButton click={() => document.querySelector(`.${styles.fileUploadInput}`).click()} text={!fileURL ? 'Выбрать фото' : 'Изменить фото'} />
          <div className={styles.imageUploadWrap}>
            <input
              className={styles.fileUploadInput}
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            {!fileURL ? <div className={`${global.d1} ${styles.delete}`}> Или перетащите фото сюда </div> : null}
          </div>
          <div className={styles.fileUploadContent}>
            {fileURL ?
              <div>
              <img className={styles.fileUploadImage} src={fileURL} alt="image"/>

              </div>
              : null}
          </div>
        </div>

      )}
      {type === 'video' && (
        <input type="file" accept={'video/*'} onChange={handleFileChange}/>
      )}
      {type === 'file' && (
        <input type="file" onChange={handleFileChange}/>
      )}
    </div>
  )
}

export default ContentAddBlock
