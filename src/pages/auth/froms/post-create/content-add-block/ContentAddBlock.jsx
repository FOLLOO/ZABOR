import React, {useMemo, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import edjsHTML from 'editorjs-html';
//css
import styles from './content-add.module.css'
import global from '../../../../../global.module.css'

//image
import textIcon from '../../../../../asserts/icons/update/text.svg'
import videoIcon from '../../../../../asserts/icons/update/file-video-2.svg'
import photoIcon from '../../../../../asserts/icons/update/file-image.svg'

//components
import Button from "../../../../../components/ui/buttons/button/Button";
import RoundButton from "../../../../../components/ui/buttons/rounded-button/RoundedButton";
import EditorMd from "../../../../../components/editor/EditorMD";
const ContentAddBlock = ({ id, blockType,  onUpdate }) => {

  const [type, setType] = useState(blockType)
  const [fileURL, setFileURL] = useState(null)

  const [data, setData] = useState({
    "time": new Date().getTime(),
    "blocks": [],
  })

  const handleContentChange = (param) => {
      const edjsHTMLparser = edjsHTML()
      const cont = edjsHTMLparser.parse(param)
      onUpdate(id, { type: type, content: cont.join('\n') })
  }
  // console.log(data

  const handleVideoChange = (event) => {
    const uploadedFile = event.target.files[0]
    if (uploadedFile) {
      const allowedExtensions = /(.mp4|.h264|)$/i
      if (!allowedExtensions.exec(uploadedFile.name)) {
        alert('Неверный формат файла. Пожалуйста, загрузите файл в формате .mp4, .h264')
        event.target.value = null // Сбросить значение input
        return
      }
      const newContent = URL.createObjectURL(uploadedFile)
      setFileURL(newContent)
      onUpdate(id, { type: 'file', content: uploadedFile.name, name: uploadedFile })
    }
  }

  const handleImageChange = (event) => {
    const uploadedFile = event.target.files[0]
    const WIDTH = 1250
    if (uploadedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|)$/i
      if (!allowedExtensions.exec(uploadedFile.name)) {
        alert('Неверный формат файла. Пожалуйста, загрузите файл в формате .jpg, .jpeg, .png')
        event.target.value = null // Сбросить значение input
        return
      }
      let reader = new FileReader()
      reader.readAsDataURL(uploadedFile)

      reader.onload = (event) => {
        let image_url = event.target.result
        let image = document.createElement('img')

        image.src = image_url

        image.onload = (e) => {
          let canvas = document.createElement('canvas')
          let ratio = WIDTH / e.target.width
          canvas.width = WIDTH
          canvas.height = e.target.height * ratio

          const context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, canvas.width, canvas.height)

          let new_image_url = context.canvas.toDataURL('image/jpeg', 90)

          let new_image = document.createElement('img')
          new_image.src = new_image_url

          setFileURL(new_image_url)

          canvas.toBlob((blob) => {
            // Создаем новый File объект из Blob
            const newFile = new File([blob], uploadedFile.name, { type: 'image/jpeg' })
            // setFile(newFile); // Сохраняем File в состоянии
            onUpdate(id, { type: 'file', content: uploadedFile.name, name: newFile }) // Сохраняем File в состоянии
          }, 'image/jpeg', 0.9)
          // console.log(fileURL)
        }
      }
    }
  }

  const DefaultButtons = () => {
    return (
        <div className={`${global.flex} ${styles.contextAdd}`}>
          <RoundButton onClick={() => setType('text')} img={textIcon} text={'Текст'}/>
          {/*<RoundButton onClick={() => setType('file')} img={fileIcon} text={'Файла'}/>*/}
          <RoundButton onClick={() => setType('video')} img={videoIcon} text={'Видео'}/>
          <RoundButton onClick={() => setType('image')} img={photoIcon} text={'Фото'}/>
        </div>
    )
  }

  function Text(){
    return (
          <EditorMd value={data} change={handleContentChange} ID={`editor-${uuidv4().toString()}`}/>
    )
  }

  const Image = () => {
    return (
        <div className={styles.fileUpload}>

          <div className={styles.buttonWidth}>
            <Button variant={'color'}  type={'button'}
                    className={global.f_center}
                    click={() => document.getElementById(`${id}`).click()}>
              {!fileURL ? 'Выбрать фото' : 'Изменить фото'}
            </Button>
          </div>

          <div className={styles.imageUploadWrap}>
            <input
                id={id}
                className={styles.fileUploadInput}
                type="file"
                onChange={handleImageChange}
                accept="image/*"
            />
            {!fileURL ? (
                <div className={`${global.d1} ${styles.delete}`}>Или перетащите фото сюда</div>
            ) : null}
          </div>
          <div className={styles.fileUploadContent}>
            {fileURL ? (
                <div>
                  <img className={styles.fileUploadImage} src={fileURL} alt="file photo"/>
                </div>
            ) : null}
          </div>
        </div>
    )
  }

  const Video = () => {
    return (
        <div className={styles.fileUpload}>
          <div className={styles.buttonWidth}>
            <Button variant={'color'} type={'button'}
                    className={global.f_center}
                    click={() => document.getElementById(`${id}`).click()}>
              {!fileURL ? 'Выбрать фото' : 'Изменить фото'}
            </Button>
          </div>
            {!fileURL ? (
          <div className={styles.imageUploadWrap}>
                <input
                id={id}
                className={styles.videoUploadInput}
                type="file"
                onChange={handleVideoChange}
                accept="video/*"
            />
                <div className={`${global.d1} ${styles.delete}`}>Или перетащите видео сюда</div>
          </div>
            ) : null}
            {fileURL ? (
                <video controls className={styles.video}>
                  <source src={fileURL} type="video/mp4"/>
                  Извините, ваш браузер не поддерживает воспроизведение видео.
                </video>
            ) : null}
        </div>
    )
  }

  const renderSwitch = (param) => {
    switch (param) {
      case 'text' :
        return <Text/>
      case 'image' :
        return <Image />
      case  'video' :
        return <Video/>
      default:
        return <DefaultButtons/>
    }
  }

  const render = useMemo(() => renderSwitch(type), [type, fileURL])

  return (
      <div className={styles.text}>
        {render}
      </div>
  )

}

export default ContentAddBlock
