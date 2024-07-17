import React from 'react'
import { BubbleMenu, EditorContent,  FloatingMenu, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import './TipTap.css'

// const extensions = [
//   StarterKit,
// ]

// const content = '<p>Hello World!</p>'
// function TipTapEditor ({bubble = false, place, }) {
//
//
//   const { editor } = new Editor({
//     onUpdate: ({editor}) => {
//       const json = editor.getJSON()
//       console.log(json)
//     }
//   })
//
//   const MenuBar = () => {
//     const { editor } = useCurrentEditor();
//
//     if (!editor) {
//       return null
//     }
//
//     return (
//       <div className="control-group">
//         <div className="button-group">
//           <button
//             onClick={() => editor.chain().focus().toggleBold().run()}
//             className={editor.isActive('bold') ? 'is-active' : ''}
//           >
//             Жирный
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleItalic().run()}
//             className={editor.isActive('italic') ? 'is-active' : ''}
//           >
//            Курсив
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleStrike().run()}
//             className={editor.isActive('strike') ? 'is-active' : ''}
//           >
//             Зачеркнутый
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleCode().run()}
//             className={editor.isActive('code') ? 'is-active' : ''}
//           >
//             Код
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//             className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
//           >
//             H1 - Заголовок 1
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//             className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
//           >
//             H2 - Заголовок 2
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//             className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
//           >
//             H3 - Заголовок 3
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
//             className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
//           >
//             H4 - Заголовок 4
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
//             className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
//           >
//             H5 - Заголовок 5
//           </button>
//
//           <button
//             onClick={() => editor.chain().focus().toggleBulletList().run()}
//             className={editor.isActive('bulletList') ? 'is-active' : ''}
//           >
//             Макеры
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//             className={editor.isActive('codeBlock') ? 'is-active' : ''}
//           >
//             Блок кода
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleBlockquote().run()}
//             className={editor.isActive('blockquote') ? 'is-active' : ''}
//           >
//             Цитата
//           </button>
//           <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
//             Горизонтальная линия
//           </button>
//           {/*<button onClick={() => editor.chain().focus().setHardBreak().run()}>*/}
//           {/*  Красная строка*/}
//           {/*</button>*/}
//           <button onClick={() => editor.chain().focus().undo().run()}>
//             Вернуть назад
//           </button>
//           <button onClick={() => editor.chain().focus().redo().run()}>
//             Вернуть вперед
//           </button>
//         </div>
//       </div>
//     )
//   }
//
//
//   return (
//     <div >
//     <EditorProvider  extensions={extensions}  content={place}>
//       {/*{bubble ? <BubbleMenu > <MenuBar /> </BubbleMenu> : null }*/}
//     </EditorProvider>
//     </div>
//   )
// }
//
// export default TipTapEditor

function TipTapEditor ({getValue}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: ` `,
    onUpdate: ({editor}) => {
      const html = editor.getHTML()
      // const json = editor.getJSON()
      getValue(html)
      // getValue(json)
    }
  })

  return (
    <>
      {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <div className="control-group">
          <div className="button-group">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              Жирный
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              Курсив
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              Зачеркнутый
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive('code') ? 'is-active' : ''}
            >
              Код
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
              H1 - Заголовок 1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
              H2 - Заголовок 2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
              H3 - Заголовок 3
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
            >
              H4 - Заголовок 4
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
              className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
            >
              H5 - Заголовок 5
            </button>

            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              Макеры
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
              Блок кода
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
              Цитата
            </button>
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              Горизонтальная линия
            </button>
            {/*<button onClick={() => editor.chain().focus().setHardBreak().run()}>*/}
            {/*  Красная строка*/}
            {/*</button>*/}
            <button onClick={() => editor.chain().focus().undo().run()}>
              Вернуть назад
            </button>
            <button onClick={() => editor.chain().focus().redo().run()}>
              Вернуть вперед
            </button>
          </div>
        </div>
      </BubbleMenu>}

      {editor && <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <div className="control-group">
          <div className="button-group">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              Жирный
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              Курсив
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              Зачеркнутый
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive('code') ? 'is-active' : ''}
            >
              Код
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
              H1 - Заголовок 1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
              H2 - Заголовок 2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
              H3 - Заголовок 3
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
            >
              H4 - Заголовок 4
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
              className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
            >
              H5 - Заголовок 5
            </button>

            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              Макеры
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
              Блок кода
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
              Цитата
            </button>
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              Горизонтальная линия
            </button>
            {/*<button onClick={() => editor.chain().focus().setHardBreak().run()}>*/}
            {/*  Красная строка*/}
            {/*</button>*/}
            <button onClick={() => editor.chain().focus().undo().run()}>
              Вернуть назад
            </button>
            <button onClick={() => editor.chain().focus().redo().run()}>
              Вернуть вперед
            </button>
          </div>
        </div>
      </FloatingMenu>}

      <EditorContent editor={editor} />
    </>
  )
}

export default TipTapEditor