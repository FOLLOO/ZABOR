import React, { useContext, useEffect, useState } from 'react'

import global from '../../../../global.module.css'
import styles from './create-post.module.css'

import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import CardLittle from '../../../../components/post/post-cards/card-little/CardLittle'

import temp from '../../../../asserts/temp/temp1.png'
import trash from '../../../../asserts/icons/contextMenu/trash red.svg'
import save_i from '../../../../asserts/icons/contextMenu/save.svg'
import submit from '../../../../asserts/icons/contextMenu/submit.svg'

import add from '../../../../asserts/icons/contextMenu/Добавить.png'
import photo from '../../../../asserts/icons/contextMenu/Фото.png'
import video from '../../../../asserts/icons/contextMenu/Видео.png'
import text from '../../../../asserts/icons/contextMenu/Текст.png'
import fule from '../../../../asserts/icons/contextMenu/Файл.png'


import ProfileNickname from '../../../../components/profile/profile-nickname/ProfileNickname'
import WhiteButton from '../../../../components/ui/buttons/white-button/WhiteButton'
import GlassCard from '../../../../components/glasses/glasses-card/GlassCard'
import TipTapEditor from '../../../../components/temp/TipTapEditor'
import GreenButton from '../../../../components/ui/buttons/green-button/GreenButton'
import { OverlayContext } from '../../../../context/OverlayContext'
import MessageBox from '../../../../components/message-box/MessageBox'
import { useAuth } from '../../../../provider/AuthProvider'
import ContextDrop from '../../../../components/context-drop/ContextDrop'
import ContextGroup from '../../../../components/context-drop/context-group/ContextGroup'
import TransprantButton from '../../../../components/ui/buttons/transprant-button/TransprantButton'
import { useTags } from '../../../../context/TagsContext'
import { useDispatch } from 'react-redux'
import { createPost } from '../../../../redux/slices/post'
import { useNavigate } from 'react-router-dom'
import Textarea from '../../../../components/ui/input/textarea/Textarea'
import ChildBlock from '../../../temp/A-Temp/ChildBlock'
import ContentAddBlock from './content-add-block/ContentAddBlock'
import { any } from 'prop-types'
import form from '../../../temp/A-Temp/Form'

function CreatePost (props) {

  const formData = new FormData()

  const [childBlocks, setChildBlocks] = useState([{ id: 1, type: 'text', content: null, name: '' }]);
  // const [type, setType] = useState('');



  const { groupTags, creativeTags } = useTags()
  const { user } = useAuth()
  const { overlay, setOverlay } = useContext(OverlayContext)

  const [file, setFile] = useState(null)
  const [fileURL, setFileURL] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errMes, setErrMes] = useState()
  const [addBlock, setAddBlock] = useState(false)
  const [save, setSave] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')

  const toggleOverlay = () => {
    setOverlay(!overlay)
  }
  function stripHtmlTags (html) {
    return html.replace(/<[^>]*>?/gm, '')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(childBlocks);
    // console.log(description)
    const errors = []
    if (!file){
      errors.push('Загрузите фото или видео')
    }
    if (!title){
      errors.push('Добавьте заголовок к посту')
    }
    if (!description){
      errors.push('Добавьте описание')
    }
    if(errors.length > 0){
      alert(errors.join('\n'))
      return
    }
    const filterObj = childBlocks.map((obj) => {
      const {
        name,
        ...rest
      } = obj
      return {...rest}
    })

    formData.append('file', file)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('ageLimitId', 1)
    formData.append('tags', '[4]')
    formData.append('price', 0)
    // { user.roleId === 1 ?
    formData.append('groupTags', JSON.stringify(user?.roleId === 1 ? groupTags[0] : null))
    // formData.append('groupTags', groupTags[0]);
    formData.append('creativeTags', JSON.stringify(user?.roleId === 1 ? creativeTags[0] : null))
    // formData.append('creativeTags', creativeTags[0]);
    // : null }
    // formData.append('blocks', JSON.stringify([{ type: 'text', content: content }]))
    formData.append('blocks', JSON.stringify(filterObj))
    formData.append('cover', file)

    if (childBlocks.length > 0){
      for (const childBlock of childBlocks) {
        if (childBlock.type === 'text') continue;
        formData.append('file', childBlock.name)
      }
    }

    // const data = {
    //   file: null, // todo: Допилить
    //   title: title,
    //   description: description,
    //   ageLimitId: 1, // todo: Допилить
    //   tags: [4], // todo: Допилить
    //   price: 0, // todo: Допилить
    //   groupTags: groupTags[0],
    //   creativeTags: creativeTags[0],
    //   blocks: [{ type: "text", content: content  }],
    //   cover: null,
    // }
    try {
      console.log('FormData:', formData);
      dispatch(createPost(formData))
      // navigate(`/profile/${user?.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteFile = () =>  {
    setFile(null)
  }
  const handleChange = (event) => {
    const uploadedFile = event.target.files[0];
    const WIDTH = 1250;
    if (uploadedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.mp4)$/i;
      if (!allowedExtensions.exec(uploadedFile.name)) {
        alert('Неверный формат файла. Пожалуйста, загрузите файл в формате .jpg, .jpeg, .png или .mp4.');
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
            setFile(newFile); // Сохраняем File в состоянии
          }, 'image/jpeg', 0.9);
          // console.log(file)
        }
      }
    }
  }


  const addChildBlock = () => {
    setChildBlocks([
      ...childBlocks,
      { id: childBlocks.length + 1, type: 'text', content: '' },
    ]);
  };

  const updateChildBlock = (childBlockId, updates) => {
    setChildBlocks(
      childBlocks.map((childBlock) =>
        childBlock.id === childBlockId ? { ...childBlock, ...updates } : childBlock
      )
    );
    // console.log(childBlocks)
  };

  useEffect(() => {
    console.log(file)
  },[file])


  return (
    <div className={global.pad}>
      {overlay ?
        <MessageBox type={'help'} visability={true}/>
        : null
      }
      <div className={styles.grid}>
        <div className={styles.main}>
          <BackCreate greenText={'Сохранить'} click={() => setSave(!save)} button
                      description={'Так будет выглядеть ваш пост'}/>
          {
            save ?
              <div className={styles.save}>
                <ContextDrop>
                  <ContextGroup>
                    <TransprantButton img={submit} text={'Опубликовать'} type={'submit'} left form={'save_my_post'}/>
                  </ContextGroup>
                  <ContextGroup>
                    Data
                  </ContextGroup>
                  <ContextGroup noafter>
                    <TransprantButton img={save_i} text={'В черновик'} left/>
                    <TransprantButton img={trash} text={'Удалить'} red left/>
                  </ContextGroup>
                </ContextDrop>
              </div>
              : null
          }
        </div>

        <span>

        </span>
        <form onSubmit={handleSubmit} id={'save_my_post'}>
          <div className={styles.content}>
            <div className={styles.spanImage}>
              {file === null || file === undefined ?
                <div className={global.skeleton}>
                  {/*Some*/}
                  <div className={styles.fileUpload}>
                    <input type={'file'}  className={styles.input} onChange={handleChange}/>
                    {/*<TransprantButton text={'Добавить файл'} type={'file'} />*/}
                  </div>
                </div>
                :
                <div  className={styles.mainImage}>
                  <img src={fileURL} className={styles.image} width={1250} height={520} alt={'temp'} style={{
                    overflow: 'hidden',
                    maxHeight: '520px',
                    maxWidth: '1250px',
                    objectFit: 'cover'
                  }}/>

                  {/*<div className={styles.fileUpload}>*/}
                  {/*  /!*<TransprantButton text={'Добавить файл'} type={'file'} />*!/*/}
                  {/*</div>*/}
                  <div className={styles.delete}>
                    <input type={'file'} id={'input_file'} style={{display: 'none'}}  onChange={handleChange}/>
                    <label htmlFor={'input_file'}>
                      <span className={styles.support}>
                          <h5>Импортировать новый файл</h5>
                          <p className={global.d2}>Поддерживаемые форматы: .jpg .jpeg .png .mp4</p>
                      </span>
                    </label>
                  </div>
                </div>
              }
            </div>
            <div className={styles.profile}>
              <ProfileNickname type={'post'} nickname={user?.nickname}/>
              <div className={styles.button}>
                <WhiteButton text={'Подписаться'} disable/>
              </div>
            </div>
            <div className={styles.inputDescription}>
              <GlassCard height>
                <h4>Описание</h4>
                <div className={global.d3}>
                  {/*<TipTapEditor place={"Описание"} getValue={setDescription} />*/}
                  {/*<Textarea rows={10}*/}
                  {/*          onChange={e => setDescription(e.target.value)}*/}
                  {/*          place={'Описание'}*/}
                  {/*          value={description ? description : null} />*/}

                  <TipTapEditor place={'Напишите что нибудь'} getValue={setDescription}/>

                </div>
                {/*{description}*/}
              </GlassCard>
            </div>

            {/*<TipTapEditor bubble place={"Заголовок"}/>*/}
            <input type={'text'} className={styles.title} value={title ? title : null}
                   onChange={e => setTitle(e.target.value)}/>

            {childBlocks.map((childBlock) => (
              <ContentAddBlock
                key={childBlock.id}
                id={childBlock.id}
                blockType={childBlock.blockType}
                content={childBlock.content}
                onUpdate={updateChildBlock}
              />
            ))}

            <div className={styles.buttons}>
              <div className={global.d3}>
                Добавить блок
              </div>
              <button type={'button'} className={styles.buttonToAdd} onClick={addChildBlock}>
                <img src={add} alt={'Добавить'}/>
              </button>
              {/*{*/}
              {/*  addBlock ?*/}
              {/*    <ContextDrop>*/}
              {/*      <div className={`${global.flex} ${styles.contextAdd}`}>*/}
              {/*        <button className={styles.buttonToAdd}  onClick={() => Open('text')}>*/}
              {/*          <div className={`${global.flex} ${global.f_dir_column} ${global.f_a_center}`}>*/}
              {/*            <img src={text} alt={'Добавить'}/>*/}
              {/*            <div className={global.d3}>*/}
              {/*              Текст*/}
              {/*            </div>*/}
              {/*          </div>*/}
              {/*        </button>*/}
              {/*        <button className={styles.buttonToAdd}  onClick={() => Open('video')}>*/}
              {/*          <div className={`${global.flex} ${global.f_dir_column} ${global.f_a_center}`}>*/}
              {/*            <img src={fule} alt={'Добавить'}/>*/}
              {/*            <div className={global.d3}>*/}
              {/*              Файл*/}
              {/*            </div>*/}
              {/*          </div>*/}
              {/*        </button>*/}
              {/*        <button className={styles.buttonToAdd}  onClick={() => Open('video')}>*/}
              {/*          <div className={`${global.flex} ${global.f_dir_column} ${global.f_a_center}`}>*/}
              {/*            <img src={video} alt={'Добавить'}/>*/}
              {/*            <div className={global.d3}>*/}
              {/*              Видео*/}
              {/*            </div>*/}
              {/*          </div>*/}
              {/*        </button>*/}
              {/*        <button className={styles.buttonToAdd}  onClick={() => Open('image')}>*/}
              {/*          <div className={`${global.flex} ${global.f_dir_column} ${global.f_a_center}`}>*/}
              {/*            <img src={photo} alt={'Добавить'}/>*/}
              {/*            <div className={global.d3}>*/}
              {/*              Фото*/}
              {/*            </div>*/}
              {/*          </div>*/}
              {/*        </button>*/}
              {/*      </div>*/}
              {/*    </ContextDrop>*/}
              {/*    : null }*/}
            </div>


            {/*<div className={styles.text}>*/}
            {/*  /!*<TipTapEditor bubble place={'Напишите что нибудь'} getValue={setContent}/>*!/*/}
            {/*</div>*/}


          </div>
        </form>
        <div className={styles.recomends}>
          <h4>Похожее</h4>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
          <CardLittle/>
        </div>
      </div>

    </div>
  )
}

export default CreatePost