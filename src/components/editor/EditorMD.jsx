import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';

import edjsHTML from 'editorjs-html';

const DEFAULT_INITIAL_DATA =  {
    "time": new Date().getTime(),
    "blocks": []
}

const EditorComponent = () => {
    const ejInstance = useRef();
    const edjsHTMLparser = edjsHTML()
    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            data: DEFAULT_INITIAL_DATA,
            onChange: async () => {
                let content = await editor.saver.save();
                console.log(edjsHTMLparser.parse(content));
            },
            tools: {
                header: Header,
            },
            i18n: {
                /**
                 * @type {I18nDictionary}
                 */
                messages: {
                    /**
                     * Other below: translation of different UI components of the editor.js core
                     */
                    "ui": {
                        "blockTunes": {
                            "toggler": {
                                "Click to tune": "Нажмите, чтобы настроить",
                                "or drag to move": "или перетащите"
                            },
                        },
                        "inlineToolbar": {
                            "converter": {
                                "Convert to": "Конвертировать в"
                            }
                        },
                        "toolbar": {
                            "toolbox": {
                                "Add": "Добавить",
                            }
                        },
                        "popover": {
                            "Filter": "Поиск",
                            "Nothing found": "Ничего не найдено",
                            "Convert to": "Конвертировать в"
                        }
                    },

                    /**
                     * Section for translation Tool Names: both block and inline tools
                     */
                    "toolNames": {
                        "Text": "Параграф",
                        "Heading": "Заголовок",
                        "List": "Список",
                        "Warning": "Примечание",
                        "Checklist": "Чеклист",
                        "Quote": "Цитата",
                        "Code": "Код",
                        "Delimiter": "Разделитель",
                        "Raw HTML": "HTML-фрагмент",
                        "Table": "Таблица",
                        "Link": "Ссылка",
                        "Marker": "Маркер",
                        "Bold": "Полужирный",
                        "Italic": "Курсив",
                        "InlineCode": "Моноширинный",
                        "Image": "Картинка"
                    },


                    /**
                     * Section for passing translations to the external tools classes
                     */
                    "tools": {
                        /**
                         * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
                         * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
                         */
                        "warning": { // <-- 'Warning' tool will accept this dictionary section
                            "Title": "Название",
                            "Message": "Сообщение",
                        },

                        /**
                         * Link is the internal Inline Tool
                         */
                        "link": {
                            "Add a link": "Вставьте ссылку"
                        },
                        /**
                         * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
                         */
                        "stub": {
                            'The block can not be displayed correctly.': 'Блок не может быть отображен'
                        },
                        "image": {
                            "Caption": "Подпись",
                            "Select an Image": "Выберите файл",
                            "With border": "Добавить рамку",
                            "Stretch image": "Растянуть",
                            "With background": "Добавить подложку",
                        },
                        "code": {
                            "Enter a code": "Код",
                        },
                        "linkTool": {
                            "Link": "Ссылка",
                            "Couldn't fetch the link data": "Не удалось получить данные",
                            "Couldn't get this link data, try the other one": "Не удалось получить данные по ссылке, попробуйте другую",
                            "Wrong response format from the server": "Неполадки на сервере",
                        },
                        "header": {
                            "Header": "Заголовок",
                            "Heading 1" : "Заголовок 1",
                            "Heading 2" : "Заголовок 2",
                            "Heading 3" : "Заголовок 3",
                            "Heading 4" : "Заголовок 4",
                        },
                        "paragraph": {
                            "Enter something": "Введите текст"
                        },
                        "list": {
                            "Ordered": "Нумерованный",
                            "Unordered": "Маркированный",
                        }
                    },

                    /**
                     * Section allows to translate Block Tunes
                     */
                    "blockTunes": {
                        /**
                         * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
                         * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
                         *
                         * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
                         */
                        "delete": {
                            "Delete": "Удалить"
                        },
                        "moveUp": {
                            "Move up": "Переместить вверх"
                        },
                        "moveDown": {
                            "Move down": "Переместить вниз"
                        }
                    },
                }
            },
        });
    };

    // This will run only once
    useEffect(() => {
        if (ejInstance.current === null) {
            initEditor();
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        };
    }, []);

    return  <><div id='editorjs'></div></>;
}

export default EditorComponent;