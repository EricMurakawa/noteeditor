import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { HeadingNode } from '@lexical/rich-text'
import { ListNode, ListItemNode } from '@lexical/list'
import { useEditor } from '@/Contexts/EditorContext'
import Toolbar from './Plugins/Toolbar/Toolbar'
import ImageNode from './Nodes/ImageNode'
import Sidebar from './Components/Sidebar'

export default function Editor({ note, onChange }) {
  const [collapsed, setCollapsed] = useState(false)
  const { inputTitle, setInputTitle, setOriginalTitle } = useEditor()

  // TO DO
  // adicionar titulo
  // scroll paginate na listagem de notas

  const theme = {
    code: 'editor-code',
    heading: {
      h1: 'editor-heading-h1',
      h2: 'editor-heading-h2',
      h3: 'editor-heading-h3',
      h4: 'editor-heading-h4',
      h5: 'editor-heading-h5',
    },
    image: 'editor-image',
    link: 'editor-link',
    list: {
      listitem: 'editor-listitem',
      nested: {
        listitem: 'editor-nested-listitem',
      },
      ol: 'editor-list-ol',
      ul: 'editor-list-ul',
    },
    paragraph: 'editor-paragraph',
    placeholder: 'editor-placeholder',
    quote: 'editor-quote',
    text: {
      bold: 'editor-text-bold',
      code: 'editor-text-code',
      hashtag: 'editor-text-hashtag',
      italic: 'editor-text-italic',
      overflowed: 'editor-text-overflowed',
      strikethrough: 'editor-text-strikethrough',
      underline: 'editor-text-underline',
      underlineStrikethrough: 'editor-text-underlineStrikethrough',
    },
  }

  const config = {
    namespace: 'Editor',
    theme,
    onError(error) {
      console.error(error)
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      ImageNode,
    ],
    editorState: note && (note?.content?.root?.children || []).length
      ? JSON.stringify(note.content)
      : null,
  }

  useEffect(() => {
    setOriginalTitle(note ? note.title : '')
    setInputTitle(note ? note.title : '')
  }, [])

  function handleChange(editorState) {
    editorState.read(() => {
      onChange?.(JSON.stringify(editorState))
    })
  }

  return (
    <div
      className={clsx(
        'relative min-h-[100dvh] w-full bg-white text-zinc-900',
        'dark:bg-zinc-900 dark:text-zinc-100',
      )}
    >
      <div className='flex min-h-[100dvh]'>
        {/* Sidebar */}
        <Sidebar onCollapseChange={(isCollapsed) => setCollapsed(isCollapsed)}/>

        {/* Main */}
        <main
          className={clsx(
            'flex-1 transition-all duration-300 ease-in-out',
            collapsed ? 'ml-16' : 'ml-64',
          )}
        >
          <div className={clsx(
            'editor relative min-h-[100dvh] h-full',
            'transition-all duration-300 ease-in-out',
          )}>
            <LexicalComposer initialConfig={config}>
              <div className='flex flex-col'>
                <Toolbar />
                <input
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  placeholder="Digite o título..."
                  className={clsx(
                    'w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm mt-2 mx-auto',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    'transition duration-200'
                  )}
                />
              </div>

              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className={clsx(
                      'relative min-h-full w-full max-w-[680px] mx-auto px-8 pt-10 pb-[120px]',
                      'outline-none text-base leading-[1.6]',
                    )}
                  />
                }
              />

              <HistoryPlugin />
              <OnChangePlugin onChange={handleChange} />
            </LexicalComposer>
          </div>
        </main>
      </div>
    </div>
  )
}
