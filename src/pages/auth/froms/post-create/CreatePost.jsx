import React, {useContext, useEffect, useState} from 'react'

import global from '../../../../global.module.css'
import styles from './create-post.module.css'

import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'

import trash from '../../../../asserts/icons/update/trash-2.svg'
import archive from '../../../../asserts/icons/update/archive-restore.svg'
import plus from '../../../../asserts/icons/update/plus.svg'
import minus from '../../../../asserts/icons/update/plus-1.svg'
import send from '../../../../asserts/icons/update/send.svg'


import {OverlayContext} from '../../../../context/OverlayContext'
import MessageBox from '../../../../components/message-box/MessageBox'
import {useAuth} from '../../../../provider/AuthProvider'
import ContextDrop from '../../../../components/context-drop/ContextDrop'
import ContextGroup from '../../../../components/context-drop/context-group/ContextGroup'
import {useTags} from '../../../../context/TagsContext'
import {useDispatch} from 'react-redux'
import {createPost} from '../../../../redux/slices/post'
import Textarea from '../../../../components/ui/input/textarea/Textarea'

import ContentAddBlock from './content-add-block/ContentAddBlock'

import Button from "../../../../components/ui/buttons/button/Button";
import InputText from "../../../../components/ui/input/input-text/InputText";
import InputFile from "../../../../components/ui/input/input-file/InputFile";
import InputToggle from "../../../../components/ui/input/input-toggle/InputCheckbox";
import RoundButton from "../../../../components/ui/buttons/rounded-button/RoundedButton";
import {useNavigate} from "react-router-dom";

function CreatePost() {

    const formData = new FormData()

    const [childBlocks, setChildBlocks] = useState([{id: 1, type: 'text', content: null, name: ''}]);


    const {groupTags, creativeTags} = useTags()
    const {user} = useAuth()
    const {overlay, setOverlay} = useContext(OverlayContext)

    const navigate = useNavigate()

    const [file, setFile] = useState(null)
    const [fileURL, setFileURL] = useState(null)

    const dispatch = useDispatch()
    const [save, setSave] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState()




    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(childBlocks);
        // console.log(description)
        const errors = []
        if (!file) {
            errors.push('Загрузите фото или видео')
        }
        if (!title) {
            errors.push('Добавьте заголовок к посту')
        }
        if (!description) {
            errors.push('Добавьте описание')
        }
        if (errors.length > 0) {
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

        if (childBlocks.length > 0) {
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
            navigate(`/profile/${user?.id}`)
        } catch (err) {
            console.log(err)
        }
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
                let image = document.createElement("img")

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
                        const newFile = new File([blob], uploadedFile.name, {type: 'image/jpeg'});
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
            {id: childBlocks.length + 1, type: 'text', content: ''},
        ]);
    };

    const deleteChildBlock = () => {
        setChildBlocks(prevBlocks => prevBlocks.slice(0, prevBlocks.length - 1));
    };

    const updateChildBlock = (childBlockId, updates) => {
        setChildBlocks(
            childBlocks.map((childBlock) =>
                childBlock.id === childBlockId ? {...childBlock, ...updates} : childBlock
            )
        );
    };

    useEffect(() => {
        // console.log(childBlocks)
    }, [file, childBlocks])


    return (
        <div>
            {overlay ?
                <MessageBox type={'help'} visability={true}/>
                : null
            }
            <div className={styles.grid}>
                <div className={styles.main}>
                    <BackCreate greenText={'Сохранить'} click={() => setSave(!save)} button
                                description={'Как будет выглядеть ваш пост?'}/>
                    {
                        save ?
                            <div className={styles.save}>
                                <ContextDrop>
                                    <ContextGroup>
                                        <Button type={'submit'} form={'save_my_post'} img={send} img_size={'h-5'}>
                                            Опубликовать
                                        </Button>
                                    </ContextGroup>
                                    <ContextGroup>
                                        <div className={global.flex}>
                                            <InputToggle/>
                                            <div className={`${global.flex} ${global.f_dir_column} ${styles.dateLabel}`}>
                                            <h3 className={`${global.t3} ${global.medium} `}>
                                                Отложенная
                                                публикация</h3>
                                            <h3 className={`${global.d3} ${global.medium}  `}>
                                                Выберете дату публикации
                                            </h3>
                                            </div>
                                        </div>
                                        <InputText place={'Отложенная публикация'} type={'date'}
                                            // value={birthDay ? birthDay : formattedDate  }
                                            // onChange={e=> setBirthDay(e.target.value)}
                                        />
                                    </ContextGroup>
                                    <ContextGroup noafter>
                                        <div className={`${global.flex} ${global.f_dir_column}`}>
                                            <Button type={'submit'} img={archive} img_size={'h-5'}>
                                                В черновик
                                            </Button>
                                            <Button variant={'red-text'} img={trash} img_size={'h-5'}>
                                                Удалить
                                            </Button>
                                        </div>
                                    </ContextGroup>
                                </ContextDrop>
                            </div>
                            : null
                    }
                </div>
                {/*todo: по клику плавное появление меню сохранения*/}
                <form onSubmit={handleSubmit} id={'save_my_post'}>
                    <div className={styles.content}>
                        <div className={styles.spanImage}>
                            {/*<InputFile onChange={handleChange} value={fileURL} />*/}

                            {file === null || file === undefined ?
                                <InputFile onChange={handleChange} value={fileURL} id={'mainImage'} />
                                :
                                <div className={styles.mainImage}>
                                    <img src={fileURL} className={styles.image} width={1250} height={520} alt={'temp'}/>
                                    <div className={styles.delete}>
                                        <input type={'file'} id={'input_file'} style={{display: 'none'}}
                                               onChange={handleChange}/>
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
                        {/*<div className={styles.inputDescription}>*/}
                        <div className={styles.mainInputs}>
                            <h2 className={`${global.t3} ${global.medium}`}>Заголовок поста</h2>
                            <InputText place="Добавьте заголовок" value={title}
                                       onChange={(e) => setTitle(e.target.value)}/>
                            <h2 className={`${global.t3} ${global.medium}`}>Цена</h2>
                            <InputText place="Определите цену" type={'number'} value={price}
                                       onChange={(e) => setPrice(e.target.value)}/>
                            <h2 className={`${global.t3} ${global.medium}`}>Описание</h2>
                            <div className={global.d3}>
                                <Textarea place={'Добавьте описание'} rows={10}
                                          onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>

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
                            <RoundButton text={'Добавить блок'} img={plus} onClick={addChildBlock}/>
                            <RoundButton text={'Удалить  блок'} img={minus} onClick={deleteChildBlock}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost