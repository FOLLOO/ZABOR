import React, {memo, useEffect, useRef} from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Warning from '@editorjs/warning'
import Quote from '@editorjs/quote'
import Code from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import Link from '@editorjs/link'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'

const EditorComponent = ({change, value, ID}) => {
    const ejInstance = useRef();

    useEffect(() => {
        if (!ejInstance.current) {
            const editor = new EditorJS({
                holder: ID,
                onReady: () => {
                    ejInstance.current = editor;
                    ejInstance.current.focus();
                },
                autofocus: true,
                data: value,
                async onChange(api, event) {
                    const data = await api.saver.save();
                    change(data);
                },
                tools: {
                    paragraph: {
                        config: {
                            placeholder: "Enter something"
                        }
                    },
                    header: {
                        class: Header,
                        inlineToolbar: ['link'],
                        config: {
                            placeholder: 'Header'
                        },
                        shortcut: 'CMD+SHIFT+H'
                    },

                    list: {
                        class: List,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+L'
                    },

                    quote: {
                        class: Quote,
                        inlineToolbar: true,
                        config: {
                            quotePlaceholder: 'Enter a quote',
                            captionPlaceholder: 'Quote\'s author',
                        },
                        shortcut: 'CMD+SHIFT+O'
                    },

                    warning: Warning,

                    marker: {
                        class:  Marker,
                        shortcut: 'CMD+SHIFT+M'
                    },

                    code: {
                        class:  Code,
                        shortcut: 'CMD+SHIFT+C'
                    },

                    delimiter: Delimiter,

                    inlineCode: {
                        class: InlineCode,
                        shortcut: 'CMD+SHIFT+C'
                    },

                    linkTool: Link,
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
                            "Quote": "Цитата",
                            "Code": "Код",
                            "Delimiter": "Разделитель",
                            // "Raw HTML": "HTML-фрагмент",
                            "Link": "Ссылка",
                            "Marker": "Маркер",
                            "Bold": "Полужирный",
                            "Italic": "Курсив",
                            "InlineCode": "Моноширинный",
                            // "Image": "Картинка"
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
            ejInstance.current = editor;
        }

        return () => {
            if (ejInstance.current && ejInstance.current.destroy) {
                ejInstance.current.destroy();
            }
        };
    }, []);

    return  <div id={ID} style={{"padding" : ".5rem"}}></div>;
}

export default memo(EditorComponent);