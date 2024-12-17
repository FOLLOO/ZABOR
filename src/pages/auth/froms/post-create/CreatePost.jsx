import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from "react-router-dom";

import global from '../../../../global.module.css'
import styles from './create-post.module.css'

//components
import BackCreate from '../../../../components/toolbar/backCreate-toolbar/BackCreate'
import ContextDrop from '../../../../components/context-drop/ContextDrop'
import ContextGroup from '../../../../components/context-drop/context-group/ContextGroup'
import Textarea from '../../../../components/ui/input/textarea/Textarea'
import ContentAddBlock from './content-add-block/ContentAddBlock'
import Button from "../../../../components/ui/buttons/button/Button";
import InputText from "../../../../components/ui/input/input-text/InputText";
import InputFile from "../../../../components/ui/input/input-file/InputFile";
import InputToggle from "../../../../components/ui/input/input-toggle/InputCheckbox";
import RoundButton from "../../../../components/ui/buttons/rounded-button/RoundedButton";
import LittleTag from "../../../../components/ui/input/little-tag/LittleTag";
import SettingsBlock from "../../../../components/toolbar/settings-block/SettingsBlock";

//img
import trash from '../../../../asserts/icons/update/trash-2.svg'
import archive from '../../../../asserts/icons/update/archive-restore.svg'
import plus from '../../../../asserts/icons/update/plus.svg'
import minus from '../../../../asserts/icons/update/plus-1.svg'
import send from '../../../../asserts/icons/update/send.svg'

//utils
import {useAuth} from '../../../../provider/AuthProvider'
import {useTags} from '../../../../context/TagsContext'
import {createPost, getPost, updatePost} from '../../../../redux/slices/post'
import {fetchCreativeTags} from "../../../../redux/slices/tag";
import {Helmet} from "react-helmet";
import {IMAGE_URL} from "../../../../utils";
import Loading from "../../../loading/Loading";
import ServerError from "../../../server/ServerError";
import postAudience from "../../analytics/post-analytics/post-audience/PostAudience";




function CreatePost() {

    const formData = new FormData()

    const { id} = useParams()

    const {groupTags, creativeTags} = useTags()
    const {user} = useAuth()
    const { creative_tags } = useSelector(state => state.allTags)
    const {items, status} = useSelector(state => state.posts.OnePost)

    const navigate = useNavigate()

    const [childBlocks, setChildBlocks] = useState([{id: 1, type: 'text', content: null, name: ''}]);
    const [file, setFile] = useState(null)
    const [fileURL, setFileURL] = useState(null)

    const dispatch = useDispatch()
    const [save, setSave] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState()

    // const [searchTags, setSerchTags] = useState('')
    const [loading, setLoading] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = [];

        let checkboxes = document.getElementsByName("checkbox");
        let selectedCboxes = Array.prototype.slice.call(checkboxes)
            .filter(ch => ch.checked == true)
            .map(ch => ch.id);

        const validations = [
            { condition: !file, message: 'Загрузите фото или видео' },
            { condition: !title, message: 'Добавьте заголовок к посту' },
            { condition: !description, message: 'Добавьте описание' },
            { condition: selectedCboxes.length === 0, message: 'Выберете хотя бы один тег' },
        ];
        validations.forEach(({ condition, message }) => {
            if (condition) {
                errors.push(message);
            }
        });
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }


        const filterObj = childBlocks.map((obj) => {
            const {
                name,
                ...rest
            } = obj
            return {...rest}
        })
        // меняем роль, если он не изменился еще
        let USS = localStorage.getItem('user');
        if(USS){
            USS = JSON.parse(USS)
            USS.roleId = 2;
            localStorage.setItem('user', JSON.stringify(USS));
        }


        formData.append('file', file)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('ageLimitId', 1)
        formData.append('tags', JSON.stringify(selectedCboxes))
        formData.append('price', price)
        formData.append('groupTags', JSON.stringify(user?.roleId === 1 ? groupTags[0] : null))
        formData.append('creativeTags', JSON.stringify(user?.roleId === 1 ? creativeTags[0] : null))
        formData.append('blocks', JSON.stringify(filterObj))
        formData.append('cover', file)

        if (childBlocks.length > 0) {
            for (const childBlock of childBlocks) {
                if (childBlock.type === 'text') continue;
                formData.append('file', childBlock.name)
            }
        }

        try {
            dispatch(createPost(formData))
            navigate(`/profile/${user?.id}`)
        } catch (err) {
            console.log(err)
        }
    }
    const getTags = () => {
        try{
            dispatch(fetchCreativeTags()).then((response) => {
                if(response){
                    setLoading(false)
                }
            })
        }catch (e){
            console.log(e)
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

    const editPublication = async (e) => {

        e.preventDefault()
        const errors = [];

        const validations = [
            { condition: !file, message: 'Загрузите фото или видео' },
            { condition: !title, message: 'Добавьте заголовок к посту' },
            { condition: !description, message: 'Добавьте описание' },
        ];
        validations.forEach(({ condition, message }) => {
            if (condition) {
                errors.push(message);
            }
        });
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        formData.append('title', title)
        formData.append('description', description)
        formData.append('ageLimitId', 1)
        formData.append('price', price)
        formData.append('cover', file)

        try {
            const resultAction = await dispatch(updatePost({id, formData}))
            // console.log(resultAction)
            // navigate(`/profile/${user?.id}`)
        } catch (err) {
            console.log(err)
        }
    }
    const getPublication = () => {
        try {
            dispatch(getPost(id))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoading(true);
            await getPublication();
            setLoading(false);
        };

        fetchData();
    }, [id]);

// Обновление состояний после загрузки `items`
    useEffect(() => {
        if (id && status === 'loaded' && items) {
            setTitle(items.title || '');
            setDescription(items.description || '');
            setPrice(items.price || '');
            setFileURL(items.coverUrl || null);
            setFile('costil'); // Заглушка, если это нужно
        }else {
            setTitle('');
            setDescription( '');
            setPrice(null);
            setFileURL( null);
            setFile(null); // Заглушка, если это нужно

        }
    }, [items, status]);

    useEffect(() => {
        // console.log(childBlocks)
    }, [file, childBlocks])

    useEffect(() => {
        if(creative_tags.status === 'loading')
            return getTags()
    }, []);

// Проверка состояния загрузки
    if (loading && id) {
        return <Loading />;
    }

    if (status === 'error') {
        return <ServerError />;
    }


    return (
        <div>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>ZABOR | Создание публикации</title>
                <meta name="description" content={"Создать публикацию"}/>
                <meta name="keywords" content="HTML, CSS, JavaScript"/>
                <meta name="author" content="Sairommef"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>
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
                <form onSubmit={id ? editPublication : handleSubmit} id={'save_my_post'}>
                    <div className={styles.content}>
                        <div className={styles.spanImage}>
                            {file === null || file === undefined ?
                                <InputFile onChange={handleChange} value={fileURL} id={'mainImage'} />
                                :
                                <div className={styles.mainImage}>
                                    <img src={fileURL.includes('/static') ? `${IMAGE_URL}${fileURL}` : fileURL} className={styles.image} width={1250} height={520} alt={'temp'}/>
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
                        <div className={styles.mainInputs}>
                            <h2 className={`${global.t3} `}>Заголовок поста</h2>
                            <InputText place="Добавьте заголовок" value={title}
                                       onChange={(e) => setTitle(e.target.value)}/>
                            <h2 className={`${global.t3} `}>Цена</h2>
                            <InputText place="Определите цену" type={'number'} value={price > 99999 ? 99999 : price} maxValue={99999} minValue={0}
                                       onChange={(e) => setPrice(e.target.value)}/>
                            {id ? null : <SettingsBlock title={'Добавьте теги'} descripton={'Хоп-хей ла-ла лей'}>
                                <div className={styles.tags}>
                                {creative_tags.items.length !== 0 ?
                                    creative_tags.items.map((item, i) => (
                                        <div className={styles.tagsWidth} key={i}>
                                            <LittleTag id={item.id} text={item.name}  name={'checkbox'}/>
                                        </div>
                                    ))
                                : null}
                                </div>
                            </SettingsBlock> }
                            <h2 className={`${global.t3} `}>Описание</h2>
                            <div className={global.d3}>
                                <Textarea place={'Добавьте описание'} rows={10} value={description}
                                          onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>

                        {!id && childBlocks !== undefined && childBlocks.length > 0 ?
                            childBlocks.map((childBlock) => (
                            <ContentAddBlock
                                key={childBlock.id}
                                id={childBlock.id}
                                blockType={childBlock.blockType || childBlock.type}
                                content={childBlock.content || childBlock.text}
                                onUpdate={updateChildBlock}
                            />
                        )) : null}
                        {!id ? <div className={styles.buttons}>
                            <RoundButton text={'Добавить блок'} img={plus} onClick={addChildBlock}/>
                            <RoundButton text={'Удалить  блок'} img={minus} onClick={deleteChildBlock}/>
                        </div> : <p className={`${global.d3} ${global.italic} `}>К сожалению нельзя изменить содержание поста</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost