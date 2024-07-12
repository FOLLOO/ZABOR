import React from 'react'
import { BubbleMenu, EditorProvider, FloatingMenu, useCurrentEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

import './TipTap.css'

const extensions = [
  StarterKit,
]

// const content = '<p>Hello World!</p>'
function TempEditor (props) {

  const MenuBar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
      return null
    }

    return (
      <div className="control-group">
        <div className="button-group">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
          >
            H4
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
          >
            H5
          </button>
          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}*/}
          {/*  className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}*/}
          {/*>*/}
          {/*  H6*/}
          {/*</button>*/}

          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().undo().run()}*/}
          {/*  disabled={*/}
          {/*    !editor.can()*/}
          {/*      .chain()*/}
          {/*      .focus()*/}
          {/*      .undo()*/}
          {/*      .run()*/}
          {/*  }*/}
          {/*>*/}
          {/*  Вернуть*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().redo().run()}*/}
          {/*  disabled={*/}
          {/*    !editor.can()*/}
          {/*      .chain()*/}
          {/*      .focus()*/}
          {/*      .redo()*/}
          {/*      .run()*/}
          {/*  }*/}
          {/*>*/}
          {/*  Вернуть*/}
          {/*</button>*/}

        </div>
      </div>
    )
  }

  return (
    <div >
    <EditorProvider  extensions={extensions} >
      <BubbleMenu> <MenuBar/> </BubbleMenu>
    </EditorProvider>
    </div>
  )
}

export default TempEditor