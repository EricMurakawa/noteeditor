import { useEffect, useRef, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import ToolbarButton from './ToolbarButton'
import { VscSave } from 'react-icons/vsc'
import { COMMAND_PRIORITY_LOW, KEY_DOWN_COMMAND } from 'lexical'
import { router, usePage } from '@inertiajs/react'
import { useNotes } from '@/Contexts/NoteContext'

export default function ToolbarButtonSave({ style }) {
  const [editor] = useLexicalComposerContext()
  const [isChanged, setIsChanged] = useState(false)
  const lastContentRef = useRef(JSON.stringify(editor.getEditorState().toJSON()))
  const { note } = usePage().props;
  const { addNote, updateNote } = useNotes()

  useEffect(() => {
    // Salva com ctrl + s
    editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "s") {
          event.preventDefault();
          handleSave();

          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    return editor.registerUpdateListener(({ editorState, dirtyElements, dirtyLeaves }) => {
      // Se dirtyElements e dirtyLeaves estiverem vazios,
      // significa que apenas a seleção ou o foco mudaram.
      if (dirtyElements.size === 0 && dirtyLeaves.size === 0) {
        return
      }

      const currentContent = JSON.stringify(editorState.toJSON())
      setIsChanged(currentContent !== lastContentRef.current)
    })
  }, [editor])

  const handleSave = async () => {
    const editorState = editor.getEditorState().toJSON()

    if (editorState === lastContentRef.current) {
      return
    }

    try {
      if (note) {
        const { data } = await axios.put(`api/notes/${note.id}`, {
          content: editorState
        });

        updateNote(data)
      } else {
        const {data} = await axios.post(`/api/notes`, {
          content: editorState
        })

        if (data?.id) {
          addNote(data)
          router.visit(data.id)
        }
      }

      lastContentRef.current = editorState
      setIsChanged(false)
    } catch (error) {
      console.error('Erro ao salvar', error)
      alert('Erro ao salvar.')
    }
  }

  return (
    <ToolbarButton
      ariaLabel="Salvar"
      style={style}
      disabled={!isChanged}
      onClick={handleSave}
    >
      <VscSave size={20} />
    </ToolbarButton>
  )
}
