import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { HeadingNode } from '@lexical/rich-text'
import { ListNode, ListItemNode } from '@lexical/list'
import Toolbar from './Plugins/Toolbar/Toolbar'
import clsx from 'clsx'
import ImageNode from './Nodes/ImageNode'

export default function Editor({ note, onChange }) {
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
    editorState: note && note.content ? JSON.stringify(note.content) : null,
  }

  function handleChange(editorState) {
    editorState.read(() => {
      onChange?.(JSON.stringify(editorState))
    })
  }

  return (
    <div className={clsx(
      'editor relative min-h-[100dvh] h-full h-[100dvh] bg-white text-zinc-900',
      'dark:bg-zinc-900 dark:text-zinc-100',
    )}>
      <LexicalComposer initialConfig={config}>
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className={clsx(
              'relative min-h-full w-full max-w-[680px] mx-auto px-8 py-[120px] outline-none text-base leading-[1.6] text-zinc-900',
              'dark:text-zinc-100',
            )} />
          }
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </LexicalComposer>
    </div>
  )
}
